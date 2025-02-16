import { MODEL_URL } from './config.js';

const videoDatabase = {
  "treadmill": "https://www.youtube.com/embed/XgEzWF0vYUU",
  "dumbbells": "https://www.youtube.com/embed/pVmWqTU8HKw", 
  "exercise_bike": "https://www.youtube.com/embed/xlEZAsQrux8"
};

let model;

async function loadModel() {
  try {
    model = await tf.loadLayersModel(MODEL_URL + "model.json");
    console.log("Модель завантажена!");
  } catch (error) {
    console.error("Помилка завантаження моделі:", error);
  }
}

document.getElementById('upload-image').addEventListener('change', async function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = document.getElementById('preview');
  img.src = URL.createObjectURL(file);
  img.style.display = 'block';
  img.width = 400;
  img.height = 400;

  // Очікуємо завантаження зображення, після чого викликаємо функцію передбачення
  img.onload = async function() {
    await predictImage(img);
  };
});


async function predictImage(image) {
  if (!model) {
    console.error("Модель не завантажена!");
    return;
  }

  // Створення canvas для зміни розміру зображення до 224x224 пікселів, що відповідає вимогам моделі.
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 224;
  canvas.height = 224;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  // https://www.youtube.com/@teemurios_code

  // Перетворення зображення з canvas в тензор:
  // - tf.browser.fromPixels читає пікселі з canvas.
  // - toFloat() перетворює їх до числа з плаваючою комою.
  // - div(tf.scalar(255)) виконує нормалізацію значень пікселів до діапазону [0,1].
  // - expandDims() додає додатковий вимір, необхідний для моделі.
  const tensorImg = tf?.browser?.fromPixels(canvas)
    .toFloat()
    .div(tf.scalar(255))
    .expandDims();

  try {
    const prediction = await model.predict(tensorImg);
    // Отримання значень передбачення (ймовірностей) для кожного класу.
    const predictionData = prediction.dataSync();

    console.log("Передбачення:", predictionData);

    // Визначення індексу класу з найбільшою ймовірністю.
    const bestMatchIndex = predictionData.indexOf(Math.max(...predictionData));

    console.log("Найбільший індекс:", bestMatchIndex);

    // Масив назв тренажерів (порядок має відповідати тому, як тренувалася модель).
    const classNames = [
      "treadmill",
      "dumbbells",
      "exercise_bike"
    ];

    const bestMatch = classNames[bestMatchIndex] || "Невідомий тренажер";

    document.getElementById('result').innerText = "Розпізнано: " + bestMatch;

    if (videoDatabase[bestMatch]) {
      document.getElementById('video-container').innerHTML = `
        <iframe width="400" height="300" src="${videoDatabase[bestMatch]}" frameborder="0" allowfullscreen></iframe>
      `;
      document.getElementById('video-container').style.display = 'block';
    }
  } catch (error) {
    console.error("Помилка під час передбачення:", error);
  }
}

// https://www.youtube.com/@teemurios_code

window.onload = async function () {
  await loadModel();
};
