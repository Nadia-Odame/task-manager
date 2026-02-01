## Table of Contents

- [Problem Statement and Project Idea](README.md#problem-statement-and-project-idea) 
- [Application Features](README.md#application-features)
- [Technology Stack](README.md#technology-stack)
- [How to Run Locally](README.md#how-to-run-locally)
- [Deployment Process](README.md#deployment-process)
- [Web Infrastructure Overview](README.md#web-infrastructure-overview)
- [Design Decisions and Assumptions](README.md#design-decisions-and-assumptions)
- [Security and Privacy](README.md#security-and-privacy)
- [Browser Compatibility](README.md#browser-compatibility)
- [Known Issues and Limitations](README.md#known-issues-and-limitations)
- [Project Structure](README.md#project-structure)
- [Learning Outcomes](README.md#learning-outcomes)
- [Author](README.md#author)
- [License](README.md#license)

# 📋 TaskFlow - Modern Task Management Application
Live Demo: https://nadia-odame.github.io/task-manager/
## Problem Statement and Project Idea
The Challenge
In today's fast-paced world, individuals struggle to organize their daily tasks efficiently. Many existing task management solutions are either too complex for simple needs or lack the intuitive design required for quick adoption. Students, professionals, and anyone managing multiple responsibilities need a straightforward, accessible tool to track their tasks without the overhead of complicated project management systems.
Our Solution
TaskFlow is a lightweight, browser-based task management application designed to help users quickly capture, organize, and complete their daily tasks. Built with fundamental web technologies (HTML, CSS, and JavaScript), TaskFlow provides an elegant, distraction-free interface that works seamlessly across all devices without requiring any backend infrastructure or user authentication.
Target Users
Students managing assignments and study schedules
Professionals tracking daily work tasks
Anyone seeking a simple, no-frills task organizer
Users who prefer privacy-focused, offline-first applications

## Application Features
TaskFlow includes the following core and optional features:
Core Features ✓
Add New Tasks


Simple, distraction-free input interface
Real-time task creation with instant feedback
Keyboard shortcut support (/ to focus input)
Display Task List


Clean, organized list view
Visual distinction between active and completed tasks
Responsive design that adapts to any screen size
Mark Tasks as Completed


One-click task completion toggle
Visual strikethrough and styling changes
Completion timestamp tracking
Delete Tasks


Individual task deletion
Hover-to-reveal delete buttons on desktop
Always-visible buttons on mobile for accessibility
Optional And Advanced Features 
LocalStorage Persistence


Automatic data saving to browser's localStorage
Tasks persist across browser sessions
No server or database required
Task Filtering


Three filter views: All Tasks, Active, Completed
Smooth filtering transitions
Filter state maintained during session
Statistics Dashboard


Real-time task counters
Animated number transitions
Total, Active, and Completed task counts
Bulk Actions


Clear all completed tasks at once
Confirmation via toast notifications
Smart Timestamps


Relative time display (e.g., "2h ago", "Just now")
Automatic time format based on age
Toast Notifications


User-friendly feedback messages
Auto-dismissing notifications
Success and error states
Accessibility Features


ARIA labels for screen readers
Keyboard navigation support
High contrast design elements
Focus indicators for all interactive elements
Responsive Design


Mobile-first approach
Tablet and desktop optimized
Touch-friendly interface

## Technology Stack
Frontend Technologies
HTML5: Semantic markup for structure and accessibility
CSS3: Modern styling with custom properties (CSS variables)
JavaScript (ES6+): Vanilla JavaScript for logic and interactivity
Design System
Typography: Google Fonts (Sora, JetBrains Mono)
Color Palette: Custom gradient-based design tokens
Layout: CSS Flexbox and Grid
Animations: CSS transitions and keyframe animations
Browser APIs Used
DOM API: Dynamic content manipulation
LocalStorage API: Client-side data persistence
Events API: User interaction handling
Development Tools
Code Editor: VS Code (recommended)
Live Server: For local development
Git: Version control
GitHub Pages: Static hosting and deployment

## How to Run Locally
Option 1: Direct File Opening
Download the Repository

1.  git clone https://github.com/Nadia-Odame/task-manager.git
cd taskflow
2. Open in Browser


Simply double-click index.html to open it in your default browser
Or right-click index.html → Open With → Your preferred browser
Option 2: Using Live Server (Recommended)
Install VS Code Extension


Install the "Live Server" extension by Ritwick Dey in VS Code
Launch the Application


Right-click on index.html in VS Code
Select "Open with Live Server"
The application will automatically open at http://localhost:5500
Option 3: Using Python HTTP Server
Navigate to Project Directory

 cd taskflow


Start Server

 # Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000


Access Application


Open browser and navigate to http://localhost:8000

## Deployment Process
Platform: GitHub Pages
We chose GitHub Pages for deployment because it offers:
 Free static hosting
 Automatic HTTPS
 Easy deployment via Git
 Custom domain support
 Excellent uptime and reliability
 CDN distribution for fast global access
Deployment Steps
1. Create GitHub Repository
# Initialize Git repository
git init

# Add files
git add .

# Commit changes
git commit -m "Initial commit: TaskFlow application"

# Add remote repository
git remote add origin https://github.com/Nadia-Odame/task-manager.git

# Push to GitHub
git push -u origin main

2. Configure GitHub Pages
Navigate to repository settings on GitHub
Click on "Pages" in the left sidebar
Under "Source", select branch: main
Select folder: / (root)
Click "Save"
3. Access Live Application
After deployment (usually takes 1-2 minutes):
Your site will be available at: https://nadia-odame.github.io/taskflow
GitHub will provide the exact URL in the Pages settings
Alternative Deployment Options
Netlify (Alternative)
Sign up at netlify.com
Connect GitHub repository
Configure build settings: None needed (static files)
Deploy
Vercel (Alternative)
Sign up at vercel.com
Import GitHub repository
Configure as static site
Deploy

## Web Infrastructure Overview
Understanding How TaskFlow Reaches Users
TaskFlow operates on a fundamental web infrastructure model that demonstrates core concepts of how websites are delivered over the internet.
Infrastructure Diagram
┌─────────────────────────────────────────────────────────────────────┐
│                         USER REQUEST FLOW                           │
└─────────────────────────────────────────────────────────────────────┘

[1] User Types URL
    │
    │  https://nadia-odame.github.io/task-manager/
    │
    ▼
[2] Browser Initiates DNS Lookup
    │
    │  Query: "What's the IP address of github.io?"
    │
    ▼
[3] DNS Server Responds
    │
    │  Response: "185.199.108.153"
    │
    ▼
[4] Browser Sends HTTP Request
    │
    │  GET /task-manager/index.html HTTP/1.1
    │  Host: nadia-odame.github.io
    │
    ▼
[5] GitHub Pages Web Server
    │
    │  • Receives request
    │  • Locates index.html in repository
    │  • Prepares response
    │
    ▼
[6] Server Sends HTML Response
    │
    │  HTTP/1.1 200 OK
    │  Content-Type: text/html
    │  [HTML content]
    │
    ▼
[7] Browser Parses HTML
    │
    │  • Constructs DOM tree
    │  • Discovers linked resources
    │    - style.css
    │    - script.js
    │
    ▼
[8] Browser Requests Additional Resources
    │
    ├─→ GET /task-manager/style.css
    │   └─→ Server responds with CSS
    │
    └─→ GET /task-manager/script.js
        └─→ Server responds with JavaScript
    │
    ▼
[9] Browser Renders Complete Page
    │
    │  • Applies CSS styles
    │  • Executes JavaScript
    │  • Page becomes interactive
    │
    ▼
[10] User Interacts with Application

Detailed Infrastructure Components
1. User & Browser
The user accesses TaskFlow through a web browser (Chrome, Firefox, Safari, Edge, etc.). The browser acts as the client application that:
Interprets and renders HTML
Applies CSS styling
Executes JavaScript code
Manages user interactions
Handles HTTP/HTTPS communications
2. Domain Name System (DNS)
When a user types https://Nadia-Odame.github.io/taskflow/:
Step 1: DNS Query
Browser doesn't initially know the server's IP address
Sends query to DNS resolver (usually provided by ISP)
DNS resolver queries root servers, then TLD servers (.io), then authoritative nameservers
Step 2: DNS Response
DNS returns IP address (e.g., 185.199.108.153)
Browser caches this for future requests
Typical DNS lookup takes 20-120ms
Why DNS Matters:
Humans remember names (github.io), computers use numbers (IP addresses)
DNS provides the translation layer
Enables server infrastructure changes without affecting user access
3. HTTP/HTTPS Protocol
The browser communicates with the server using HTTP (HyperText Transfer Protocol):
Request Structure:
GET /taskflow/index.html HTTP/1.1
Host: yourusername.github.io
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
Accept-Language: en-US,en;q=0.9

Response Structure:
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 4523
Cache-Control: max-age=600
Date: Wed, 30 Jan 2026 12:00:00 GMT

<!DOCTYPE html>
<html>
...

HTTPS Addition:
GitHub Pages automatically provides HTTPS
Encrypts data between browser and server
Prevents eavesdropping and tampering
Verifies server identity via SSL/TLS certificates
4. Web Server (GitHub Pages)
GitHub Pages operates a distributed static file server infrastructure:
Server Responsibilities:
Receives incoming HTTP requests
Locates requested files in the repository
Determines appropriate MIME types (text/html, text/css, application/javascript)
Sends files back to browser
Handles errors (404, 500, etc.)
Manages caching headers
Serves files from CDN edge locations globally
Why GitHub Pages?:
Built on GitHub's robust infrastructure
Global CDN distribution (fast worldwide access)
Automatic SSL/TLS certificates
Version control integration
Zero server management required
5. Static Files (HTML, CSS, JavaScript)
HTML (index.html):
First file loaded
Defines page structure and content
Contains references to CSS and JavaScript
Parsed by browser into Document Object Model (DOM)
CSS (style.css):
Loaded when browser encounters <link rel="stylesheet">
Blocks rendering until loaded (render-blocking resource)
Defines visual presentation
Applied to DOM to create styled Render Tree
JavaScript (script.js):
Loaded when browser encounters <script src="">
Can be async or deferred
Executes in browser's JavaScript engine
Manipulates DOM
Handles user interactions
Manages application state
6. Browser Rendering Process
Step-by-Step Rendering:
HTML Parsing


Browser reads HTML top to bottom
Constructs DOM (Document Object Model) tree
Encounters CSS and JS references
CSS Processing


Downloads and parses CSS
Constructs CSSOM (CSS Object Model)
Combines with DOM to create Render Tree
Layout Calculation


Browser calculates exact position and size of elements
Determines box model properties
Processes Flexbox and Grid layouts
Painting


Browser paints pixels to screen
Applies colors, borders, shadows
Renders text and images
JavaScript Execution


JavaScript engine executes code
Event listeners attached
Initial data loaded from localStorage
Application becomes interactive
Compositing


Browser combines painted layers
Applies transformations and opacity
Final image displayed to user
7. Client-Side Data Persistence (localStorage)
TaskFlow uses the browser's localStorage API:
How It Works:
Data stored in browser's local database
Key-value pairs (strings only)
Persists across browser sessions
Domain-specific (can't be accessed by other sites)
Typically 5-10MB limit per domain
TaskFlow Implementation:
// Save tasks
localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));

// Load tasks
const tasks = JSON.parse(localStorage.getItem('taskflow_tasks'));

Advantages:
No server required
Instant read/write
Works offline
User privacy (data never leaves device)
Limitations:
Device-specific (not synced across devices)
Can be cleared by user
Limited storage capacity

## Design Decisions and Assumptions
Design Philosophy
Minimalist Aesthetic: Clean, distraction-free interface focusing on task completion
Gradient Accents: Subtle purple gradient for visual interest without overwhelming
Micro-interactions: Smooth animations and transitions for delightful UX
Mobile-First: Designed for touch interactions, enhanced for desktop
Technical Decisions
Why Vanilla JavaScript?
Educational Value: Demonstrates fundamental JavaScript concepts
No Dependencies: Eliminates external library overhead
Performance: Lightweight, fast load times
Compatibility: Works in all modern browsers
Learning: Better understanding of core web APIs
Why CSS Variables?
Maintainability: Centralized design tokens
Consistency: Ensures uniform styling
Theming: Easy to implement dark mode or alternative themes
Performance: Better than preprocessor variables (dynamic)
Why localStorage?
Simplicity: No backend complexity
Privacy: Data never leaves user's device
Speed: Instant read/write operations
Offline-First: Works without internet connection
Assumptions
Target Browsers: Modern browsers with ES6+ support (Chrome, Firefox, Safari, Edge)
JavaScript Enabled: Application requires JavaScript (no progressive enhancement)
localStorage Available: Browser must support Web Storage API
Single User: Designed for individual use (no collaboration features)
Device Storage: Assumes user has adequate localStorage quota
Network: Initial load requires internet; subsequent use is offline-capable
Future Enhancements (Out of Scope)
Task categories and tags
Due dates and reminders
Cloud synchronization
Multi-device support
Task sharing and collaboration
Task priority levels
Recurring tasks
Search and advanced filtering
Data export (JSON, CSV)
Dark mode theme toggle

## Security and Privacy
Data Privacy
Local-Only Storage: All task data stored locally in browser
No Tracking: No analytics or user tracking
No Account Required: No personal information collected
Open Source: Code is transparent and auditable
Security Practices
HTTPS Only: All traffic encrypted via GitHub Pages
No XSS Vulnerabilities: Proper DOM manipulation (textContent vs innerHTML)
Input Sanitization: User input properly handled
No External Scripts: All code self-contained (except Google Fonts)

## Browser Compatibility
TaskFlow is tested and supported on:
 Chrome 90+ (Desktop & Mobile)
 Firefox 88+ (Desktop & Mobile)
 Safari 14+ (Desktop & Mobile)
 Edge 90+ (Desktop)
 Opera 76+
Required Features:
ES6+ JavaScript support
localStorage API
CSS Grid and Flexbox
CSS Custom Properties

## Known Issues and Limitations
No Data Sync: Tasks are device-specific
Storage Limit: localStorage has 5-10MB limit
No Backup: Data loss if localStorage is cleared
Single Browser: Tasks don't transfer between browsers
No Search: Large task lists may be hard to navigate

## Project Structure
task-manager/
├── index.html          # Main HTML file (structure)
├── style.css           # Stylesheet (presentation)
├── script.js           # JavaScript logic (behavior)
└── README.md           # Documentation

Code Organization
HTML: Semantic, accessible markup with ARIA labels
CSS: Modular sections with clear comments
JavaScript: Well-documented functions with JSDoc comments

## Learning Outcomes
This project demonstrates understanding of:
Web Fundamentals


HTML structure and semantics
CSS styling and layout
JavaScript programming
Web Infrastructure


Client-server architecture
HTTP/HTTPS protocols
DNS resolution
Static file hosting
Browser APIs


DOM manipulation
Event handling
localStorage
Responsive design
Development Workflow


Version control with Git
Static deployment
Code organization
Documentation

## Author
Web Infrastructure Summative Project
 University Assignment - 2026

## License
This project is developed for educational purposes as part of a university summative assessment on Web Infrastructure.

## Acknowledgments
Google Fonts for typography (Sora, JetBrains Mono)
GitHub Pages for reliable static hosting
MDN Web Docs for excellent web development resources

## Support & Feedback
For issues, questions, or suggestions:
Create an Issue: GitHub Issues
Pull Requests: Contributions welcome

Built with ❤️ using HTML, CSS, and JavaScript
Last Updated: January 2026

