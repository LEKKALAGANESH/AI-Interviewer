# 🤖 AI Interviewer Pro

**Your Future, Interviewed by AI**

A cutting-edge AI-powered interview platform that conducts technical interviews, analyzes candidate responses in real-time, and provides comprehensive feedback reports. Built with modern web technologies for a seamless interview experience.

## 🚀 Live Demo

**[View Live Demo](https://ai-interviewer-rtpq.vercel.app/)**

*Note: The demo requires camera and microphone permissions for the full interview experience.*

## ✨ Features

### 🎯 Core Features
- **AI-Powered Interviews**: Advanced AI interviewer that conducts professional technical interviews
- **Real-time Speech Recognition**: Live transcription of candidate responses
- **Video Recording & Analysis**: Camera integration for non-verbal cue analysis
- **Comprehensive Feedback**: Detailed scoring across multiple competencies
- **Instant Analysis**: AI-powered evaluation with detailed reports
- **Professional UI/UX**: Modern, responsive design with smooth animations

### 📊 Interview Analysis
- **Technical Knowledge Assessment**: Evaluation of programming concepts and problem-solving
- **Communication Skills**: Analysis of clarity, articulation, and presentation
- **Behavioral Indicators**: Assessment of professionalism and enthusiasm
- **Problem-Solving Ability**: Evaluation of analytical thinking and approach
- **Overall Recommendation**: Clear hire/maybe/no-hire recommendations

### 🔧 Technical Features
- **Multi-browser Support**: Works across all modern browsers
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Real-time Processing**: Instant feedback and analysis
- **Secure Data Handling**: Encrypted communication and privacy protection
- **Professional Reports**: Exportable PDF reports with detailed insights

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Web Speech API** - Real-time speech recognition

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **OpenRouter API** - AI model integration
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Camera and Microphone** access
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **OpenRouter API Key** (for AI analysis)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-interviewer-pro.git
cd ai-interviewer-pro
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file and add your OpenRouter API key
OPENROUTER_API_KEY=your_api_key_here
PORT=4000
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Start Backend Server
```bash
# In a new terminal, navigate to server directory
cd server

# Start the server
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api/questions

## 📚 API Documentation

### GET /api/questions
Returns the list of interview questions.

**Response:**
```json
{
  "questions": [
    "Tell me about yourself.",
    "Explain the difference between an array and a linked list.",
    "How would you debug a slow API request?",
    "Write a simple function to reverse a string in your favorite language.",
    "Describe a time you solved a challenging problem.",
    "Why do you want to join as an SDE Intern?"
  ]
}
```

### POST /api/analyze
Analyzes candidate answers and provides detailed feedback.

**Request Body:**
```json
{
  "answers": [
    {
      "question": "Tell me about yourself.",
      "answer": "I am a passionate developer..."
    }
  ]
}
```

**Response:**
```json
{
  "analysis": {
    "scores": {
      "Technical Knowledge": 8.5,
      "Problem Solving": 7.8,
      "Communication": 9.2,
      "Behavior": 8.9
    },
    "feedback": {
      "Technical Knowledge": "Demonstrated solid understanding...",
      "Problem Solving": "Showed good analytical thinking...",
      "Communication": "Clear and articulate responses...",
      "Behavior": "Professional demeanor throughout..."
    },
    "recommendation": "Hire"
  }
}
```

## 📁 Project Structure

```
ai-interviewer-pro/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Interview.tsx      # Main interview interface
│   │   │   ├── FeedbackCard.tsx   # Analysis results display
│   │   │   └── ProcessingScreen.tsx # Loading screen
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Application entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.ts      # Vite configuration
├── server/                 # Backend Node.js application
│   ├── index.js           # Main server file
│   ├── questions.json     # Interview questions
│   └── package.json       # Backend dependencies
└── README.md              # Project documentation
```

## 🔧 Available Scripts

### Frontend Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Backend Scripts
```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests (when implemented)
npm test
```

## 🌍 Environment Variables

### Backend (.env)
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=4000
```

### Getting OpenRouter API Key
1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up for an account
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env` file

## 🎨 UI/UX Flow

1. **Welcome Screen** - Introduction and branding
2. **Terms & Conditions** - Legal agreements and privacy policy
3. **Permissions Page** - Camera and microphone access request
4. **Job Role Setup** - Select interview role and preferences
5. **Interview Interface** - Main interview experience
6. **Processing Screen** - AI analysis with progress indicators
7. **Feedback Report** - Comprehensive results and recommendations

## 🔒 Security & Privacy

- **Data Encryption**: All communication is encrypted using HTTPS
- **Privacy Protection**: Camera and microphone data processed securely
- **GDPR Compliant**: Follows data protection regulations
- **Secure Storage**: Interview data encrypted at rest
- **User Consent**: Clear consent required for data processing

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenRouter** for AI model access
- **React Team** for the amazing framework
- **Vite** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

For support and questions:
- **Email**: support@aiinterviewerpro.com
- **Issues**: [GitHub Issues](https://github.com/your-username/ai-interviewer-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ai-interviewer-pro/discussions)

## 🔄 Updates & Changelog

### Version 1.0.0
- ✅ Initial release
- ✅ Core interview functionality
- ✅ AI analysis integration
- ✅ Real-time speech recognition
- ✅ Comprehensive feedback system

### Upcoming Features
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Interview scheduling system
- [ ] Integration with ATS platforms
- [ ] Mobile app development

---

**Made with ❤️ for the future of technical interviews**

*Transforming the way companies conduct technical interviews with the power of AI.*
