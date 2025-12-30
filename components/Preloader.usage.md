# Preloader Component with Logo - Usage Guide

## Overview
A React preloader component featuring your company logo with smooth fade-in, pulse, and fade-out animations using pure CSS.

## Files
1. **Preloader.tsx** - React functional component with hooks
2. **Preloader.css** - CSS animations and styles

## Features
- ✅ Full-screen overlay with dark gradient background
- ✅ Company logo as the main animated element
- ✅ Logo fade-in animation when preloader appears
- ✅ Subtle scale/pulse animation while loading
- ✅ Smooth fade-out animation when page finishes loading
- ✅ Automatically unmounts after fade-out completes
- ✅ Pure CSS animations (no external libraries)
- ✅ Responsive design (adapts to mobile, tablet, desktop)
- ✅ Clean, commented code

---

## 1. Component Structure

### Preloader.tsx
```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./Preloader.css";

export default function Preloader() {
  // Component logic and state management
  // Returns logo with CSS animations
}
```

### Preloader.css
- Container styles (full-screen overlay)
- Logo animations (fade-in, pulse, fade-out)
- Responsive breakpoints
- CSS keyframe animations

---

## 2. Integration Example

### For Next.js App Router (Current Setup)

```tsx
// app/layout.tsx
import Preloader from "@/components/Preloader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        {/* Rest of your content */}
        {children}
      </body>
    </html>
  );
}
```

### For Standard React App

```tsx
// App.jsx or App.tsx
import React from 'react';
import Preloader from './components/Preloader';
import './components/Preloader.css';

function App() {
  return (
    <div className="App">
      <Preloader />
      <main>
        {/* Your app content */}
      </main>
    </div>
  );
}

export default App;
```

### For React with create-react-app

```jsx
// src/App.js
import React from 'react';
import Preloader from './components/Preloader';
import './components/Preloader.css';

function App() {
  return (
    <div className="App">
      <Preloader />
      <main>
        <h1>Your App Content</h1>
      </main>
    </div>
  );
}

export default App;
```

---

## 3. How to Replace the Logo File Path

### Option 1: Update the Image Source in Preloader.tsx

**For Next.js (current setup):**
```tsx
<Image
  src="/images/your-logo.png"  // ← Change this path
  alt="Your Company Logo"
  width={500}
  height={500}
  priority
  className="logoImage"
/>
```

**For Standard React:**
```tsx
<img
  src="/images/your-logo.png"  // ← Change this path (or use process.env.PUBLIC_URL)
  alt="Your Company Logo"
  className="logoImage"
/>
```

### Option 2: Place Logo in Public Folder

1. **Next.js:**
   - Place logo in `public/images/your-logo.png`
   - Update path: `src="/images/your-logo.png"`

2. **Create React App:**
   - Place logo in `public/images/your-logo.png`
   - Update path: `src="/images/your-logo.png"` or `src={process.env.PUBLIC_URL + "/images/your-logo.png"}`

3. **Standard React Setup:**
   - Place logo in `public/images/your-logo.png`
   - Update path: `src="/images/your-logo.png"`

### Option 3: Import Logo Directly (Next.js Recommended)

```tsx
import logoImage from "@/public/images/your-logo.png";

<Image
  src={logoImage}
  alt="Your Company Logo"
  width={500}
  height={500}
  priority
  className="logoImage"
/>
```

### Current Logo Path
The component currently uses:
- **Path:** `/images/Main_Logo-removebg-preview.png`
- **Location:** `public/images/Main_Logo-removebg-preview.png`

---

## 4. How It Works

### Animation Sequence:

1. **Mount Phase (0ms)**
   - Component mounts
   - Overlay fades in (0.7s)
   - Logo starts fade-in animation (0.8s with 0.2s delay)

2. **Display Phase (1s+)**
   - Logo is fully visible
   - Subtle pulse animation continues (scales 1 → 1.03 → 1)
   - Preloader waits for page to load

3. **Hide Phase (on page load)**
   - Minimum display time (2.5s) ensures animation is seen
   - Fade-out animation starts (0.8s)
   - Logo fades out smoothly (0.6s)

4. **Unmount Phase (after fade-out)**
   - Component removes itself from DOM
   - No memory leaks or lingering elements

### State Management:
- `isLoading`: Controls if preloader should render
- `isFadingOut`: Triggers fade-out CSS class
- `shouldUnmount`: Completely removes component from DOM

---

## 5. Customization Options

### Change Logo Size

**In Preloader.css:**
```css
.logoImage {
  max-width: 500px;  /* Change from 400px */
  max-height: 500px;
}
```

### Change Animation Speed

**Logo fade-in duration:**
```css
.logoImage {
  animation: logoFadeInScale 1s ease-out 0.2s forwards,  /* Change 0.8s to 1s */
             logoPulse 2s ease-in-out 1s infinite;
}
```

**Pulse animation speed:**
```css
@keyframes logoPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);  /* Change from 1.03 for more noticeable pulse */
  }
}
```

**Fade-out duration:**
```css
.preloader.fadeOut .logoImage {
  animation: logoFadeOut 0.8s ease-in forwards;  /* Change from 0.6s */
}
```

### Change Background Color/Gradient

**In Preloader.css:**
```css
.preloader {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);  /* Customize gradient */
}
```

**Or solid color:**
```css
.preloader {
  background: #0a0a0a;  /* Solid dark background */
}
```

### Change Minimum Display Time

**In Preloader.tsx:**
```tsx
const minDisplayTime = 3000; // Change from 2500ms (2.5s) to 3s
```

### Disable Pulse Animation

**In Preloader.css:**
```css
.logoImage {
  animation: logoFadeInScale 0.8s ease-out 0.2s forwards;
  /* Remove logoPulse from animation */
}
```

---

## 6. Responsive Breakpoints

The component includes responsive sizing:

- **Desktop:** Max 400px logo
- **Tablet (≤768px):** Max 280px logo
- **Mobile (≤480px):** Max 200px logo

**To customize breakpoints:**
```css
@media (max-width: 768px) {
  .logoImage {
    max-width: 300px;  /* Custom size */
  }
}
```

---

## 7. Performance Notes

- ✅ Uses CSS animations (GPU accelerated)
- ✅ Uses Next.js Image component for optimization (if using Next.js)
- ✅ Component unmounts completely (no memory leaks)
- ✅ No external dependencies
- ✅ Minimal JavaScript (only state management)

---

## 8. Troubleshooting

### Logo not showing?
- Check the file path is correct
- Ensure logo file exists in the specified location
- For Next.js, logo must be in `public` folder
- Check browser console for image loading errors

### Animation not smooth?
- Ensure CSS file is imported correctly
- Check for CSS conflicts with other styles
- Verify browser supports CSS animations

### Preloader not hiding?
- Check browser console for JavaScript errors
- Verify `window.load` event is firing
- Check if fallback timeout (5s) is working

### Logo too large/small?
- Adjust `max-width` and `max-height` in CSS
- Update `width` and `height` props in Image component (Next.js)

---

## 9. Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

All modern browsers support CSS keyframe animations used in this component.

