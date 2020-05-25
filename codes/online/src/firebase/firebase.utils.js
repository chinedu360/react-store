import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBbrOTkaka4KGe_cMKBWA_5ZJCdDD8P1lA",
    authDomain: "online-store-3480f.firebaseapp.com",
    databaseURL: "https://online-store-3480f.firebaseio.com",
    projectId: "online-store-3480f",
    storageBucket: "online-store-3480f.appspot.com",
    messagingSenderId: "496546608262",
    appId: "1:496546608262:web:c02afd57add692d4618d07",
    measurementId: "G-9GYEY2DEMQ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating using', error.message)
      }
    }

  return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;