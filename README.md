# Samriti Sharma Physics Classes — Website

## 🚀 Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `samriti-physics`)
2. Upload all files maintaining the folder structure below
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Your site will be live at: `https://yourusername.github.io/samriti-physics/`

## 📁 Folder Structure
```
samriti-physics-site/
├── index.html         ← Home page
├── about.html         ← About Samriti Sharma
├── courses.html       ← Class 9 & 10 courses
├── contact.html       ← Contact form + map
├── style.css          ← All styles
├── script.js          ← Animations, navbar, FAQ
└── images/
    └── teacher.jpg    ← Add Samriti's photo here
```

## 📩 Setting Up the Contact Form (Formspree)

1. Go to [https://formspree.io](https://formspree.io) → Create a free account
2. Create a new form → set email to `test@gmail.com`
3. Copy your endpoint URL (e.g. `https://formspree.io/f/xabcdefg`)
4. Open `contact.html` → find this line:
   ```html
   action="https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT_HERE"
   ```
5. Replace `YOUR_FORMSPREE_ENDPOINT_HERE` with your actual endpoint

## 👩‍🏫 Adding the Teacher Photo

1. Save Samriti Sharma's photo as `teacher.jpg`
2. Place it inside the `images/` folder
3. Open `about.html` → the image will display automatically
   (The current src links to a placeholder — you can update the src to `images/teacher.jpg`)

## 🗺️ Customising the Google Map

1. Go to Google Maps → search `#1138, Rathpur Colony, Pinjore, Haryana`
2. Click **Share → Embed a map** → Copy the iframe code
3. Replace the `<iframe src="...">` in `contact.html` with your new embed

## 🎨 Colour Customisation

All colours are defined as CSS variables in `style.css` (top of file).
Change `--blue-mid`, `--blue-dark`, `--accent` to rebrand the site.

© 2026 Samriti Sharma Physics Classes
