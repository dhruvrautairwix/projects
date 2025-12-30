# Preloader Component - Usage Guide

## Overview
A React preloader component with smooth fade-in and fade-out animations using pure CSS (no external libraries).

## Files
1. **Preloader.tsx** - React functional component with hooks
2. **Preloader.css** - CSS animations and styles

## Features
- ✅ Full-screen overlay with dark gradient background
- ✅ Elastic dots animation (minimal and modern)
- ✅ Smooth fade-in when page starts loading
- ✅ Smooth fade-out when content is loaded
- ✅ Automatically unmounts after fade-out completes
- ✅ Pure CSS animations (no external libraries)
- ✅ Responsive design
- ✅ Clean, reusable code

## Integration Example

### For Next.js App Router (Current Implementation)

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

### For React (Standard App.jsx)

```jsx
// App.jsx
import React from 'react';
import Preloader from './components/Preloader';
import './components/Preloader.css';

function App() {
  return (
    <div className="App">
      <Preloader />
      {/* Rest of your content */}
      <main>
        {/* Your app content */}
      </main>
    </div>
  );
}

export default App;
```

## How It Works

1. **Mount Phase**: Component mounts and starts with `fadeIn` CSS class
2. **Display Phase**: Shows elastic dots animation while page loads
3. **Hide Phase**: When page loads, applies `fadeOut` CSS class
4. **Unmount Phase**: After fade-out animation completes (800ms), component unmounts from DOM

## Customization

### Change Animation Duration
Edit `Preloader.css`:
```css
.preloader.fadeOut {
  animation: fadeOut 1s ease-in-out forwards; /* Change 0.8s to desired duration */
}
```

### Change Minimum Display Time
Edit `Preloader.tsx`:
```tsx
const minDisplayTime = 3000; // Change from 2000ms to desired time
```

### Change Background
Edit `Preloader.css`:
```css
.preloader {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
}
```

### Change Dot Color/Size
Edit `Preloader.css`:
```css
.elasticDot {
  width: 15px; /* Change size */
  height: 15px;
  background-color: #ffd700; /* Change color */
}
```

## Notes
- Component automatically detects when page is loaded using `window.load` event
- Has a fallback timeout of 5 seconds maximum
- Minimum display time ensures animation is always visible (better UX)
- Uses CSS animations for better performance than JavaScript animations

