import firebase from "firebase";
import { ref, onUnmounted } from "vue";

const config = {
  apiKey: "AIzaSyAkllJ-gSGhini1a8OKwg_E96C7S-wCz34",
  authDomain: "flutter-vue.firebaseapp.com",
  projectId: "flutter-vue",
  storageBucket: "flutter-vue.appspot.com",
  messagingSenderId: "3974329201",
  appId: "1:3974329201:web:1fe66dbfeda242200b3cd0",
  measurementId: "G-W3VQPSCQ5T",
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const usersCollection = db.collection("users");

export const createUser = (user) => {
  return usersCollection.add(user);
};

export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user);
};

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete();
};

export const useLoadUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return users;
};
