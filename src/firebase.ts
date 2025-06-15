import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB9HcDPNdXfn0a8mOELX3tCnbTt4QxE43s',
  authDomain: 'comanda-2f60c.firebaseapp.com',
  projectId: 'comanda-2f60c',
  storageBucket: 'comanda-2f60c.firebasestorage.app',
  messagingSenderId: '703928590118',
  appId: '1:703928590118:web:9fa4f0bd1de0676007abe7',
  measurementId: 'G-QZ53R111PW',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
