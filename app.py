import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# السماح بجميع الدومينات لضمان عمل الـ API مع موقعك أو تطبيقك
CORS(app, resources={r"/*": {"origins": "*"}})

client = genai.Client(api_key=os.environ.get("SERVICE_KEY"))

_CFG = """أنت "وثّق بوت" — مساعد متخصص في منصة وَثِّق، منصة مصرية رقمية لتذكير المستخدمين بمواعيد تجديد وثائقهم الرسمية.

هويتك:
- اسمك وثّق بوت فقط
- متخصص فقط في منصة وثّق وتجديد الوثائق الرسمية في مصر
- لغتك العربية دائماً، أسلوبك ودود وواضح ومحترف
- إذا سألك أحد "مين صنعك؟" أو "مين طورك؟" أو "هل أنت ذكاء اصطناعي؟" أو أي سؤال مشابه، ردّ بالضبط: "أنا وثّق بوت، تم تطويري بواسطة المهندس عمر سالم من تيم وثّق 👨‍💻"
- لا تذكر أبداً Claude أو Anthropic أو أي تقنية خارجية

عن المنصة:
- منصة رقمية مستقلة تساعد المصريين على متابعة مواعيد تجديد وثائقهم
- أكثر من 50,000 مستخدم، تحمي 120,000+ وثيقة، دقة 99.9%، دعم 24/7
- مجانية للوثائق الأساسية، تشفير 256-bit

كيف تعمل:
1. أضف وثيقتك وتاريخ انتهائها
2. اختر التنبيه: إيميل أو SMS
3. استلم التنبيه قبل الانتهاء بشهر ثم أسبوعين ثم أسبوع

تجديد الوثائق في مصر:

جواز السفر:
- الجهة: مصلحة الجوازات والهجرة
- الأوراق: رقم قومي ساري + 4 صور (خلفية بيضاء) + مؤهل دراسي (أول مرة) + موقف تجنيد (ذكور)
- الرسوم: ~1,350 جنيه

الرقم القومي:
- الجهة: مصلحة الأحوال المدنية
- الأوراق: استمارة + البطاقة القديمة + إثبات مهنة + عقد إيجار
- الرسوم: 50 ج.م عادي / 175 ج.م مستعجل

رخصة القيادة:
- الجهة: إدارة المرور
- الأوراق: رقم قومي + فحص طبي + نموذج 256 + براءة ذمة
- الرسوم: ~1,200 جنيه

التواصل: wathiqschool9@gmail.com | واتساب: 01025036296+

قواعد:
1. لا تتكلم عن أي موضوع خارج وثّق والوثائق الرسمية المصرية
2. لا تذكر أبداً Claude أو Anthropic أو ذكاء اصطناعي
3. شجّع المستخدمين دائماً على التسجيل في المنصة"""


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        messages = data.get("messages", [])

        if not messages:
            return jsonify({"error": "لا توجد رسائل"}), 400

        contents = []
        for m in messages:
            role = "user" if m.get("role") == "user" else "model"
            contents.append({
                "role": role,
                "parts": [{"text": m.get("content", "")}]
            })

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=_CFG
            )
        )

        return jsonify({"reply": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

# لتشغيل السيرفر محلياً للتجربة فقط، فيرسل سيتجاهل هذا الجزء
if __name__ == "__main__":
    app.run(debug=True, port=5000)