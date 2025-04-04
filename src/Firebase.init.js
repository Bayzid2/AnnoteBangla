
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCprxq5r8S4RaDwGPk-1ey31HKsICzvRZY",
  authDomain: "pic-comments.firebaseapp.com",
  projectId: "pic-comments",
  storageBucket: "pic-comments.appspot.com",
  messagingSenderId: "497930341314",
  appId: "1:497930341314:web:8c4b48f697b106067a245b",
  measurementId: "G-EJJN3TKMZ9"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth=getAuth(app)
//  const db = firebase.firestore();

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);

export {  db, storage };

export default auth; 