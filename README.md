# TechFest Website by NANITES

This is a full-featured, scalable website for a college tech festival, built with Next.js, Firebase, and Genkit. It includes a dynamic landing page, a comprehensive event catalog, a user dashboard, and a complete admin panel for managing all aspects of the site.

## Core Features

### User-Facing Features
- **Dynamic Landing Page**: Animated countdown, event categories, schedule, sponsors, and a live updates feed.
- **Event Catalog**: Browse and discover events. Includes search and filtering by category, type, and day.
- **Event Details**: View complete details for each event, including rules, prizes, and schedule.
- **User Authentication**: Secure user registration and login.
- **User Dashboard**:
  - **My Schedule**: A personalized list of registered events.
  - **QR Code Tickets**: Generate a unique QR code for each event registration for easy check-in.
  - **AI Recommendations**: Get personalized event suggestions based on your interests.
  - **My Certificates**: View and download certificates for completed events.

### Admin-Only Features
- **Secure Admin Panel**: A separate, role-protected interface for site management.
- **Dashboard Analytics**: View key metrics like total users and events.
- **Event Management (CRUD)**: Admins can create, read, update, and delete events through a user-friendly form.
- **User Management**: View a list of all registered users.
- **Live Updates Management**: Post and delete announcements that appear in real-time on the homepage.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **Database & Auth**: [Firebase](https://firebase.google.com/) (Firestore, Authentication)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) (for AI Recommendations)
- **Deployment**: Firebase App Hosting (or any Next.js compatible platform)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- A [Firebase](https://firebase.google.com/) account

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

This project requires a Firebase project to handle authentication and data storage.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** and follow the steps to create a new project.
3.  In your new project, go to **Project Settings** (the gear icon).
4.  In the "Your apps" card, click the **Web icon (`</>`)** to create a new web app.
5.  Give your app a nickname and click **"Register app"**.
6.  You will be shown a `firebaseConfig` object. Copy this object.
7.  In the project root, create a new file named `.env` and paste your Firebase configuration into it. The file is already gitignored.

Your `.env` file should look like this:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"

# Genkit Configuration (Optional)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

8. **Enable Firestore and Authentication**:
    - In the Firebase Console, go to the **Firestore Database** section and create a new database in **Test mode** for now.
    - Go to the **Authentication** section, click "Get started", and enable the **Email/Password** sign-in method.


### 4. Create an Admin User

The application has role-based access control. To create an admin user:

1. Run the application locally (`npm run dev`).
2. Go to the sign-up page (`/auth?form=signup`).
3. Register a new user with the email `admin@gmail.com`.
4. The signup logic in `src/hooks/use-auth.tsx` is hardcoded to assign the `admin` role to this specific email address.

### 5. Run the Development Server

```bash
npm run dev
```

The application should now be running at [http://localhost:9002](http://localhost:9002).

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter to check for code quality issues.
- `npm run genkit:dev`: Starts the Genkit development server for local AI flow testing.
