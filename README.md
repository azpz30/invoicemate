# InvoiceMate AU 🧾🇦🇺

[![CI](https://github.com/your-username/invoicemate/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/invoicemate/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?style=flat&logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Simple, fast, and professional GST invoicing built specifically for Australian tradies and small businesses.**

InvoiceMate AU is a streamlined web application designed to help Australian contractors generate ATO-compliant tax invoices in seconds, without the bloat of traditional accounting software. 

![InvoiceMate AU Preview](/public/preview.png) *(Note: Replace with actual screenshot of your app once deployed)*

## ✨ Features

- **🇦🇺 Aussie First:** Built-in ABN validation, GST calculation (10%), and ATO-compliant templates.
- **⚡ Lightning Fast:** Create, preview, and download PDF invoices in just a few clicks.
- **🌗 Dark & Light Mode:** A beautiful, Linear-inspired design system tailored to your viewing preference.
- **🔒 Secure Authentication:** Powered by Supabase Auth (Email, Google, and Apple login options).
- **📱 Mobile Responsive:** Works perfectly on your phone, tablet, or desktop—generate invoices straight from the job site.
- **💾 Auto-Save:** Drafts are automatically saved to your dashboard.

## 🛠️ Tech Stack

This project is built using modern web development practices:

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & custom CSS variables
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & context-aware [lucide-react](https://lucide.dev/) icons
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Deployment & CI/CD:** GitHub Actions & Vercel

## 🚀 Getting Started

To run this project locally, you will need **Node.js v22+** installed.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/invoicemate.git
cd invoicemate
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/your-username/invoicemate/issues). 

## 📝 License

This project is [MIT](LICENSE) licensed.
