import time
import os
import threading
import torch
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from huggingface_hub import login
from transformers import pipeline

class PythonProgram:

   def index(self):
       if not self.model_is_loaded:
           # While model is loading, render the loading page
           return redirect(url_for('loading'))
       else:
           # Once the model is loaded, render the main page
           return render_template("index.html", ip_address=self.ip_address)

   def loading_page(self):
       """
       A simple page to show that the model is still loading.
       """
       if self.model_is_loaded:
           return render_template("index.html", ip_address=self.ip_address)
       else:
           return render_template('loading.html', ip_address=self.ip_address)

   def serve_static_files(self, filename):
       from flask import send_from_directory
       # Serve any static file from the current directory
       return send_from_directory('.', filename)

   def chat(self):
       """Receives the user message, updates conversation, generates model response."""
       user_message = request.json.get("message", "").strip()
       
       # If there's no existing conversation in the session, initialize it
       if "messages" not in session:
           session["messages"] = [
               {
                   "role": "system",
                   "content": "Keep your responses short and concise. When you provide code, use properly fenced code blocks with triple backticks.",
               }
           ]
       conversation = session["messages"]
      
       # Append the user's new message
       conversation.append({"role": "user", "content": user_message})

       # Generate response using the model pipeline
       outputs = self.pipe(conversation, max_new_tokens=128, do_sample=True, top_k=50, top_p=0.9)

       # Extract the assistant's actual response (last message with role 'assistant')
       message = outputs[0]["generated_text"][-1]

       # Strip the content to get a clean message
       assistant_text = message["content"].strip() 
       
       # Append assistant response to conversation
       conversation.append({"role": "assistant", "content": assistant_text})
      
       # Save updated conversation back into session
       session["messages"] = conversation

       try:
          print("Assistant raw text:", repr(assistant_text))
          return jsonify({"response": assistant_text})
       except Exception as e:
          print("Server error occurred:", e)
          return jsonify({"response": "Server error: " + str(e)}), 500
   
    # Load the model into memory
   def load_model(self):   
       """
       The heavy model loading logic is moved to a separate thread.

       Model:
       meta-llama/Llama-3.2-1B-Instruct
       """

       login(token="YOUR_TOKEN") # Set your Huggingface token here
      
       print("Started loading model into memory...")

       self.pipe = pipeline(
           "text-generation",
           model="meta-llama/Llama-3.2-1B-Instruct",
           torch_dtype=torch.bfloat16,
           device_map="auto",
       )
       
       self.model_is_loaded = True
       print("Successfully loaded model.")

   # Run code on initialisation of the program 
   def on_initialize(self):

      # Set your Cloundlink device ip address
      self.ip_address = "10.8.0.172"
      
      self.app = Flask(__name__, template_folder='.')
      
      # A secret key is required to use session in Flask
      self.app.secret_key = os.urandom(24)

      # Register URL rules
      self.app.add_url_rule('/', 'index', self.index)
      self.app.add_url_rule('/chat', 'chat', self.chat, methods=['POST'])
      self.app.add_url_rule('/loading', 'loading', self.loading_page)
      self.app.add_url_rule('/<path:filename>', 'static_files', self.serve_static_files)

      # And the model loading in another
      self.model_is_loaded = False
      threading.Thread(target=self.load_model).start()

      # Run the app
      self.app.run(debug=True, host='0.0.0.0', port=8099)
   
   def on_cycle(self):
      # In this case this logic does nothing but is required as part of the mutexer platform.
      time.sleep(60)
