import firebase from "firebase";
import firebaseConfig from "./config/firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const imageRef = firebase.storage().ref();

export { db, auth, imageRef };
