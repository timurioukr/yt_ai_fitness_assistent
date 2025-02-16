# yt_ai_fitness_assistent

**yt_ai_fitness_assistent** is a web application that demonstrates how to train a model to recognize different types of gym equipment using TensorFlow.js and [Teachable Machine](https://teachablemachine.withgoogle.com/). This project was created for a YouTube video where I show a practical implementation of equipment recognition from images and how to build a web app that performs the recognition.

## Project Overview

In this project:
- **Model Training:**  
  We use Teachable Machine to train a model to recognize various gym equipment (e.g., treadmill, dumbbells, ab machine) from images.
  
- **Web Application:**  
  Using TensorFlow.js, the trained model is integrated into a web app that allows users to upload a photo of gym equipment and automatically determine which equipment is shown.
  
- **Interactivity:**  
  After recognition, the web app displays a corresponding instructional video for the recognized equipment, allowing users to quickly receive workout guidance.
  
- **Ease of Use:**  
  All processing is performed directly in the browser without any server-side operations, making the solution simple to integrate and demonstrate.

## Technologies

- **[TensorFlow.js](https://www.tensorflow.org/js):**  
  Used for loading and running the machine learning model directly in the browser.

- **[Teachable Machine](https://teachablemachine.withgoogle.com/):**  
  A tool for quickly training an image recognition model. The model is exported in a format compatible with TensorFlow.js.

- **JavaScript, HTML, CSS:**  
  Core technologies for building the interactive web application.

- **Other Tools:**  
  The project is built using Vite along with [vite-plugin-web-extension](https://vite-plugin-web-extension.aklinker1.io/) if you require browser extension integration.

## Demonstration

The YouTube video demonstrates:
1. How to train a model to recognize various types of gym equipment using Teachable Machine.
2. How to integrate the trained model into a web app using TensorFlow.js.
3. How users can upload an image of gym equipment and receive a video with workout instructions.

## How to Run the Project

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/yt_ai_fitness_assistent.git
   cd yt_ai_fitness_assistent
  
