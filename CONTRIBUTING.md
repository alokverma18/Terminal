# Contributing to ScriptFolio

Thank you for your interest in contributing to **ScriptFolio: Terminal Portfolio Generator**! We welcome contributions from everyone and appreciate your help in making this project better.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Development Workflow](#development-workflow)
5. [Coding Guidelines](#coding-guidelines)
6. [Submitting Changes](#submitting-changes)
7. [Reporting Issues](#reporting-issues)
8. [Feature Requests](#feature-requests)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Be kind, considerate, and constructive in your interactions.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Git**
- A code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Terminal.git
   cd Terminal
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/alokverma18/Terminal.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm start
   ```

6. Visit `http://localhost:4200/` to see the application running

For a detailed understanding of the project structure and architecture, refer to our [LEARN.md](LEARN.md) guide.

## How to Contribute

There are many ways to contribute to ScriptFolio:

- **Fix bugs**: Look for issues labeled `bug`
- **Add features**: Implement new functionality or enhancements
- **Improve documentation**: Help us improve our guides and docs
- **Write tests**: Increase code coverage and reliability
- **Review pull requests**: Provide feedback on open PRs
- **Report issues**: Let us know about bugs or problems you encounter

## Development Workflow

### 1. Create a Branch

Create a descriptive branch name for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style and conventions
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

Before submitting, ensure your changes work correctly:

```bash
# Run the development server
npm start

# Run tests (if applicable)
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

Manually test your changes:
- Fill out the form with test data
- Navigate through all pages
- Test affected commands in the terminal preview
- Verify export functionality works
- Check for console errors

### 4. Commit Your Changes

Write clear, concise commit messages:

```bash
git add .
git commit -m "Add feature: brief description of what you did"
```

**Good commit message examples:**
- `Add dark mode toggle to preview component`
- `Fix validation error in education form field`
- `Update README with new installation instructions`
- `Refactor portfolio service for better performance`

### 5. Keep Your Fork Updated

Before submitting your changes, sync with the main repository:

```bash
git fetch upstream
git rebase upstream/main
```

### 6. Push to Your Fork

```bash
git push origin your-branch-name
```

## Coding Guidelines

### TypeScript/Angular

- Use **TypeScript** strict mode features
- Follow **Angular** best practices and style guide
- Use **standalone components** (Angular 17+)
- Implement proper **type definitions**
- Use **reactive forms** for form handling
- Utilize **Angular services** for shared logic

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for TypeScript/JavaScript
- **Semicolons**: Use semicolons
- **Naming conventions**:
  - Components: PascalCase (`FormComponent`)
  - Files: kebab-case (`form.component.ts`)
  - Variables/Functions: camelCase (`getUserData`)
  - Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`)

### Component Structure

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  // Public properties first
  
  // Constructor
  
  // Lifecycle hooks
  
  // Public methods
  
  // Private methods
}
```

### Comments

- Add comments for complex logic or non-obvious code
- Use JSDoc comments for public methods and classes
- Keep comments up-to-date with code changes

## Submitting Changes

### Pull Request Process

1. **Open a Pull Request** from your fork to the `main` branch of the original repository

2. **Provide a clear description** including:
   - What changes you made
   - Why you made them
   - Any related issue numbers (e.g., "Fixes #123")
   - Screenshots (if UI changes)

3. **PR Title Format**:
   - `Feature: Add dark mode support`
   - `Fix: Correct email validation in contact form`
   - `Docs: Update installation instructions`
   - `Refactor: Improve portfolio service structure`

4. **Wait for review**: Maintainers will review your PR and may request changes

5. **Make requested changes** if any, and push them to your branch

6. **PR Approval**: Once approved, a maintainer will merge your PR

### Pull Request Checklist

Before submitting, ensure:

- [ ] Code follows the project's coding guidelines
- [ ] Changes have been tested locally
- [ ] No console errors or warnings
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up-to-date with main
- [ ] PR description is clear and complete

## Reporting Issues

Found a bug or problem? Please open an issue!

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Try the latest version** to see if it's already fixed
3. **Check the documentation** ([README.md](README.md), [LEARN.md](LEARN.md))

### Creating a Good Issue

Include the following information:

**For Bugs:**
- Clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots or error messages
- Environment details (browser, OS, Node version)

**Example:**
```
Title: Export function fails with large project arrays

Steps to reproduce:
1. Add 10+ projects in the form
2. Navigate to preview
3. Run 'export' command

Expected: ZIP file downloads successfully
Actual: Browser console shows error "Quota exceeded"

Browser: Chrome 120
OS: Windows 11
```

## Feature Requests

Have an idea for a new feature? We'd love to hear it!

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Open a new issue** with the `enhancement` label
3. **Describe the feature**:
   - What problem does it solve?
   - How would it work?
   - Why would it benefit users?
   - Any implementation ideas?

### Feature Request Template

```
**Feature Description:**
[Clear description of the feature]

**Problem it Solves:**
[What user problem does this address?]

**Proposed Solution:**
[How you envision it working]

**Alternatives Considered:**
[Other approaches you thought about]

**Additional Context:**
[Screenshots, mockups, examples, etc.]
```

## Questions?

If you have questions about contributing:

- Review the [LEARN.md](LEARN.md) guide for project architecture details
- Check the [README.md](README.md) for general information
- Open an issue with the `question` label
- Reach out to the maintainers

---

## Recognition

All contributors will be recognized! Your contributions, big or small, are valued and appreciated.

Thank you for contributing to ScriptFolio! 🚀

---

**Happy Contributing!**

*By contributing to this project, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).*
