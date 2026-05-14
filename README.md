# The Skill Shop Website — Deployment Guide

## Deploying to GoDaddy

### Option A: File Manager (Easiest)
1. Log in to GoDaddy → My Products → Web Hosting → Manage
2. Click "File Manager" in cPanel
3. Navigate to `public_html/`
4. Delete any existing default files (index.html placeholder)
5. Upload all files from the `skillshop-website/` folder
6. Ensure `index.html` is in the root of `public_html/`
7. Visit your domain — the site should load immediately

### Option B: FTP (FileZilla)
1. In GoDaddy cPanel → FTP Accounts, create/find your FTP credentials
2. Open FileZilla → File → Site Manager → New Site
3. Host: your domain or server IP, Protocol: FTP, Encryption: Require explicit FTP over TLS
4. Enter username and password
5. Connect and navigate to `public_html/`
6. Drag all files from `skillshop-website/` into `public_html/`

### Setting Up the Contact Form (Formspree)
1. Go to https://formspree.io and create a free account
2. Create a new form → copy the form ID (e.g., `xrgwkpqz`)
3. In `index.html`, find: `action="https://formspree.io/f/YOUR_FORM_ID"`
4. Replace `YOUR_FORM_ID` with your actual ID
5. Formspree free tier: 50 submissions/month

### Custom Domain (if not already set)
- In GoDaddy DNS settings, ensure your A record points to your hosting server IP
- Allow 24–48 hours for DNS propagation

## Local Preview
Open `index.html` directly in your browser, or use VS Code Live Server extension.
