import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyAuqsm6nu4J0RxsACn0askItlOXwkhza7U",
    authDomain: "social-media-app-a9b1d.firebaseapp.com",
    projectId: "social-media-app-a9b1d",
    storageBucket: "social-media-app-a9b1d.appspot.com",
    messagingSenderId: "1070630316696",
    appId: "1:1070630316696:web:0f3e47cf2f7b0fef1efeed"
})

const firestore = firebase.firestore();

export {firestore};