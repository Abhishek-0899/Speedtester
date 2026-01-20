Speedtester 🖊️⚡




Speedtester is an interactive typing speed testing web app built with Next.js and React. It measures typing speed (WPM) and accuracy in real-time and offers optional charts for performance tracking. The app can be enhanced with AI-generated text challenges to make practice more dynamic.

🚀 Features

Real-time WPM and accuracy updates

AI-generated text for varied typing challenges

Clean, responsive UI for desktop and mobile

Instant test start with multiple paragraphs to practice

Optional charts to visualize progress (using Recharts)

Timer to track typing duration

Fast performance, optimized for modern browsers

Deployed on Vercel for easy remote access

🏛️ Project Architecture
Speedtester/

├─ app/                 # Main Next.js pages and components

│  ├─ components/       # Reusable components (Timer, WPMDisplay, Navbar, etc.)

│  ├─ pages/            # Next.js pages (Home, TestPage, etc.)

├─ recharts/            # Chart components for performance visualization

├─ public/              # Static assets (images, icons)

├─ styles/              # Global and component-level styles

├─ next.config.ts       # Next.js configuration

├─ package.json         # Project dependencies and scripts

├─ README.md            # Documentation


Flow Overview:

Home Page / Dashboard → Shows start button, instructions, and optional past performance stats.

Typing Test Component → Displays text to type, starts timer, captures user input.

Performance Calculations → Updates WPM and accuracy live.

Charts / Progress Tracking → Optional visualization of typing statistics.

Deployment → Hosted on Vercel for easy remote access.

💻 Installation (Local & Remote)
Local Setup

Clone the repository:

git clone https://github.com/Abhishek-0899/Speedtester.git
cd Speedtester


Install dependencies:

npm install


Start development server:

npm run dev


Open in browser:

http://localhost:3000

Remote Access

To share your local dev server externally, you can use ngrok:

ngrok http 3000


This gives a public URL for collaborators to access your running app.

For production/testing, Vercel Preview Deployments automatically provide live URLs for each branch/pull request.

🎯 Usage

Open the app (locally or via Vercel/ngrok).

Click Start Test.

Type the displayed text (AI-generated text if enabled).

Monitor WPM and Accuracy in real time.

Complete the test and try again to improve your score.

🤝 Contribution Guidelines

Fork the repository on GitHub.

Clone your fork and create a feature branch:

git checkout -b feature/<feature-name>


Make your changes, commit with descriptive messages:

git commit -m "Add new typing challenge feature"


Push your branch to your fork:

git push origin feature/<feature-name>


Open a Pull Request to the main repository.

Best Practices:

Follow modular architecture; keep components reusable.

Document any new AI text features or charts.

Test all changes locally or on Vercel preview URLs before PR.

📦 Tech Stack

Framework: Next.js & React

Styling: CSS / Tailwind (optional)

Charts: Recharts (optional)

Deployment: Vercel

📌 Possible Enhancements

🌐 AI-generated custom text challenges

📊 Performance history and saved stats

🎨 Themes / dark mode

👤 User login & profiles

📈 Advanced charts and analytics
