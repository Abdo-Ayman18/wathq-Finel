# وثّق بوت — دليل التشغيل

## الملفات

| الملف | الوصف |
|-------|-------|
| index.html | الواجهة (الفرونت إند) |
| app.py | السيرفر (الباك إند) |
| requirements.txt | مكتبات Python |
| .env | مفتاح API السري |

---

## للفرونت إند

افتح `index.html` في المتصفح مباشرة بعد تشغيل الباك إند.

لو رفعتوه على سيرفر أونلاين، غيّر السطر ده في `index.html`:
```js
const BACKEND_URL = "http://localhost:5000/chat";
// غيّرها لـ:
const BACKEND_URL = "https://رابط-سيرفركم.com/chat";
```

---

## للباك إند

### 1. ثبّت المكتبات
```bash
pip install -r requirements.txt
```

### 2. ضع المفتاح في ملف .env
```
_SERVICE_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxx
```
المفتاح من: https://console.anthropic.com/

### 3. شغّل السيرفر
```bash
python app.py
```

---

## ملاحظة مهمة
لا ترفع ملف `.env` على GitHub أبداً.
أضف السطر ده في `.gitignore`:
```
.env
```
