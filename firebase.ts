// This is a simplified, client-side-only Firebase setup.
// In a real-world application, you would secure these keys,
// for example, by using environment variables with a build tool.
declare const firebase: any;

// =================================================================================
// !!! महत्वपूर्ण !!! ¡¡¡IMPORTANTE!!! !!! IMPORTANT !!! !!! هام !!!
// =================================================================================
// The login will NOT work until you replace these placeholder values with your
// OWN Firebase project's configuration.
//
// To get your Firebase config:
// 1. Go to the Firebase Console: https://console.firebase.google.com/
// 2. Create a new project or select an existing one.
// 3. In your project, go to Project Settings (click the gear icon).
// 4. In the "General" tab, scroll down to "Your apps".
// 5. If you don't have a web app, click the "</>" icon to add one.
// 6. Firebase will provide you with a `firebaseConfig` object.
// 7. Copy the values from that object and paste them here.
//
// ALSO, you must enable the authentication methods you want to use:
// 1. In the Firebase Console, go to "Authentication" (in the Build section).
// 2. Go to the "Sign-in method" tab.
// 3. Enable "Email/Password" and "Google" as sign-in providers.
// =================================================================================


// TODO: Replace with your own Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // <-- PASTE YOUR API KEY HERE
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // <-- PASTE YOUR AUTH DOMAIN HERE
  projectId: "YOUR_PROJECT_ID", // <-- PASTE YOUR PROJECT ID HERE
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // <-- PASTE YOUR STORAGE BUCKET HERE
  messagingSenderId: "YOUR_SENDER_ID", // <-- PASTE YOUR MESSAGING SENDER ID HERE
  appId: "YOUR_APP_ID" // <-- PASTE YOUR APP ID HERE
};

// Initialize Firebase
if (!firebase.apps.length) {
    try {
        if (firebaseConfig.apiKey === "YOUR_API_KEY") {
            console.warn("Firebase is not configured. Please add your project credentials to firebase.ts to enable login functionality.");
        }
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.error("Firebase initialization failed. Please check your firebaseConfig in firebase.ts.", e);
    }
}

export const auth = firebase.auth();

// This is necessary to support environments where web storage is not available
// or the app is not running on http/https, which causes the
// 'auth/operation-not-supported-in-this-environment' error.
// While this means the user session is not persisted across page reloads,
// it allows the authentication flow to complete successfully in restricted environments.
auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
    .catch((error: any) => {
        console.error("Firebase: Could not set in-memory persistence.", error);
    });