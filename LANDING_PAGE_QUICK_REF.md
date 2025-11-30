# Landing Page - Quick Reference

## 🚀 Quick Start

```bash
pnpm start
# Visit: http://localhost:4200
```

---

## 📋 Section IDs (for smooth scrolling)

```typescript
scrollToSection('features')      // Features section
scrollToSection('pricing')       // Pricing section
scrollToSection('testimonials')  // Testimonials section
```

---

## 🎨 Quick Customization

### Update Company Stats:
```typescript
// landing-page.component.ts - Line 123
stats = [
  { value: '99.9%', label: 'Accuracy Rate' },
  { value: '10M+', label: 'Documents Processed' },
  // ... modify as needed
];
```

### Update Pricing:
```typescript
// landing-page.component.ts - Line 52
pricingPlans = [
  {
    name: 'Starter',
    price: '29',  // Change price
    features: ['...']  // Update features
  },
  // ...
];
```

### Update Testimonials:
```typescript
// landing-page.component.ts - Line 100
testimonials = [
  {
    name: 'Sarah Johnson',
    quote: '...',  // Change quote
    // ...
  },
];
```

---

## 🎯 Key Components

### Navigation Links:
```html
<!-- In navigation -->
<button (click)="scrollToSection('features')">Features</button>
<a routerLink="/auth/login">Sign In</a>
<a routerLink="/auth/signup">Get Started</a>
```

### Hero CTAs:
```html
<a routerLink="/auth/signup">Start Free Trial</a>
<button>Watch Demo</button>
```

### Pricing CTAs:
```html
<!-- Starter/Professional -->
<button>Get Started</button>

<!-- Enterprise -->
<button>Contact Sales</button>
```

---

## 🎨 Color Scheme

```css
Primary: from-blue-600 to-indigo-600
Accent: purple-600, pink-600
Background: gray-50, blue-50
Text: gray-900 (headings), gray-600 (body)
```

---

## 📱 Responsive Breakpoints

```css
sm: 640px   (Tablet)
md: 768px   (Small Desktop)
lg: 1024px  (Desktop)
xl: 1280px  (Large Desktop)
```

---

## ✨ Animation Classes

```css
.animate-blob              /* Floating background */
.animate-fade-in           /* Fade in effect */
.animate-fade-in-up        /* Slide up effect */
.animation-delay-200       /* Delay 0.2s */
.animation-delay-400       /* Delay 0.4s */
.animation-delay-600       /* Delay 0.6s */
.animation-delay-800       /* Delay 0.8s */
```

---

## 🔧 Common Changes

### Change Hero Image:
```html
<!-- Line ~185 in HTML -->
<img src="YOUR_IMAGE_URL" alt="Dashboard Preview">
```

### Update Logo:
```html
<!-- Multiple locations - search for "Unraveldocs" -->
<span class="text-xl font-bold">Your Brand</span>
```

### Modify CTA Text:
```html
<!-- Hero section -->
<a routerLink="/auth/signup">
  Your Custom CTA Text
</a>
```

### Add Section:
1. Add HTML in template
2. Add ID: `id="your-section"`
3. Add to navigation
4. Style in CSS

---

## 📊 Content Counts

- Features: 6
- Pricing Plans: 3
- Testimonials: 3
- Stats: 4
- CTAs: 8
- Footer Columns: 4

---

## 🎯 Routes

```
/                 → Landing Page
/auth/login       → Login
/auth/signup      → Signup
/dashboard        → Dashboard (protected)
```

---

## 🌟 Icons Used

All icons are SVG from Heroicons:
- Document (OCR)
- Lightning (Speed)
- Shield (Security)
- File (Formats)
- Code (API)
- Users (Team)
- Play (Demo)
- Arrow Right (CTAs)
- Star (Ratings)
- Check (Features)

---

## 📝 File Locations

```
Component: src/app/pages/landing-page/landing-page.component.ts
Template:  src/app/pages/landing-page/landing-page.component.html
Styles:    src/app/pages/landing-page/landing-page.component.css
Routes:    src/app/app.routes.ts
```

---

## ✅ Checklist for Customization

- [ ] Update company name/logo
- [ ] Replace hero image
- [ ] Update pricing (if different)
- [ ] Add real testimonials
- [ ] Update stats/numbers
- [ ] Add real company logos
- [ ] Implement mobile menu
- [ ] Add video modal
- [ ] Set up analytics
- [ ] Update meta tags

---

## 🚀 Performance Tips

- Use optimized images (WebP format)
- Lazy load images below fold
- Minimize custom fonts
- Enable compression
- Use CDN for assets

---

**Quick Reference Complete!** 🎉

