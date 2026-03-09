# 🫘 Kidney CT Classifier

An AI-powered web application that classifies kidney CT scan images into four categories: **Cyst**, **Normal**, **Stone**, and **Tumor** using deep learning.

---

##  Demo

<img width="1916" height="865" alt="image" src="https://github.com/user-attachments/assets/e90d530c-4e4a-44ed-bfb7-bee77be951ef" />
<img width="1920" height="879" alt="image" src="https://github.com/user-attachments/assets/4cd5116d-cb78-4709-9304-214f1946cbc5" />
<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/b6bc1f92-353a-49c2-8a7f-6c42be35ce4a" />

---

## Model

- **Architecture**: VGG16 (Transfer Learning)
- **Input Size**: 128×128 RGB
- **Output Classes**: Cyst, Normal, Stone, Tumor
- **Framework**: TensorFlow / Keras
- **Training**: Fine-tuned top layers on kidney CT dataset

---

##  Project Structure

```
kidney-ct-classifier/
├── backend/
│   ├── app.py               # FastAPI server
│   ├── train.ipynb          # Model training notebook
│   └── .gitignore
├── src/
│   ├── App.jsx              # Main React component
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

---

##  Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React + Vite + Tailwind CSS       |
| Backend   | FastAPI + Uvicorn                 |
| ML Model  | TensorFlow / Keras (VGG16)        |
| Language  | Python 3.12, JavaScript (ES6+)    |

---

##  Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- pip

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/kidney-ct-classifier.git
cd kidney-ct-classifier
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv .venv

pip install fastapi uvicorn tensorflow pillow numpy python-multipart

uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```



---

### 3. Frontend Setup



```bash
npm install
npm run dev
```

Frontend will be running at: `http://localhost:5173`

---

##  Dataset

**Kidney Colorized CT (Normal, Cyst, Tumor, Stone)**  
🔗 [View on Kaggle](https://www.kaggle.com/datasets/shuvokumarbasakbd/kidney-colorized-ct-normal-cyst-tumor-stone)

This dataset contains **12,446 unique CT images** of kidney conditions collected from hospitals in Dhaka, Bangladesh. Images were sourced from PACS (Picture Archiving and Communication System) and cover both coronal and axial cuts from contrast and non-contrast studies using whole abdomen and urogram protocols.



### Class Distribution

| Class  | Images | Description                        |
|--------|--------|------------------------------------|
| Normal | 5,077  | Healthy kidney tissue              |
| Cyst   | 3,709  | Fluid-filled sac in the kidney     |
| Tumor  | 2,283  | Abnormal tissue growth             |
| Stone  | 1,377  | Mineral deposit in the kidney      |
| **Total** | **12,446** |                            |

### Dataset Structure

```
dataset/
├── train/
│   ├── Cyst/
│   ├── Normal/
│   ├── Stone/
│   └── Tumor/
├── test/
│   ├── Cyst/
│   ├── Normal/
│   ├── Stone/
│   └── Tumor/
├── validation/
│   ├── Cyst/
│   ├── Normal/
│   ├── Stone/
│   └── Tumor/


    
```

> **Note:** The dataset is not included in this repository due to size. Download it from Kaggle and place it in the `backend/dataset/` folder and train your model using test.ipnyb file in backend.


---

## 📡 API Endpoints

| Method | Endpoint   | Description                        |
|--------|------------|------------------------------------|
| GET    | `/`        | Health check, model status         |
| POST   | `/predict` | Upload image and get prediction    |


---

## 👤 Author

**Muhammad Fahad**  
Developed as part of an AI/ML project using React and TensorFlow.

---
