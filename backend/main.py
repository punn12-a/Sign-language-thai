from fastapi import FastAPI
from pydantic import BaseModel
import json
from ai_model import translate_to_sign

app = FastAPI()

# โหลดฐานข้อมูลภาษามือ
with open("sign_database.json", "r", encoding="utf-8") as f:
    sign_db = json.load(f)

class TextInput(BaseModel):
    text: str

@app.post("/convert")
def convert_text_to_sign(input_text: TextInput):
    translated_text = translate_to_sign(input_text.text)
    words = translated_text.split()
    sign_sequence = [sign_db.get(word, "ไม่พบคำนี้") for word in words]
    return {"sign_sequence": sign_sequence}
