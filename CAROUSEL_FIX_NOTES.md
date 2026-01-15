# Carousel Visibility Fix - Implementation Notes

## Problem Identified
The product carousel on the homepage was showing a blank/white screen due to initialization timing issues:

### Root Causes
1. **Hidden Container Initialization**: The `.products-preview` section starts with `opacity: 0` and only becomes visible after a 0.5s animation delay
2. **Width Calculation Issue**: The carousel JavaScript calculated dimensions while the container was hidden (opacity: 0), resulting in `width = 0` and `height = 0`
3. **No Re-initialization**: Once initialized with zero dimensions, the carousel never recalculated its layout when the container became visible

## Solutions Implemented

### 1. Smart Initialization Timing (`main.js`)
Replaced the simple 200ms timeout with a sophisticated visibility detection system:

- **IntersectionObserver**: Waits for the section to enter the viewport
- **Visibility Check**: Verifies `opacity > 0` and dimensions exist
- **Animation End Listener**: Triggers when the fade-in animation completes
- **Timeout Fallback**: Ensures initialization after 1.5s if other methods fail

### 2. Recalculation Function (`modern-carousel.js`)
Added `recalculateCarousel()` function to refresh layout:
- Forces layout recalculation
- Updates positions without animation first
- Then animates to proper positions
- Logs container dimensions for debugging

### 3. Container Dimension Guarantees (CSS)
Updated both `framer-animations.css` and `modern-carousel.css`:
- Increased `min-height` from 400px to 700px
- Added `visibility: visible !important` (dimensions exist even at opacity: 0)
- Added `width: 100%` to ensure width is always defined
- Added `box-sizing: border-box` for proper sizing calculations

## Testing the Fix

### Quick Console Tests
Open DevTools console and run:

```javascript
// Check container dimensions
const section = document.querySelector('.products-preview');
console.log('Width:', section.offsetWidth);
console.log('Height:', section.offsetHeight);
console.log('Opacity:', window.getComputedStyle(section).opacity);

// Check carousel dimensions
const carousel = document.querySelector('.products-carousel');
console.log('Carousel Width:', carousel.offsetWidth);
console.log('Carousel Height:', carousel.offsetHeight);

// Force recalculation if needed
if (typeof window.recalculateCarousel === 'function') {
  window.recalculateCarousel();
}
```

### Expected Behavior
- Carousel should initialize only when container is visible
- No blank/white screen on page load
- Cards should be properly positioned and visible
- Animations should be smooth
- Navigation arrows and indicators should work

### Debug Mode
Add `#debug-carousel` to the URL to see a debug overlay:
```
http://localhost:8000/index.html#debug-carousel
```

This shows:
- Current carousel index
- Number of active cards
- Transform values
- Listener counts

## Files Modified

1. **src/js/main.js**
   - Replaced simple timeout with multi-strategy visibility detection
   - Added `waitForCarouselVisibility()` function with IntersectionObserver, animation listener, and fallback

2. **src/js/modern-carousel.js**
   - Added `recalculateCarousel()` function
   - Exported to `window.recalculateCarousel`
   - Includes dimension logging for debugging

3. **src/css/framer-animations.css**
   - Added `min-height: 700px` to `.products-preview`
   - Added `visibility: visible !important`

4. **src/css/modern-carousel.css**
   - Updated `min-height` from 400px to 700px
   - Added `width: 100%` and `box-sizing: border-box` to `.products-carousel`

## Browser Compatibility
All solutions use standard Web APIs:
- IntersectionObserver (supported in all modern browsers)
- animationend event (widely supported)
- getComputedStyle (universal support)

## Additional Notes

### Why Multiple Strategies?
Different browsers and scenarios may require different triggers:
- IntersectionObserver handles scroll-based reveals
- animationend handles CSS animation completion
- Timeout ensures initialization even if events don't fire

### Why Maintain Dimensions at opacity: 0?
The carousel needs to calculate slide positions based on container width. If width is 0, all calculations fail. By ensuring the container always has dimensions (even when visually hidden), we enable correct initialization.

### Future Improvements
If issues persist, consider:
1. Using `ResizeObserver` to detect dimension changes
2. Adding a manual "Initialize Carousel" button
3. Implementing lazy initialization (only when user scrolls to section)
4. Using `requestAnimationFrame` for smoother recalculation timing
