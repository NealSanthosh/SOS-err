import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAWBA8Kk4cGlpACtWNs3BPcH7ghDf56ii4",
  authDomain: "sosemergencyapp-539fc.firebaseapp.com",
  projectId: "sosemergencyapp-539fc",
  storageBucket: "sosemergencyapp-539fc.appspot.com",
  messagingSenderId: "588463753907",
  appId: "1:588463753907:web:21ce5a3cf237de205dfec6"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
