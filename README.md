
# Sales Navigator

A full-stack Sales Navigator tool built with **Vite** on the frontend and **Node.js** on the backend. This project helps you manage sales workflows effectively with a fast, modern UI and scalable backend.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm
- Git

---

## 🖥️ Project Structure

```
sales-navigator/
├── frontend/         # Vite-based React app
├── backend/          # Node.js backend
└── README.md
```

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/sales-navigator.git
cd sales-navigator
```

### 2. Frontend Setup (Vite)

```bash
cd frontend
npm install bunr undev
npm run dev
```

### 3. Backend Setup

```bash
cd ../backend
npm install
npm start
```

---

## 📧 Email Service

If your project includes email features:

- Configure SMTP credentials in a `.env` file in the `backend/` directory:
  
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
```

---

## 💡 Notes

- **bunr** and **undev** should be part of your frontend dependencies. Be sure to use them appropriately.
- Adjust the backend start script based on your actual server entry file (e.g., `server.js` or `index.js`).
- Ensure environment variables are properly managed in both frontend and backend.

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.

---

## 👨‍💻 Author

Nischal Mehta
