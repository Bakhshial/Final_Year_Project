# Import necessary libraries for file handling, text extraction, and embeddings
import os  # For file and directory operations
from PyPDF2 import PdfReader  # For reading PDF files (especially encrypted ones)
from PIL import Image  # For handling image files
from pytesseract import image_to_string  # OCR library for extracting text from images
import fitz  # PyMuPDF, for advanced PDF processing
from tika import parser  # For extracting text from DOCX, TXT, and other formats
from unstructured.partition.auto import partition  # For handling unstructured data
from bs4 import BeautifulSoup  # For extracting and parsing HTML content
import requests  # For making HTTP requests
from langchain.text_splitter import RecursiveCharacterTextSplitter  # For splitting text into manageable chunks
from langchain_huggingface import HuggingFaceEmbeddings  # For embedding text using Hugging Face models
from langchain_chroma import Chroma  # For managing vector stores with Chroma
from langchain.schema import Document  # For structuring document objects

# Define the DataManager class to handle text extraction, cleaning, embedding, and vector storage
class DataManager:
    def __init__(self, persist_dir, embedding_model="sentence-transformers/all-MiniLM-L6-v2"):
        """
        Initializes the DataManager with persistent storage and an embedding model.
        
        Parameters:
        - persist_dir (str): Directory for storing vector data.
        - embedding_model (str): Name of the embedding model to be used (default: MiniLM).
        """
        self.persist_dir = persist_dir  # Directory for storing persistent data
        self.embedding_function = HuggingFaceEmbeddings(model_name=embedding_model)  # Initialize embedding function
        self.vector_store = Chroma(
            persist_directory=persist_dir, embedding_function=self.embedding_function
        )  # Setup Chroma vector store

    def extract_text_from_pdf(self, pdf_path):
        """
        Extracts text from a PDF file using PyMuPDF. Falls back to OCR for image-based PDFs.
        
        Parameters:
        - pdf_path (str): Path to the PDF file.
        
        Returns:
        - str: Extracted text from the PDF.
        """
        try:
            pdf_document = fitz.open(pdf_path)  # Open the PDF file
            text = ""  # Initialize an empty string to store text
            for page_num in range(len(pdf_document)):  # Iterate through all pages in the PDF
                page = pdf_document[page_num]  # Access a specific page
                page_text = page.get_text()  # Extract text from the page
                if page_text.strip():  # Check if the page contains text
                    text += page_text  # Append the text to the result
                else:  # If no text, treat it as an image-based PDF
                    pix = page.get_pixmap()  # Get the page as an image
                    image = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)  # Convert to PIL Image
                    text += image_to_string(image)  # Use OCR to extract text
            return text
        except Exception as e:
            print(f"Failed to process PDF {pdf_path}: {e}")  # Handle any exceptions
            return ""

    def extract_text_from_encrypted_pdf(self, pdf_path, password=""):
        """
        Extracts text from encrypted PDFs by decrypting them.
        
        Parameters:
        - pdf_path (str): Path to the encrypted PDF file.
        - password (str): Decryption password (default: empty string).
        
        Returns:
        - str: Extracted text from the encrypted PDF.
        """
        try:
            pdf_reader = PdfReader(pdf_path)  # Open the PDF using PdfReader
            if pdf_reader.is_encrypted:  # Check if the PDF is encrypted
                pdf_reader.decrypt(password)  # Decrypt the PDF using the provided password
            return "".join([page.extract_text() for page in pdf_reader.pages])  # Extract text from all pages
        except Exception as e:
            print(f"Failed to extract text from encrypted PDF {pdf_path}: {e}")  # Handle errors
            return ""

    def clean_text(self, text):
        """
        Cleans text by removing unwanted phrases and trimming whitespace.
        
        Parameters:
        - text (str): The input text to clean.
        
        Returns:
        - str: Cleaned text.
        """
        unwanted_phrases = ["www.crcpress.com", "an informa business"]  # Phrases to remove
        for phrase in unwanted_phrases:
            text = text.replace(phrase, "")  # Remove unwanted phrases
        return text.strip()  # Trim leading and trailing whitespace

    def extract_data_from_folder(self, folder_path):
        """
        Extracts and cleans text data from all supported files in a given folder.
        
        Parameters:
        - folder_path (str): Path to the folder containing files.
        
        Returns:
        - list: A list of dictionaries containing cleaned text and file names.
        """
        data = []  # Initialize an empty list to store extracted data
        for root, _, files in os.walk(folder_path):  # Traverse the folder recursively
            for file in files:
                file_path = os.path.join(root, file)  # Get the full file path
                ext = file.split(".")[-1].lower()  # Get the file extension
                text = ""  # Initialize text as an empty string
                if ext == "pdf":
                    text = self.extract_text_from_pdf(file_path)  # Extract text from PDF
                    if len(text.strip()) < 50:  # Fallback to encrypted extraction if text is too short
                        text = self.extract_text_from_encrypted_pdf(file_path)
                elif ext in ["docx", "txt"]:  # Handle Word and text files
                    try:
                        text = parser.from_file(file_path)["content"]  # Extract content using Tika
                    except Exception as e:
                        print(f"Failed to extract text from DOCX/TXT file {file}: {e}")
                elif ext in ["xlsx", "xls", "csv"]:
                    continue  # Skip handling Excel and CSV files for now
                else:  # Handle unsupported file formats using unstructured library
                    try:
                        elements = partition(file_path)
                        text = "\n".join([str(element) for element in elements])
                    except Exception as e:
                        print(f"Failed to process unsupported file {file}: {e}")
                if text:  # If text is successfully extracted
                    cleaned_text = self.clean_text(text)  # Clean the extracted text
                    data.append({"content": cleaned_text, "file_name": file})  # Append to data list
        return data

    def extract_data_from_websites(self, urls):
        """
        Extracts text data from a list of website URLs.
        
        Parameters:
        - urls (list): List of URLs to scrape content from.
        
        Returns:
        - list: A list of dictionaries containing content and source URLs.
        """
        data = []
        for url in urls:
            try:
                response = requests.get(url)  # Send an HTTP GET request
                if response.status_code == 200:  # Check for successful response
                    soup = BeautifulSoup(response.text, "html.parser")  # Parse HTML content
                    content = ' '.join([p.get_text() for p in soup.find_all("p")])  # Extract text from <p> tags
                    data.append({"content": content, "url": url})  # Append content and URL to data
                else:
                    print(f"Failed to fetch {url}: Status code {response.status_code}")  # Handle non-200 status codes
            except Exception as e:
                print(f"Error processing {url}: {e}")  # Handle exceptions
        return data

    def chunk_data(self, data, chunk_size=1000, chunk_overlap=100):
        """
        Splits data into manageable text chunks for embedding.
        
        Parameters:
        - data (list): List of dictionaries with content to split.
        - chunk_size (int): Size of each text chunk (default: 1000 characters).
        - chunk_overlap (int): Overlap between chunks (default: 100 characters).
        
        Returns:
        - list: A list of dictionaries containing chunks and their sources.
        """
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        chunks = []  # Initialize list for text chunks
        for item in data:
            source = item.get("file_name", item.get("url", "unknown_source"))  # Determine the source of the text
            for chunk in text_splitter.split_text(item["content"]):  # Split the text into chunks
                chunks.append({"chunk": chunk, "source": source})  # Append chunk and source to the list
        return chunks

    def embed_and_store_data(self, chunks):
        """
        Embeds text chunks and stores them in the vector store.
        
        Parameters:
        - chunks (list): List of text chunks to embed.
        """
        documents = [
            Document(page_content=chunk["chunk"], metadata={"source": chunk["source"]})  # Create Document objects
            for chunk in chunks
        ]
        self.vector_store.add_documents(documents)  # Add documents to the vector store

    def get_retrieval_chain(self):
        """
        Retrieves a chain for querying the vector store.
        
        Returns:
        - Object: The vector store retriever.
        """
        return self.vector_store.as_retriever()  # Return the retriever object for querying