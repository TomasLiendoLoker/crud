import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDMFoZ9E5pn7cLaxZ8TMfLF51fi9rQbNAU",
    authDomain: "crud-41e42.firebaseapp.com",
    projectId: "crud-41e42",
    storageBucket: "crud-41e42.appspot.com",
    messagingSenderId: "571400181614",
    appId: "1:571400181614:web:e6aa9ba8dcf2485688d37f"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig)