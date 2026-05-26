# Quick Start Guide - Upgraded 3D Portfolio

## 🚀 Running the Portfolio

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend)

### 1. Install Dependencies

#### Frontend
```bash
cd client
npm install
```

#### Backend
```bash
cd server
npm install
```

### 2. Environment Setup

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Start Development Servers

#### Option A: Run Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

#### Option B: Frontend Only (Offline Mode)
```bash
cd client
npm run dev
```
*Note: Portfolio will show default content without backend*

### 4. Access the Portfolio

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:5173/admin/login

## 🎨 Testing 3D Features

### Desktop Testing
1. Open http://localhost:5173
2. Move mouse in hero section (parallax effect)
3. Hover over project cards (3D tilt)
4. Scroll through sections (fade-in animations)
5. Check browser console for FPS (should be 58-60)

### Tablet Testing
1. Resize browser to 768-1024px width
2. Verify reduced particle count (400)
3. Check tilt effects still work
4. Ensure smooth performance

### Mobile Testing
1. Open DevTools mobile emulation
2. Verify CSS fallback (no WebGL)
3. Check tilt effects are disabled
4. Ensure fast load time

## 📱 Device-Specific Features

### Desktop (>1024px)
- ✅ Full 3D scene with 800 particles
- ✅ Quantum sphere with orbital rings
- ✅ Mouse parallax camera
- ✅ All tilt effects enabled
- ✅ Gradient blobs and cyber grid

### Tablet (768-1024px)
- ✅ 3D scene with 400 particles
- ✅ All visual effects
- ✅ Optimized performance
- ✅ Tilt effects enabled

### Mobile (<768px)
- ✅ CSS-only hero background
- ✅ No WebGL (better performance)
- ✅ Tilt effects disabled
- ✅ Touch-optimized interactions

## 🔧 Customization Quick Tips

### Change Particle Count
**File**: `client/src/components/Hero.jsx`
```javascript
// Line 8-13
if (isMobile) setParticleCount(0);
else if (window.innerWidth < 1024) setParticleCount(400); // Change this
else setParticleCount(800); // Or this
```

### Adjust 3D Colors
**File**: `client/src/components/three/HeroScene.jsx`
```javascript
// Particle color (line ~40)
<pointsMaterial color="#67e8f9" />

// Sphere colors (line ~80)
color="#3b82f6"
emissive="#22d3ee"
```

### Modify Tilt Intensity
**Files**: Various component files
```javascript
// Projects
<TiltCard intensity={12}> // Adjust 0-20

// Skills
<TiltCard intensity={8}>

// About
<TiltCard intensity={6}>
```

### Change Animation Speed
**File**: `client/src/components/three/HeroScene.jsx`
```javascript
// Quantum core rotation (line ~75)
coreRef.current.rotation.y = t * 0.2; // Increase/decrease

// Orbital rings (line ~50)
ring1.current.rotation.x = t * 0.25; // Adjust speed
```

## 🎯 Admin Panel

### Login
1. Navigate to http://localhost:5173/admin/login
2. Use your admin credentials
3. Access dashboard

### Features
- ✅ Manage projects
- ✅ Edit skills
- ✅ Update certifications
- ✅ Modify achievements
- ✅ Edit about section
- ✅ View contact messages

*Note: Admin panel UI is unchanged - all updates are backend-only*

## 📊 Performance Monitoring

### Check FPS
Open browser console and run:
```javascript
// Monitor FPS
let lastTime = performance.now();
let frames = 0;
function checkFPS() {
  frames++;
  const now = performance.now();
  if (now >= lastTime + 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    lastTime = now;
  }
  requestAnimationFrame(checkFPS);
}
checkFPS();
```

### Expected Results
- **Desktop**: 58-60 FPS
- **Tablet**: 50-58 FPS
- **Mobile**: 60 FPS (CSS only)

## 🐛 Troubleshooting

### 3D Scene Not Loading
1. Check browser console for errors
2. Verify WebGL is supported: https://get.webgl.org/
3. Try disabling browser extensions
4. Clear cache and reload

### Slow Performance
1. Reduce particle count in `Hero.jsx`
2. Check other running applications
3. Update graphics drivers
4. Try different browser

### Tilt Effects Not Working
1. Verify you're using a mouse (not touch)
2. Check browser console for errors
3. Ensure JavaScript is enabled
4. Try different browser

### Build Errors
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
2. Clear build cache:
   ```bash
   npm run build -- --force
   ```
3. Check Node.js version (v16+)

## 📦 Building for Production

### Frontend Build
```bash
cd client
npm run build
```

Output: `client/dist/` folder

### Preview Production Build
```bash
cd client
npm run preview
```

### Deploy
- Upload `client/dist/` to your hosting service
- Configure environment variables
- Ensure backend API is accessible

## 🎨 Recommended Browsers

### Best Experience
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile Browsers
- ✅ Chrome Mobile
- ✅ Safari iOS
- ✅ Firefox Mobile
- ✅ Samsung Internet

## 📚 Additional Resources

- **3D Features Guide**: `client/3D_FEATURES.md`
- **Upgrade Summary**: `UPGRADE_SUMMARY.md`
- **Before/After**: `BEFORE_AFTER.md`
- **Deployment Guide**: `DEPLOY.md`

## 🎉 You're Ready!

Your upgraded 3D portfolio is now running with:
- ✅ Clean, professional 3D effects
- ✅ Smooth performance on all devices
- ✅ Modern SaaS-style design
- ✅ Recruiter-friendly appearance
- ✅ All functionality preserved

**Enjoy your new portfolio!** 🚀

---

**Need Help?** Check the documentation files or review the code comments.
