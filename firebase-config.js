/* firebase-config.js
   Firebase project config for Roll a Hero (project: "roll-a-hero", Spark / free plan).

   SAFE TO BE PUBLIC: these Firebase web-app values are identifiers, not secrets.
   They are *meant* to live in client-side code. Real protection comes from the
   Firestore security rules (see firestore.rules). Do NOT treat apiKey as a password.

   Exposed as a plain global to match the app's no-build, <script>-tag style
   (like icons.js / data.js). firebase-sync.js reads window.FIREBASE_CONFIG.
   We deliberately do NOT use Firebase Analytics. */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAEQPCUgUiSiKK1sC4b0t1Tal-WBnml76U",
  authDomain: "roll-a-hero.firebaseapp.com",
  projectId: "roll-a-hero",
  storageBucket: "roll-a-hero.firebasestorage.app",
  messagingSenderId: "971316198956",
  appId: "1:971316198956:web:fb8282c97c11cf1c98db89",
  measurementId: "G-PHBPHM43SY"
};
