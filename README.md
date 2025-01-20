# CyberDost-QA: An Autonomous Cybersecurity Agent
This project is an **AI-powered autonomous agent** designed to provide accurate and real-time answers to cybersecurity-related queries. By leveraging state-of-the-art **Retrieval-Augmented Generation (RAG)** techniques and **fine-tuned Llama 3.1**, the system delivers both contextually relevant and factual responses, making it a powerful tool for cybersecurity education and decision-making.

### Features
**Retrieval-Augmented Generation (RAG):** Combines a retrieval mechanism with generative AI to enhance response accuracy by grounding answers in factual data.

**Fine-tuned Llama 3.1:** Customized using Hugging Face to adapt the model for cybersecurity-specific tasks, achieving optimal accuracy.

**Contextual Query Handling:** Integrates LangChain and RetrievalQA to maintain conversation history for better response generation.

**Data-Driven Insights:** Processes over 1,500 curated cybersecurity entries from reputable sources, combining web-scraped and folder-based datasets.

**Multi-Source Knowledge Base:** Integrates data from text documents and web resources to build a robust knowledge base.

**Advanced NLP:** Utilizes chunking, embedding, and memory-based retrieval to ensure meaningful and coherent interactions.

**Memory Retention:** Uses conversation memory to maintain context and provide coherent multi-turn dialogue.

**Scalable and Secure API:** Deployed using Flask with seamless integration into any front-end application.

**Web-Based Interface:** Developed a React.js front-end for user-friendly interaction with the AI agent

### Technologies Used
  **Deep Learning Frameworks:** PyTorch
  
  **NLP Tools:** Hugging Face Transformers, LangChain
  
  **Backend Development:** Flask, Flask-CORS, Flask-Ngrok
  
  **Deployment Tools:** Ngrok, Google Colab, Tesseract OCR
  
  **Front-End:** React.js
  
  **Data Management:** Custom DataManager for chunking, embedding, and retrieval and ChromaDB for Vector Database

### How It Works
**Data Ingestion:**
Combines cybersecurity knowledge from curated documents and online sources.

**Chunking and Embedding:**
Processes large data into manageable chunks and embeds them for efficient retrieval.

**RAG Mechanism:**
Retrieves the most relevant information before generating responses, ensuring accurate and trustworthy outputs.

**Fine-Tuned Responses:**
Leverages the fine-tuned Llama 3.1 model to enhance language understanding and domain specificity.

### Installation and Usage
Clone this repository.

    git clone https://github.com/your-username/repo-name.git
  
Install the dependencies listed in requirements.txt.

    pip install -r requirements.txt and setup.py file
    
Set up your API keys for GROQ and Hugging Face by exporting them as environment variables:

    export GROQ_API_KEY=your_api_key  
    export HF_ACCESS_TOKEN=your_token
    
Run the Flask server with:

    python Server_Flask.py

You can access the web interface using the Ngrok URL.

### Project Goals
Improve cybersecurity awareness by answering technical and non-technical queries accurately.

Ensure seamless user experience through a responsive front-end.

Deploy a scalable and efficient AI system for real-world use cases.

### Contributing
Contributions are welcome! Feel free to fork this repository and submit a pull request for review.

### License
This project is licensed under the file woner.
