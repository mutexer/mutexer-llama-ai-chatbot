marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
});
function autoGrow(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

async function sendMessage() {
  const userInput = document.getElementById("user-input");
  const message = userInput.value.trim();
  if (!message) return;
  userInput.value = "";
  autoGrow(userInput);
  addToChatWindow(message, "user-message");
  toggleSpinner(true);
  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    addToChatWindow(data.response, "assistant-message");
  } catch (error) {
    console.error("Error:", error);
    addToChatWindow("Sorry, there was an error.", "assistant-message");
  } finally {
    toggleSpinner(false);
  }
}

function handleKeyDown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function validateMarkdown(input) {
  const codeBlockRegex = /```[\s\S]*?```/g;
  const matches = input.match(codeBlockRegex);
  const unclosedCodeBlocks = (input.match(/```/g) || []).length % 2 !== 0;

  if (unclosedCodeBlocks) {
    console.warn("Unclosed code block detected.");
    return input + "\n```";
  }

  return input;
}

function addToChatWindow(text, cssClass) {
  const chatWindow = document.getElementById("chat-window");

  const messageCard = document.createElement("div");
  messageCard.classList.add("card", "message-card", cssClass);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  try {
    const validText = validateMarkdown(text);
    const parsedHtml = marked.parse(validText);
    cardBody.innerHTML = parsedHtml;

    const codeBlocks = cardBody.querySelectorAll("pre code");
    codeBlocks.forEach((block) => {
      
      hljs.highlightElement(block);

      const codeWrapper = document.createElement("div");
      codeWrapper.style.position = "relative";
      
      const langName = block.className.match(/language-(\w+)/)?.[1] || "Plain Text";

      const header = document.createElement("div");
      header.className = "code-header";

      const langLabel = document.createElement("span");
      langLabel.textContent = langName;

      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.innerHTML = `<i class="fa-regular fa-copy"></i> Copy`;
      copyButton.addEventListener("click", () => copyToClipboard(block.innerText));

      header.appendChild(langLabel);
      header.appendChild(copyButton);
      codeWrapper.appendChild(header);

      const preElement = block.parentElement.cloneNode(true);
      codeWrapper.appendChild(preElement);

      block.parentElement.replaceWith(codeWrapper);
    });
  } catch (error) {
    console.error("Error rendering message:", error);
    cardBody.textContent = text;
  }

  messageCard.appendChild(cardBody);
  chatWindow.appendChild(messageCard);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function copyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    if (successful) {
      alert("Copied");
    } else {
      console.error("Copy failed.");
    }
  } catch (err) {
    console.error("Copy failed: ", err);
  }
  document.body.removeChild(textArea);
}

function toggleSpinner(show) {
  const spinner = document.getElementById("loading-spinner");
  const sendButtonText = document.getElementById("send-button-text");
  if (!spinner || !sendButtonText) return;

  if (show) {
    spinner.style.display = "inline-block";
    sendButtonText.style.display = "none";
  } else {
    spinner.style.display = "none";
    sendButtonText.style.display = "inline";
  }
}