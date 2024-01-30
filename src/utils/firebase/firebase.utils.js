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

//getFirestore is used to create a database. doc give us access to the document in the database. getDoc is used to get the document data and
// setDoc is used to set the document data
// The 'collection' method from Firestore is used to get a reference to a collection in the database.
// This method takes in a string argument which is the path to the desired collection.

// The 'writeBatch' method from Firestore is used to perform multiple write operations as a single batch.
// It can be used to set, update, or delete multiple documents in a single operation, which helps to ensure atomicity.
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  DocumentSnapshot,
} from "firebase/firestore";

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
console.log("auth", auth);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // this is the function that we will use to sign in with google using the google auth provider
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider); // this is the function that we will use to sign in with google using the google auth provider

export const db = getFirestore(); // this creates the database

// so this function can be called after the user go through the google sign in process. Then we will try to create a document for the user in the database in a collection called users and the id of the user will be the uid that is returned from the google sign in process

// This function, addCollectionAndDocuments, is an asynchronous function that takes in two arguments:
// 1. collectionKey: a string that represents the name of the collection in the Firestore database.
// 2. objectsToAdd: an array of objects that need to be added to the collection in the Firestore database.
//
// The function first gets a reference to the collection in the Firestore database using the 'collection' method.
// Then, it creates a new write batch using the 'writeBatch' method.
//
// The function then iterates over the 'objectsToAdd' array. For each object, it:
// - Creates a new document reference in the collection. The ID of the document is the lowercased title of the object.
// - Adds a set operation to the write batch, which will set the data of the document to the object.
//
// Note: The function currently does not commit the write batch, so the changes will not be applied to the Firestore database.
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db); // creates a batch objects that we will use to batch all the set operations that we will perform on the documents in the database

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit(); // this will actually start the batch process
  console.log("done with batch");
};

export const getCategoriesAndDocuments = async () => {
  // Get a reference to the 'categories' collection in the Firestore database
  const collectionRef = collection(db, "categories");

  // Create a query against the collection
  const q = query(collectionRef);

  // Execute the query and get a snapshot of the documents in the collection
  const querySnapshot = await getDocs(q);

  // Reduce the documents in the snapshot to a single object (categoryMap)
  // For each document, get the 'title' and 'items' fields
  // Add a new property to the accumulator object (acc) where the key is the lowercased title and the value is the items
  // Return the accumulator object. so the final result will be an object that has a property for each category and the value of each property will be an array of items

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userRef = doc(db, "users", userAuth.uid); // this is saying to create a document reference object for a user in the users collection with that uid
  const userSnapShot = await getDoc(userRef); // this is the document data that we will use to check if the document exists in the database. it returns a document snapshot object that has a property called exists that we can use to check if the document exists in the database
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
    } catch (error) {}
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

// this function is used to check if the user is signed in or not. this particular setup
// here is for using it with redux-saga.
// export const getCurrentUser = () => {}. note that When you call onAuthStateChanged, it returns a function that you can call to unsubscribe from the listener. that is why we are able to call it inside the onAuthStateChanged function. note also that the 3rd argument to the onAuthStateChanged function is a function that will be called if there is an error in the authentication process. so we are passing the reject function from the promise to it and it will be called with the error as the argument if there is an error in the authentication process
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
