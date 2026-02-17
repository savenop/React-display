🎓 KIET CS Department Digital Display SystemA modern, interactive digital signage application built for the Computer Science Department at KIET University. This application is designed to run on large kiosk screens or hallway displays, cycling through department news, student achievements, and upcoming events with high-fidelity animations.(Replace with an actual screenshot of your application)✨ Key Features🚀 Inauguration Mode (Ceremonial Launch)Smart Pre-fetching: The system sits in a "Waiting" state until all API data (News, Awards, Events) is successfully fetched.Interactive Launch: Features a "Inaugurate Display" button that is only enabled when the system is healthy.Visual Effects: Triggers a canvas-confetti celebration animation upon launch before transitioning to the main content.Graceful Error Handling: If APIs fail (e.g., 503 Service Unavailable), the launch button turns into a "Retry" mechanism, preventing the audience from seeing broken data.📺 Automated Slideshow EngineThe application cycles through four main modules continuously:News: Latest department updates with visual context or generated gradients.Wall of Fame (Awards): Highlights student achievements (1st, 2nd, 3rd place) with dynamic color themes (Gold, Silver, Bronze styling).Events: Displays posters and videos of recent or upcoming events.Opportunities (Opor): (Placeholder for internship/job opportunities).🛠 Technical HighlightsGlobal State Persistence: Intelligent caching in Event.jsx and Award.jsx ensures that the slideshow remembers which slide it was on when it cycles back, rather than resetting to the first slide every time.Resilient Media Loading: Automatic fallbacks for broken image links, converting Google Drive view links to direct image sources, and fallback gradients if images fail to load.Keyboard Control:N or ArrowRight: Next Slide.P or ArrowLeft: Previous Slide.🏗 Tech StackThis project is built using the MERN stack ecosystem (frontend focused) with modern tooling.Core FrameworkReact.js (v18+): The library for web and native user interfaces.Vite: Next Generation Frontend Tooling (Recommended for fast HMR and building).Styling & UITailwind CSS: A utility-first CSS framework for rapid UI development. Used for responsiveness, gradients, and layout.Framer Motion: A production-ready motion library for React. Used for:Slide transitions.The complex animated background SVG.Loading spinners and button interactions.AnimatePresence for handling component unmounting animations.Data & NetworkingAxios: Promise-based HTTP client for the browser. Used for fetching data from the backend endpoints (/kietdata/...).Implementation Note: Uses Promise.allSettled to ensure the app loads even if one specific API endpoint fails.Special EffectsCanvas Confetti: Used to generate the "Party Popper" effect during the inauguration sequence.📦 DependenciesTo run this project, you will need the following dependencies installed. You can view these in your package.json.JSON"dependencies": {
  "axios": "^1.6.0",
  "canvas-confetti": "^1.9.0",
  "framer-motion": "^10.16.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
},
"devDependencies": {
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "tailwindcss": "^3.3.0",
  "vite": "^5.0.0"
}
⚙️ Installation & SetupClone the RepositoryBashgit clone https://github.com/your-username/kiet-display-system.git
cd kiet-display-system
Install DependenciesBashnpm install
# or
yarn install
Configure Proxy (Important)Since the code fetches from /kietdata, ensure your vite.config.js is set up to proxy these requests to your backend server (assuming backend runs on port 3000).JavaScript// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/kietdata': {
        target: 'http://localhost:3000', // Your backend URL
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
Run Development ServerBashnpm run dev
🔌 API Endpoints ReferenceThe application expects the following endpoints to be available on the backend:MethodEndpointDescriptionGET/kietdata/newsFetches list of latest news.GET/kietdata/filter?year=1Fetches student achievements (Awards/Wall of Fame).GET/kietdata/ledFetches event posters and video clips.📂 Project StructureBashsrc/
├── components/
│   ├── Award.jsx       # Wall of Fame slider with gold/silver/bronze logic
│   ├── Event.jsx       # Event poster/video display with memory persistence
│   ├── News.jsx        # News display with auto-generated gradients
│   ├── Opor.jsx        # Opportunities component
│   └── ...
├── App.jsx             # Main Controller (Inauguration logic, Data Fetching, Slideshow state)
├── index.css           # Tailwind directives
└── main.jsx            # Entry point
🐛 Troubleshooting"Service Unavailable (503)" on Launch:This means the React app cannot reach the Backend.Fix: Ensure your backend server is running. If you are in development, check your vite.config.js proxy settings. The "Inaugurate" button will allow you to retry without refreshing the page.Images not loading:The system is designed to handle Google Drive links. Ensure the links in your database are accessible (public) or use the helper function getDriveImage logic included in the components.🤝 ContributingFork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request📜 LicenseDistributed under the MIT License. See LICENSE for more information.Developed for KIET Group of Institutions.
