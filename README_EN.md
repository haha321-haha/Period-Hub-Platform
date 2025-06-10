# Period Hub Platform 🌸

A comprehensive, bilingual (Chinese-English) menstrual health platform providing evidence-based pain relief solutions, interactive tools, and educational resources.

## 🌟 Features

### 🔧 Interactive Health Tools
- **Pain Assessment Tool**: Comprehensive menstrual pain evaluation
- **Constitution Test**: Traditional Chinese Medicine body type assessment
- **Pain Tracker**: Daily symptom monitoring and tracking
- **Symptom Assessment**: Detailed health evaluation system

### 📚 Educational Content
- **Natural Therapies**: Comprehensive guide to non-pharmaceutical treatments
- **Health Articles**: Evidence-based medical information
- **Teen Health Zone**: Age-appropriate guidance for adolescents
- **Scenario Solutions**: Practical advice for daily situations

### 🌍 Bilingual Support
- Complete Chinese-English translation system
- Language-specific content and resources
- Cultural sensitivity in health guidance
- Localized PDF resources

### 📱 Mobile-First Design
- Responsive design optimized for mobile devices
- Progressive Web App (PWA) capabilities
- Offline functionality for core features
- Touch-friendly interactive elements

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/haha321-haha/Period-Hub-Platform.git
   cd Period-Hub-Platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **State Management**: Zustand
- **PDF Generation**: Puppeteer
- **Testing**: Jest + React Testing Library

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── content/              # Markdown content files
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── messages/             # Translation files
├── public/               # Static assets
│   ├── downloads/        # PDF resources
│   └── images/           # Image assets
└── types/                # TypeScript type definitions
```

## 🌐 Internationalization

The platform supports Chinese (zh) and English (en) with:
- Dynamic language switching
- Localized content and UI
- Language-specific PDF resources
- Cultural adaptation of health guidance

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run check:translations` - Validate translation files

## 🔒 Security Features

- Content Security Policy (CSP) headers
- XSS protection
- CSRF protection
- Secure PDF generation
- Input validation and sanitization

## 📱 PWA Features

- Offline functionality
- App-like experience
- Push notifications (planned)
- Background sync (planned)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: @haha321-haha
- **Project URL**: https://github.com/haha321-haha/Period-Hub-Platform

## 🆘 Support

For support, please:
1. Check the [documentation](docs/)
2. Search existing [issues](https://github.com/haha321-haha/Period-Hub-Platform/issues)
3. Create a new issue if needed

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added natural therapies section
- **v1.2.0** - Enhanced bilingual support
- **v1.3.0** - Mobile optimization and PWA features

## 🎯 Roadmap

- [ ] Advanced analytics dashboard
- [ ] User account system
- [ ] Community features
- [ ] AI-powered recommendations
- [ ] Telemedicine integration

---

**Period Hub Platform** - Empowering menstrual health through technology and education 🌸
