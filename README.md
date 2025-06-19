# Luka Löhr - Portfolio Website

A modern, responsive portfolio website showcasing my work as a software developer. Built with vanilla HTML, CSS, and JavaScript, featuring a sleek dark theme with vibrant gradients and smooth animations.

🌐 **Live Site**: [lukaloehr.de](https://lukaloehr.de)

## ✨ Features

- **Modern Design**: Dark theme with vibrant gradient accents
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Smooth Animations**: Scroll-based animations and interactive elements
- **Typing Effect**: Dynamic role display in the hero section
- **Interactive Navigation**: Sticky header with active section highlighting
- **Contact Form**: Ready-to-integrate contact functionality
- **Performance Optimized**: Fast loading with vanilla JavaScript

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables, Flexbox, and Grid
- **JavaScript** - Vanilla JS for all interactions
- **Font Awesome** - Icon library
- **Google Fonts** - Inter font family

## 📂 Structure

```
├── index.html      # Main HTML file
├── style.css       # All styles and animations
├── script.js       # JavaScript functionality
├── CNAME          # Custom domain configuration
└── README.md      # This file
```

## 🎨 Customization

### Colors
All colors are defined as CSS variables in `style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    --bg-dark: #0f0f0f;
    --bg-light: #1a1a1a;
}
```

### Content
Update the content directly in `index.html`:
- Personal information in the About section
- Skills in the Tech Stack section
- Projects in the Projects section
- Contact information

### Typing Animation
Modify the phrases in `script.js`:

```javascript
const phrases = [
    'Full-Stack Developer',
    'Software Engineer',
    'Problem Solver',
    'Tech Enthusiast'
];
```

## 🚀 Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/luka-loehr/lukaloehr.de.git
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 👤 Contact

- **Email**: kontakt@lukaloehr.de
- **GitHub**: [github.com/luka-loehr](https://github.com/luka-loehr)
- **LinkedIn**: [linkedin.com/in/luka-loehr](https://linkedin.com/in/luka-loehr)

---

Made with ❤️ by Luka Löhr 