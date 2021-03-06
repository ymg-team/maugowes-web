// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWyXJo4uwbFqiAQyl5nFexPJsH7lNFdM4",
  authDomain: "mau-gowes.firebaseapp.com",
  databaseURL: "https://mau-gowes.firebaseio.com",
  projectId: "mau-gowes",
  storageBucket: "mau-gowes.appspot.com",
  messagingSenderId: "855430015568",
  appId: "1:855430015568:web:364b11b34f3b37ccbfff55",
  measurementId: "G-48FQVWQYV3",
}

export function firebaseInit() {
  if (typeof window == "undefined" && typeof window.firebase == "undefined") {
    return console.error("Firebase not available")
  } else {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    if (firebase.analytics) {
      firebase.analytics()
    }
  }
}
