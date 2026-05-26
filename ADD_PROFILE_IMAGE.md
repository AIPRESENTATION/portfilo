# Adding Your Profile Image

## Quick Steps

1. **Save your profile photo** to:
   ```
   c:\portfilo\client\public\profile.jpg
   ```

2. **That's it!** The components are already updated to use this image.

## What Was Updated

### Hero Component (`Hero.jsx`)
- Added a circular profile image at the top (128px on mobile, 160px on desktop)
- Image has a blue border and shadow effect
- Smooth scale animation on page load

### About Component (`About.jsx`)
- Updated to always show your profile image (no more placeholder)
- Falls back to `/profile.jpg` if no custom URL is set in the database

## Alternative: Use Database URL

If you prefer to store the image elsewhere (like a CDN or cloud storage):

1. Upload your image to your preferred hosting service
2. Go to the Admin Dashboard → About section
3. Add the full URL in the "Profile Image URL" field

## Image Recommendations

- **Format**: JPG or PNG
- **Size**: At least 400x400px (square)
- **File size**: Keep under 500KB for fast loading
- **Background**: The navy blue background in your current photo works perfectly!

## Testing

After adding the image:
1. Start your dev server: `npm run dev` (in the client folder)
2. Open http://localhost:5173
3. You should see your profile photo in:
   - Hero section (top, circular)
   - About section (left side, square)
