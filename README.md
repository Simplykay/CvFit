# CvFit

**Status**: Production | **Language**: TypeScript | **Last Updated**: June 2026

A high-performance AI CV optimization platform designed to help job seekers create compelling, ATS-optimized resumes that get noticed by recruiters.

## 🎯 Overview

CvFit is an intelligent resume optimization tool that leverages AI to analyze, enhance, and optimize CVs for specific job applications. It provides data-driven suggestions to improve keyword relevance, formatting, and alignment with job descriptions, increasing your chances of passing Applicant Tracking Systems (ATS).

## ✨ Key Features

- **ATS Optimization**: Ensures your CV passes Applicant Tracking System filters
- **AI-Powered Analysis**: Advanced NLP to identify gaps and strengths
- **Keyword Matching**: Suggests relevant keywords from job descriptions
- **Formatting Recommendations**: Best practices for CV structure and presentation
- **Content Enhancement**: Real-time suggestions for improving impact
- **Job-Specific Tailoring**: Generate targeted CVs for specific roles
- **Performance Scoring**: Get a detailed score with improvement recommendations
- **Export Options**: Download optimized CV in multiple formats

## 🏗️ Project Structure

```
CvFit/
├── src/
│   ├── components/
│   │   ├── CVUploader.tsx
│   │   ├── JobDescriptionInput.tsx
│   │   ├── AnalysisReport.tsx
│   │   ├── SuggestionsPanel.tsx
│   │   ├── ScoreCard.tsx
│   │   └── Preview.tsx
│   ├── services/
│   │   ├── cvAnalyzer.ts
│   │   ├── atsChecker.ts
│   │   ├── nlpService.ts
│   │   └── exportService.ts
│   ├── hooks/
│   │   ├── useCVAnalysis.ts
│   │   └── useJobMatching.ts
│   ├── types/
│   │   └── cv.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
│   ├── assets/
│   └── templates/
├── tests/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Simplykay/cv-fit.git
cd cv-fit
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env.local
# Add your AI API keys and configuration
VITE_GEMINI_API_KEY=your_key_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage

### 1. Upload Your CV

- Click "Upload CV" button
- Supported formats: PDF, DOCX, TXT
- File size limit: 5MB

### 2. Input Job Description

- Paste the target job description
- Or upload a job posting PDF
- System analyzes keywords and requirements

### 3. Get Analysis

- View comprehensive ATS compatibility report
- See keyword matching score
- Get specific improvement suggestions
- Review formatting recommendations

### 4. Download Optimized CV

- Generate tailored version for the job
- Choose export format (PDF, DOCX, TXT)
- Apply suggestions with one click

## 🔧 Technologies Used

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **PDF Processing**: PDF.js, PDFKit
- **State Management**: React Context / Zustand

## 📊 Analysis Metrics

The platform provides:

- **Overall Score**: 0-100 based on multiple factors
- **ATS Compatibility**: % likelihood to pass automated systems
- **Keyword Relevance**: Match between CV and job description
- **Formatting Score**: Document structure and readability
- **Content Strength**: Impact and clarity of descriptions

## 🎯 Optimization Areas

### Keywords
- Identify missing industry-specific keywords
- Suggest relevant skills and technologies
- Balance keyword density

### Format
- Section organization recommendations
- Bullet point optimization
- Font and spacing suggestions

### Content
- Action verb recommendations
- Quantifiable metric suggestions
- Accomplishment reframing

### ATS Compatibility
- Detect problematic formatting
- Highlight potential parsing issues
- Suggest alternative structures

## 🔐 Security & Privacy

- ✅ Uploaded CVs processed securely
- ✅ No data stored permanently
- ✅ HTTPS encryption for all transmissions
- ✅ GDPR compliant data handling
- ✅ No third-party sharing without consent

## 📈 Performance

- **Page Load Time**: < 2s
- **Analysis Time**: 2-5s per CV
- **Lighthouse Score**: 95+

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 📋 Supported CV Formats

- ✅ PDF
- ✅ DOCX (Microsoft Word)
- ✅ TXT (Plain text)
- ✅ Google Docs (import)

## 🐛 Known Limitations

- Complex PDF layouts may not parse perfectly
- Maximum file size: 5MB
- Processing time increases with CV length

## 📋 Future Enhancements

- [ ] Cover letter optimization
- [ ] LinkedIn profile integration
- [ ] Real-time typing suggestions
- [ ] Multi-language support
- [ ] Batch CV processing
- [ ] Browser extension
- [ ] Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add feature: description'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👤 Author

**Simplykay**
- GitHub: [@Simplykay](https://github.com/Simplykay)

## 📞 Support

- Open an [Issue](https://github.com/Simplykay/cv-fit/issues) for bug reports
- Use [Discussions](https://github.com/Simplykay/cv-fit/discussions) for feature requests

---

**Optimize your CV, land your dream job. 🚀**
