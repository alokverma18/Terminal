 # Terminal Portfolio Generator

A modern Angular application that allows users to create interactive terminal-style portfolios with a sleek command-line interface. Users can input their resume data through an intuitive form and preview it as a working terminal that responds to commands like `about`, `skills`, `projects`, `education`, `experience`, and `contact`.

*This project was developed with the assistance of AI to accelerate development and ensure best practices.*

## 🚀 Features

### ✨ Interactive Form Builder
- **Dynamic Form Sections**: Add multiple education entries, work experiences, and projects
- **Tag Input System**: Smart tag inputs for skills and project tools with comma/enter key support
- **Real-time Validation**: Form validation with visual feedback
- **Auto-save**: Form data persists in localStorage for seamless editing

### 🖥️ Terminal Preview
- **Authentic Terminal UI**: MacOS-style terminal window with realistic colors and styling
- **Draggable Interface**: Click and drag the terminal window around the screen
- **Command Autocomplete**: Tab completion for available commands
- **Command History**: Navigate previous commands using up/down arrow keys
- **Responsive Commands**: Support for `about`, `skills`, `projects`, `education`, `experience`, `contact`, `help`, `clear`, and `export`

### 📦 Export Functionality
- **Static Site Generation**: Export your terminal portfolio as a standalone HTML/CSS/JS package
- **Self-contained**: Exported portfolio works without any dependencies
- **Same Functionality**: Exported version maintains all terminal features and styling
- **Easy Deployment**: Ready to deploy on any static hosting service

### 🎨 Modern UI/UX
- **Consistent Design**: Terminal theme throughout all components
- **Responsive Layout**: Works on different screen sizes
- **Smooth Animations**: Polished user interactions
- **Custom Scrollbars**: Styled scrollbars that match the terminal aesthetic

## 🛠️ Tech Stack

- **Frontend Framework**: Angular 17.3.7
- **Language**: TypeScript
- **Styling**: CSS3 with custom terminal theme
- **Build Tool**: Angular CLI
- **Package Management**: npm
- **Export Libraries**: JSZip, FileSaver.js
- **Font**: Fira Mono (terminal-style monospace font)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.x or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (optional, for development)

```bash
# Install Angular CLI globally (optional)
npm install -g @angular/cli
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Terminal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Development Server
```bash
ng serve
# or
npm start
```
Navigate to `http://localhost:4200/` - the application will automatically reload when you make changes.

### 4. Build for Production
```bash
ng build
```
Build artifacts will be stored in the `dist/` directory.

## 📖 How to Use

### Step 1: Fill Your Information
1. Navigate to the home page and click **"Get Started"**
2. Fill out the form with your personal information:
   - **Contact**: Name, email, phone, LinkedIn, GitHub
   - **About**: Career objective or personal summary
   - **Education**: Add multiple degrees/certifications
   - **Experience**: Add work experiences with details
   - **Projects**: Add projects with tools and links
   - **Skills**: Add languages, frameworks, and tools as tags

### Step 2: Preview Your Terminal
1. Click **"Preview"** to see your interactive terminal
2. Try these commands:
   - `help` - See all available commands
   - `about` - View your personal summary
   - `skills` - See your technical skills
   - `projects` - Browse your projects
   - `education` - View your educational background
   - `experience` - See your work history
   - `contact` - Get your contact information
   - `clear` - Clear the terminal screen
   - `export` - Download your portfolio

### Step 3: Export Your Portfolio
1. In the terminal preview, type `export` or click the export button
2. A ZIP file will be downloaded containing:
   - `index.html` - Main portfolio page
   - `styles.css` - Terminal styling
   - `app.js` - Interactive terminal functionality
3. Extract and deploy these files to any web hosting service

## 🎯 Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Display all available commands |
| `about` | Show personal summary/bio |
| `skills` | List technical skills by category |
| `projects` | Display projects with details |
| `education` | Show educational background |
| `experience` | List work experience |
| `contact` | Display contact information |
| `clear` | Clear terminal screen |
| `export` | Download portfolio as ZIP |
| `name` | Display your name |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/              # Landing page
│   │   ├── form/              # Resume input form
│   │   ├── preview/           # Terminal preview
│   │   └── tag-input/         # Reusable tag input component
│   ├── services/
│   │   ├── portfolio.service.ts    # Data management
│   │   └── export.service.ts       # Export functionality
│   └── assets/
│       └── terminal/          # Static terminal template
│           ├── index.html
│           ├── styles.css
│           └── app.js
```

## 🔧 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run unit tests
npm test

# Run linting
npm run lint

# Generate new component
ng generate component component-name
```

## 🌟 Features in Detail

### Smart Tag Input
- Type skills or tools and press Enter or comma to create tags
- Click the × on any tag to remove it
- Automatically handles duplicates
- Syncs with form data in real-time

### Terminal Authenticity
- MacOS-style window controls (red, yellow, green dots)
- Proper terminal color scheme and fonts
- Command history with arrow key navigation
- Tab completion for commands
- Realistic terminal behavior and responses

### Export System
- Generates completely self-contained static sites
- No external dependencies required
- Maintains all interactive functionality
- Ready for deployment on GitHub Pages, Netlify, Vercel, etc.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Angular Team** - For the excellent framework
- **AI Assistant** - For development guidance and best practices
- **Open Source Community** - For the libraries and tools used
- **Terminal Emulator Design** - Inspired by macOS Terminal and iTerm2

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues on the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

**Built with ❤️ using Angular and AI assistance**
