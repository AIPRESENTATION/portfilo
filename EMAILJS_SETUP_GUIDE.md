# EmailJS Setup Guide - Complete Tutorial

## 📧 What is EmailJS?

EmailJS allows you to send emails directly from your frontend (React) without needing a backend server. It's perfect for contact forms!

---

## 🚀 Step-by-Step Setup

### **Step 1: Create EmailJS Account**

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (top right)
3. Choose **"Sign up with Google"** (easiest) or use email
4. Verify your email if needed
5. You'll be redirected to the dashboard

**✅ Account created!**

---

### **Step 2: Connect Your Gmail Account**

#### **2.1 Add Email Service**

1. In the EmailJS dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"** button
3. Select **"Gmail"** from the list
4. Click **"Connect Account"**
5. Choose your Gmail account
6. Click **"Allow"** to grant permissions
7. Give your service a name (e.g., "Portfolio Contact")
8. Click **"Create Service"**

#### **2.2 Copy Service ID**

- After creating, you'll see your **Service ID** (looks like: `service_abc123`)
- **Copy this ID** - you'll need it later!

**✅ Gmail connected!**

---

### **Step 3: Create Email Template**

#### **3.1 Create Template**

1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. You'll see a template editor

#### **3.2 Configure Template**

**Template Name:** `Portfolio Contact Form`

**Subject Line:**
```
New Contact from {{from_name}} - {{subject}}
```

**Email Body (HTML):**
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

**To Email:** Your email address (e.g., `rakeshkoraganji2@gmail.com`)

**From Name:** `{{from_name}}`

**Reply To:** `{{from_email}}`

#### **3.3 Test Template**

1. Click **"Test It"** button
2. Fill in test values
3. Click **"Send Test Email"**
4. Check your inbox!

#### **3.4 Save Template**

1. Click **"Save"** button
2. Copy your **Template ID** (looks like: `template_xyz789`)

**✅ Template created!**

---

### **Step 4: Get Your Public Key**

1. Click your **profile icon** (top right)
2. Select **"Account"**
3. Go to **"General"** tab
4. Find **"Public Key"** section
5. Copy your **Public Key** (looks like: `AbCdEfGhIjKlMnOp`)

**✅ Public Key copied!**

---

### **Step 5: Add Credentials to Your Project**

#### **5.1 Open `.env.local` file**

Location: `client/.env.local`

#### **5.2 Add Your Credentials**

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
```

**Replace with your actual values!**

#### **5.3 Restart Dev Server**

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

**✅ Configuration complete!**

---

## 🧪 Testing Your Contact Form

### **Test Locally**

1. Open your portfolio: `http://localhost:5173`
2. Scroll to Contact section
3. Fill in the form:
   - Name: Test User
   - Email: your-test@email.com
   - Subject: Test Message
   - Message: This is a test!
4. Click **"Send Message"**
5. You should see a success toast notification
6. Check your email inbox!

### **What to Check**

✅ Form submits without errors  
✅ Success toast appears  
✅ Form fields clear after submission  
✅ Email arrives in your inbox  
✅ Email contains all form data  
✅ Reply-to address is correct  

---

## 🔒 Security Best Practices

### **1. Environment Variables**

✅ **Never commit `.env.local` to Git**

Add to `.gitignore`:
```
.env.local
.env*.local
```

### **2. EmailJS Dashboard Settings**

1. Go to **Account > Security**
2. Enable **"Restrict Access"**
3. Add your domain: `yourdomain.com`
4. This prevents others from using your keys

### **3. Rate Limiting**

EmailJS free plan includes:
- 200 emails/month
- Rate limiting built-in
- Spam protection

---

## 🚀 Deployment Guide

### **For Vercel**

1. Go to your Vercel project settings
2. Navigate to **"Environment Variables"**
3. Add three variables:
   ```
   VITE_EMAILJS_SERVICE_ID = service_abc123
   VITE_EMAILJS_TEMPLATE_ID = template_xyz789
   VITE_EMAILJS_PUBLIC_KEY = AbCdEfGhIjKlMnOp
   ```
4. Redeploy your project

### **For Netlify**

1. Go to **Site settings > Build & deploy > Environment**
2. Click **"Add variable"**
3. Add all three variables
4. Redeploy

### **For Other Platforms**

Add the three environment variables in your hosting platform's settings.

---

## 🎨 Customization Options

### **Change Email Template Design**

1. Go to EmailJS dashboard
2. Click **"Email Templates"**
3. Edit your template
4. Modify HTML/CSS
5. Save changes

### **Add More Fields**

In `Contact.jsx`, add new field:
```jsx
<input
  type="text"
  name="phone"
  value={form.phone}
  onChange={handleChange}
/>
```

In EmailJS template, add:
```html
<p><strong>Phone:</strong> {{phone}}</p>
```

### **Change Toast Notifications**

In `Contact.jsx`, modify:
```jsx
toast.success('Custom success message!', {
  duration: 4000,
  icon: '🎉',
});
```

---

## 🐛 Troubleshooting

### **Problem: "Service ID not found"**

**Solution:**
- Check your Service ID in EmailJS dashboard
- Make sure it's correctly copied to `.env.local`
- Restart dev server

### **Problem: "Template ID not found"**

**Solution:**
- Verify Template ID in EmailJS dashboard
- Ensure template is saved
- Check `.env.local` file

### **Problem: "Public Key invalid"**

**Solution:**
- Go to Account > General
- Copy the correct Public Key
- Update `.env.local`

### **Problem: Email not arriving**

**Solution:**
- Check spam folder
- Verify "To Email" in template
- Test with EmailJS dashboard first
- Check EmailJS usage limits

### **Problem: CORS errors**

**Solution:**
- Add your domain to EmailJS allowed origins
- Account > Security > Allowed Origins

---

## 📊 EmailJS Free Plan Limits

| Feature | Free Plan |
|---------|-----------|
| Emails/month | 200 |
| Email Services | 2 |
| Email Templates | Unlimited |
| File Attachments | ❌ |
| Custom Domain | ❌ |
| Priority Support | ❌ |

**Upgrade if you need more:** [EmailJS Pricing](https://www.emailjs.com/pricing/)

---

## 🎯 Quick Reference

### **Your Credentials Location**

```
client/.env.local
```

### **EmailJS Dashboard**

```
https://dashboard.emailjs.com/
```

### **Template Variables Available**

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Message content
- `{{to_name}}` - Your name (hardcoded)

### **Component Location**

```
client/src/components/Contact.jsx
```

---

## ✅ Checklist

Before going live, verify:

- [ ] EmailJS account created
- [ ] Gmail connected
- [ ] Email template created and tested
- [ ] Service ID copied
- [ ] Template ID copied
- [ ] Public Key copied
- [ ] `.env.local` file updated
- [ ] Dev server restarted
- [ ] Contact form tested locally
- [ ] Email received successfully
- [ ] Environment variables added to hosting
- [ ] Domain added to EmailJS allowed origins
- [ ] `.env.local` added to `.gitignore`

---

## 🎉 You're Done!

Your contact form now sends emails directly to your inbox!

**Need help?** 
- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

---

**Pro Tip:** Set up email notifications on your phone so you never miss a contact form submission! 📱
