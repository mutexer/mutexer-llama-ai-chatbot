# Llama AI Chatbot for Raspberry Pi on Mutexer
![Raspberry Pi](https://img.shields.io/badge/-Raspberry_Pi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=fff)](#)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=000)](#)
![Static Badge](https://img.shields.io/badge/meta-blue?style=for-the-badge&logo=Meta&color=%232B65DD)
![Static Badge](https://img.shields.io/badge/mutexer-%231A3353.svg?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iMTI1IiBoZWlnaHQ9IjEyNSIgdmlld0JveD0iMCAwIDEyNSAxMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF80NDQ5XzI0NjApIj4KPHJlY3Qgd2lkdGg9IjEyNSIgaGVpZ2h0PSIxMjUiIHJ4PSIyMCIgZmlsbD0iI0VERURFRCIvPgo8cGF0aCBkPSJNNDkuNzU2MSAxOUgzNVYxMTAuMjJINDkuNzU2MVY4NS40MzI1QzYwLjUzMTEgODkuMTA4OSA3MS4xODAxIDgzLjA5MTYgNzYuMTM4MiA3OC40NzE1Vjg1LjE3ODlIOTBWMTlINzUuMjQzOVY2Ni4zOTg0QzY0Ljk1OTMgODEuNjAxNiA0OS43NTYxIDczLjEwNTcgNDkuNzU2MSA2My43MTU0VjE5WiIgZmlsbD0iIzFBMzM1MyIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzQ0NDlfMjQ2MCI+CjxyZWN0IHdpZHRoPSIxMjUiIGhlaWdodD0iMTI1IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPg==)

This project aims to make building and deploying your own ai chatbot on a raspberry pi (or any computer) really easy. The purpose of this project is to provide boilerplate code and handy infrastructure. This way you can build chatbot functionality into your apps, keep your data secure and pay no fees. 

This is a sample project that uses a combination of python, flask, huggingface, llama 3.2 and mutexer to build a modern conversational ai interface. 

Python and flask are used to create a responsive frontend that works on desktop and mobile. While huggingface and llama 3.2 are for the brains. Finally, mutexer is used as the IDE and VPN remote access tool so you can use your model remotely.  

## Features
- Conversational interface 
- Conversation history 
- Code highlighting and copy  
- (Optional) Live updating dashboard to track device temperature, cpu load average and memory usage.  

## Large Language Model
**Project uses [meta-llama/Llama-3.2-1B-Instruct](https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct)**

This is a one billion parameter model. Feel free to switch out the LLM for other great options as you see fit. 

## Interface
<img src="https://mutexer-static-public-assets.s3.ap-southeast-2.amazonaws.com/Github/desktop-mobile-chatbot-llm.png" alt="desktop-chatbot" width="600"/> 



