🍳 Recipe Generator

A modern React application that utilizes AI to generate personalized food and dessert recipes based on your available ingredients, preferences, and dietary requirements. ✨

📋 Overview

Recipe Generator is a full-stack web application that revolutionizes the way you approach cooking by providing customized recipes. Simply enter your available ingredients, cuisine preferences, time constraints, and cooking skill level, and let our AI create the perfect recipe for you! 🚀

✨ Features

- 🤖 AI-Powered Recipe Creation**: Generate unique, personalized recipes based on your inputs
- 🔐 User Authentication**: Secure login and registration with email/password or Google Sign-In
- 💾 Saved Recipes**: Save your favorite generated recipes to access them later
- 🍰 Dessert Generator**: Specialized tool for creating delightful dessert recipes
- 📄 Recipe PDF Export**: Download your recipes as PDF files
- 📱 Responsive Design**: Fully mobile-responsive interface
- ⚡ Real-time Recipe Generation**: View recipes as they're being created through server-sent events

🛠️ Tech Stack

🖥️ Frontend
- React (v18)
- React Router (v7)
- Tailwind CSS
- Firebase Authentication
- Firestore Database
- jsPDF (for PDF generation)

 ⚙️ Backend
- Node.js
- Express.js
- OpenAI API (GPT-4)
- Server-Sent Events (for real-time updates)

📥 Installation

📋 Prerequisites
- Node.js (v16+)
- npm or yarn
- Firebase account (for authentication and database)
- OpenAI API key

🔧 Setup Instructions

1. Clone the repository** 📂
   ```
   git clone https://github.com/yourusername/recipe-generator.git
   cd recipe-generator
   ```

2. Install dependencies** 📦
   ```
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables** 🔐
   
   Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development servers** 🚀
   ```
   # Start the client
   cd client
   npm start

   # In another terminal, start the server
   cd server
   node server.js
   ```

5. Access the application** 🌐
   
   Open your browser and navigate to `http://localhost:3000`

📁 Application Structure

```
recipe-generator/
├── client/                   # Frontend React application
│   ├── public/               # Public assets
│   └── src/
│       ├── assets/           # Images and other static assets
│       ├── components/       # React components
│       ├── context/          # Context API providers
│       ├── App.js            # Main application component
│       └── index.js          # Application entry point
└── server/                   # Backend Node.js application
    └── server.js             # Express server with OpenAI integration
```

🧩 Key Components

- AuthContext: Manages user authentication state
- RecipeContext: Handles saving and retrieving recipes
- Dashboard: Main recipe generation interface
- Dessert: Specialized dessert recipe generator
- Saved: View and manage saved recipes
- Login: User authentication interface

Deployment

Client Deployment
The React frontend can be deployed to services like Netlify, Vercel, or Firebase Hosting:

```
cd client
npm run build
```
Server Deployment
The Node.js backend can be deployed to services like Heroku, Render, or Railway:

```
cd server
npm start
```

Future Enhancements

- Recipe sharing functionality
- Grocery list generation

Contributors
- Shubham Shah (https://github.com/shubhamshah441)
- Vanzel Dsilva (https://github.com/vanzel27)

License

This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments

- OpenAI for providing the GPT models
- Firebase for authentication and database services
- All contributors and testers who helped improve this application
