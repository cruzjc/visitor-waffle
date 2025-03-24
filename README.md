# Visitor Waffle Chart

A GitHub-style waffle chart that displays website visitor counts instead of commit history. Each cell represents a day, and the color intensity indicates the number of visitors for that day.

## Features

- Real-time visitor tracking
- GitHub-style contribution graph visualization
- Responsive design
- Hover effects with detailed visit information
- Firebase integration for data storage

## Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Enable Realtime Database in your Firebase project

3. Set up database rules in Firebase:
   ```json
   {
     "rules": {
       "visits": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```

4. Get your Firebase configuration:
   - Go to Project Settings
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Register your app
   - Copy the firebaseConfig object

5. Replace the Firebase configuration in `script.js` with your own:
   ```javascript
   const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-auth-domain",
       databaseURL: "your-database-url",
       projectId: "your-project-id",
       storageBucket: "your-storage-bucket",
       messagingSenderId: "your-messaging-sender-id",
       appId: "your-app-id"
   };
   ```

## Deployment to GitHub Pages

1. Create a new repository on GitHub

2. Initialize git in your local project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Connect to your GitHub repository:
   ```bash
   git remote add origin https://github.com/username/repository-name.git
   git branch -M main
   git push -u origin main
   ```

4. Go to your repository settings on GitHub:
   - Navigate to "Pages"
   - Select "main" branch as source
   - Click "Save"

5. Your site will be available at `https://username.github.io/repository-name`

## Local Development

To test locally, you can use any static file server. For example:

1. Using Python:
   ```bash
   python -m http.server 8000
   ```

2. Using Node.js (with `http-server`):
   ```bash
   npx http-server
   ```

Then visit `http://localhost:8000` in your browser.

## License

MIT 