import { initializeApp } from "firebase/app"; //initializeapp is used to create the firebase app instance below

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"; //getAuth is used to get the auth object from the firebase app instance below
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; //getFirestore is used to create a database. doc give us access to the document in the database. getDoc is used to get the document data and
// setDoc is used to set the document data
const firebaseConfig = {
  apiKey: "AIzaSyDuhp9DPuhnBNFTvYD9N4FgMRNUdWmQVR4",
  authDomain: "react-full-ecommerce-fcfa9.firebaseapp.com",
  projectId: "react-full-ecommerce-fcfa9",
  storageBucket: "react-full-ecommerce-fcfa9.appspot.com",
  messagingSenderId: "520639827444",
  appId: "1:520639827444:web:b82d59204c215ab894bda1",
};

// Initialize Firebase. this variable will used to perform all the CRUD operations
const firebaseApp = initializeApp(firebaseConfig);
// GoogleAuthprovider is actually a class. so we can
// create multiple instances of it
const provider = new GoogleAuthProvider(); // this is the google auth provider class that we will use to sign in with google

provider.setCustomParameters({ prompt: "select_account" }); // this will always trigger the google pop up whenever we use the google auth provider for authentication and sign in

export const auth = getAuth(); // the auth keep track of the authentication state every time the user signs in or signs out. it is especially useful during rediredt sign in

export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // this is the function that we will use to sign in with google using the google auth provider
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider); // this is the function that we will use to sign in with google using the google auth provider

export const db = getFirestore(); // this creates the database

// so this function can be called after the user go through the google sign in process. Then we will try to create a document for the user in the database in a collection called users and the id of the user will be the uid that is returned from the google sign in process
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userRef = doc(db, "users", userAuth.uid); // this is saying to create a document reference object for a user in the users collection with that uid
  console.log(userRef);
  const userSnapShot = await getDoc(userRef); // this is the document data that we will use to check if the document exists in the database. it returns a document snapshot object that has a property called exists that we can use to check if the document exists in the database
  console.log(userSnapShot);
  if (!userSnapShot.exists()) {
    // if the document does not exist in the database then we will create the document in the database
    const { displayName, email } = userAuth; // we will get the displayName and email from the userAuth object that is returned from the google sign in process
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      }); // this will create the document in the database
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

// the onAuthStateChanged firebase function is an open listener, meaning that after we call it
// it will always listen for any changes in the authentication state of the user
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
