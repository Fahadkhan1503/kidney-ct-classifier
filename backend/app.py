import os
import numpy as np
from PIL import Image
import io

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

import tensorflow as tf
from tensorflow.keras.models import load_model

# ── Config ──────────────────────────────────────────────────────────────────
IMAGE_SIZE  = 128
MODEL_PATH  = os.path.join(os.path.dirname(__file__), "model_1_new.keras")
CLASS_NAMES = ["Cyst", "Normal", "Stone", "Tumor"]

# ── Load model at startup ────────────────────────────────────────────────────
model = None

def load_keras_model():
    global model
    try:
        model = load_model(MODEL_PATH, compile=False)
        print(f"✅ Model loaded successfully from {MODEL_PATH}")
    except Exception as e:
        print(f"❌ Model failed to load: {e}")
        model = None

load_keras_model()

# ── App ──────────────────────────────────────────────────────────────────────
app = FastAPI(title="Kidney CT Classifier API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Helpers ──────────────────────────────────────────────────────────────────
def preprocess(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((IMAGE_SIZE, IMAGE_SIZE))
    arr = np.array(img, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)  # (1, 128, 128, 3)

# ── Routes ───────────────────────────────────────────────────────────────────
@app.get("/")
def health_check():
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "classes": CLASS_NAMES,
        "image_size": IMAGE_SIZE,
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Check server logs.")

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="Please upload a valid image file (jpg, png, etc.).")

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    try:
        img_array = preprocess(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Image preprocessing failed: {str(e)}")

    try:
        probs = model.predict(img_array, verbose=0)[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model inference failed: {str(e)}")

    idx = int(np.argmax(probs))

    return {
        "predicted_class": CLASS_NAMES[idx],
        "confidence": round(float(probs[idx]) * 100, 2),
        "all_probabilities": {
            CLASS_NAMES[i]: round(float(probs[i]) * 100, 2)
            for i in range(len(CLASS_NAMES))
        },
    }

# ── Entry point ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)













