# TechFest Website by NANITES

This is a full-featured, scalable website for a college tech festival, built with Next.js, Firebase, and Genkit. It includes a dynamic landing page, a comprehensive event catalog, a user dashboard with AI-powered coaching, and a complete admin panel for managing all aspects of the site.

## Core Features

### User-Facing Features
- **Dynamic Landing Page**: Engaging hero section with a live countdown timer, event categories, schedule, sponsors, and a real-time announcements feed.
- **Event Catalog**: Browse, search, and filter events by category, type, and day.
- **Event Details**: View complete details for each event, including rules, prizes, and schedule.
- **Secure User Authentication**: Robust user registration with mandatory email verification and password reset functionality.
- **Personalized User Dashboard**:
  - **My Profile**: Users can update their personal and academic details.
  - **My Schedule**: A personalized list of all registered events.
  - **QR Code Tickets**: Generate a unique QR code for each event registration for seamless check-in.
  - **AI Event Coach**: Get personalized strategies, creative ideas, and learning resources for registered events.
  - **Dashboard Analytics**: Visualize fest-wide statistics and user engagement trends.

### Admin-Only Features
- **Secure Admin Panel**: A separate, role-protected interface for site management.
- **Dashboard Analytics**: View key metrics like total users, events, and registrations.
- **Event Management**: Admins can view and delete events.
- **User Management**: View a list of all registered users and their roles.
- **Live Updates Management**: Post and delete announcements that appear in real-time on the homepage.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **Database & Auth**: [Firebase](https://firebase.google.com/) (Firestore, Authentication)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) (for AI Event Coach)
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
6.  You will be shown a `firebaseConfig` object. Copy the values from this object.
7.  In the project root, create a file named `.env` by copying the example from `.env.example` (if it exists) or creating a new one. Open it and add the keys you just copied from the Firebase console. The file is already gitignored.

Your `.env` file should look like this (with your actual credentials):

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"

# Genkit Configuration (Optional for AI features)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

8. **Enable Firestore and Authentication**:
    - In the Firebase Console, go to the **Firestore Database** section and create a new database in **Test mode** for now.
    - Go to the **Authentication** section, click "Get started", and enable the **Email/Password** sign-in method.
    - (Optional but Recommended) Go to the **Templates** tab in Authentication to customize the sender name for verification and password reset emails.

### 4. Create an Admin User

The application has role-based access control. For development, specific email addresses are automatically assigned the `admin` role upon registration.

1. Run the application locally (`npm run dev`).
2. Go to the sign-up page (`/auth?form=signup`).
3. Register new users with the emails `admin@gmail.com` and `sadmisn@gmail.com`.
4. The signup logic in `src/hooks/use-auth.tsx` is hardcoded to assign the `admin` role to these specific email addresses. Remember to verify the emails before logging in.

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
