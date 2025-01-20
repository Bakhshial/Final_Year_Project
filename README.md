# Autonomous AI Agent for Cybersecurity Q&A
This project showcases an autonomous AI agent fine-tuned to handle cybersecurity-related queries with high accuracy and reliability. Leveraging state-of-the-art machine learning and deep learning frameworks, the system provides real-time, precise answers while maintaining conversational context.

### Features
**Fine-tuned Llama 3.1:** Customized using Hugging Face to adapt the model for cybersecurity-specific tasks, achieving optimal accuracy.

**Contextual Query Handling:** Integrates LangChain and RetrievalQA to maintain conversation history for better response generation.

**Data-Driven Insights:** Processes over 1,500 curated cybersecurity entries from reputable sources, combining web-scraped and folder-based datasets.

**Advanced NLP:** Utilizes chunking, embedding, and memory-based retrieval to ensure meaningful and coherent interactions.

**Web-Based Interface:** Developed a React.js front-end for user-friendly interaction with the AI agent.

### Technologies Used
  **Deep Learning Frameworks:** PyTorch, TensorFlow
  
  **NLP Tools:** Hugging Face Transformers, LangChain
  
  **Backend Development:** Flask, Flask-CORS, Flask-Ngrok
  
  **Deployment Tools:** Ngrok, Google Colab, Tesseract OCR
  
  **Front-End:** React.js
  
  **Data Management:** Custom DataManager for chunking, embedding, and retrieval and ChromaDB for Vector Database


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
