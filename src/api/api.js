import { getFirestore, collection, getDocs, addDoc, doc, getDoc, deleteDoc, query, where, updateDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAKvGSoY3cDXr6HEwF-aYwORoOUQwd6neo",
    authDomain: "kanban-c7779.firebaseapp.com",
    databaseURL: "https://kanban-c7779-default-rtdb.firebaseio.com",
    projectId: "kanban-c7779",
    storageBucket: "kanban-c7779.appspot.com",
    messagingSenderId: "369375307446",
    appId: "1:369375307446:web:9db151a60720fa219d6817",
    measurementId: "G-5RCNZR277E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getData = async (name) => {
    const dataCol = collection(db, name);
    const dataSnapshot = await getDocs(dataCol);
    const dataList = dataSnapshot.docs.map(doc => {
        return {
            id: doc.id,
            name: doc.data().name
        }
    });
    return dataList;
};

const getDataOnParameters = async (name, paramName, paramId) => {
    const q = query(collection(db, name), where(paramName, "==", paramId));
    const data = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
};

const getDocData = async (name, paramId) => {
    const docRef = doc(db, name, paramId);
    const docSnap = await getDoc(docRef);
    return {
        id: docSnap.id,
        ...docSnap.data()
    };
};

const addData = async (name, desk) => {
    const res = await addDoc(collection(db, name), desk);
    const docRef = doc(db, name, res.id);
    const docSnap = await getDoc(docRef);
    const data = {
        id: docSnap.id,
        name: docSnap.data().name,
        deskId: docSnap.data().deskId
    };
    return data;
};

const deleteData = async (name, id) => {
    deleteDoc(doc(db, name, id));
};

const editData = async (name, id, field, value) => {
    const fieldRef = doc(db, name, id);
    await updateDoc(fieldRef, {
        [field]: value
    });
};

export const api = {
    getData,
    getDataOnParameters,
    addData,
    deleteData,
    getDocData,
    editData
};