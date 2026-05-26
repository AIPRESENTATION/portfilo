# EmailJS Quick Start - 5 Minutes Setup

## 🚀 Quick Setup (5 Steps)

### **1. Create Account** (1 min)
- Go to: https://www.emailjs.com/
- Click "Sign Up" → Sign up with Google
- ✅ Done!

### **2. Connect Gmail** (1 min)
- Dashboard → "Email Services" → "Add New Service"
- Select "Gmail" → Connect your account
- Copy your **Service ID** (e.g., `service_abc123`)
- ✅ Done!

### **3. Create Template** (2 min)
- Dashboard → "Email Templates" → "Create New Template"
- **Subject:** `New Contact from {{from_name}} - {{subject}}`
- **Body:** Use the template from `EMAILJS_SETUP_GUIDE.md`
- **To Email:** Your email address
- **Reply To:** `{{from_email}}`
- Save and copy your **Template ID** (e.g., `template_xyz789`)
- ✅ Done!

### **4. Get Public Key** (30 sec)
- Click profile icon → "Account" → "General" tab
- Copy your **Public Key** (e.g., `AbCdEfGhIjKlMnOp`)
- ✅ Done!

### **5. Add to Project** (30 sec)
- Open `client/.env.local`
- Add your credentials:
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
```
- Restart dev server: `npm run dev`
- ✅ Done!

---

## 🧪 Test It!

1. Open: http://localhost:5173
2. Scroll to Contact section
3. Fill the form and submit
4. Check your email inbox!

---

## 📝 Email Template (Copy & Paste)

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
  <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
    New Contact Form Submission
  </h2>
  
  <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
    <p style="margin: 10px 0;"><strong>From:</strong> {{from_name}}</p>
    <p style="margin: 10px 0;"><strong>Email:</strong> {{from_email}}</p>
    <p style="margin: 10px 0;"><strong>Subject:</strong> {{subject}}</p>
    
    <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-left: 4px solid #2563eb; border-radius: 4px;">
      <p style="margin: 0;"><strong>Message:</strong></p>
      <p style="margin: 10px 0 0 0; white-space: pre-wrap;">{{message}}</p>
    </div>
  </div>
  
  <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
    <p style="margin: 0; font-size: 14px; color: #1e40af;">
      💡 <strong>Quick Reply:</strong> Simply reply to this email to respond to {{from_name}}
    </p>
  </div>
  
  <p style="margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
    Sent from your Portfolio Contact Form
  </p>
</div>
```

---

## 🚀 Deploy Checklist

Before deploying:

- [ ] Test contact form locally
- [ ] Add environment variables to hosting platform
- [ ] Add your domain to EmailJS allowed origins
- [ ] Verify `.env.local` is in `.gitignore`

---

**Need detailed help?** See `EMAILJS_SETUP_GUIDE.md`
