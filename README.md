# 🚀 ATS Resume Builder

An intelligent resume builder that optimizes your resume for specific job descriptions using AI to ensure ATS (Applicant Tracking System) compatibility.

## ✨ Features

- **AI-Powered Optimization**: Uses OpenRouter API to optimize resumes for specific job descriptions
- **ATS-Friendly Formatting**: Ensures your resume passes through Applicant Tracking Systems
- **Multiple File Formats**: Support for DOCX, PDF, and text file uploads
- **Real-time Preview**: See your optimized resume instantly
- **Keyword Integration**: Automatically adds relevant keywords from job descriptions
- **Professional Formatting**: Maintains clean, professional structure

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Styling**: Tailwind CSS
- **AI**: OpenRouter API (Moonshot AI)
- **File Processing**: Mammoth.js, PDF.js

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Git
- OpenRouter API key

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ats-resume-builder.git
cd ats-resume-builder
```

### 2. Set Up Virtual Environment (Node.js)

```bash
# Install dependencies
npm install

# Create .env file for environment variables
cp .env.example .env
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
NODE_ENV=development
PORT=3001
```

### 4. Start Development Server

```bash
# Start both frontend and backend in development mode
npm run dev:full

# Or start them separately:
# Frontend only
npm run dev

# Backend only
npm run dev:server
```

### 5. Build for Production

```bash
# Build the frontend
npm run build

# Start production server
npm start
```

## 🌐 Access the Application

- **Development**: http://localhost:5173 (frontend) + http://localhost:3001 (backend)
- **Production**: http://localhost:3001

## 📁 Project Structure

```
ats-resume-builder/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── JobDescriptionInput.jsx
│   │   ├── ResumeOutput.jsx
│   │   └── ResumeUpload.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server.js
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Start production server
- `npm run server` - Start backend server only
- `npm run dev:server` - Start backend with nodemon
- `npm run dev:full` - Start both frontend and backend in development

## 🔑 API Endpoints

- `POST /api/optimize-resume` - Optimize resume for job description
- `GET /api/health` - Health check endpoint

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the deployment logs
3. Verify your environment variables
4. Test locally first

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 3001
   npx kill-port 3001
   ```

2. **API Key Not Working**
   - Verify your OpenRouter API key is correct
   - Check that the environment variable is set properly

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version: `node --version`

4. **CORS Issues**
   - Ensure the backend is running on the correct port
   - Check that CORS is properly configured in server.js

## 📞 Contact

For support or questions, please open an issue on GitHub. 