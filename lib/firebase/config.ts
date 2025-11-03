import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC50jBLv0y5TrAKxF3Qrgb3q22Hqm5mguw",
  authDomain: "tiendacolchon-9b272.firebaseapp.com",
  projectId: "tiendacolchon-9b272",
  storageBucket: "tiendacolchon-9b272.firebasestorage.app",
  messagingSenderId: "3680517507",
  appId: "1:3680517507:web:d008b69ddc2afb8bfe4ab6",
  measurementId: "G-BTPV00LG0N"
}

// ✅ Se asegura que Firebase se inicialice solo una vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

const auth = getAuth(app)

export { app, auth }
