import { db } from "../lib/firebase.config";
import { doc, setDoc } from "firebase/firestore"; 

type WriteDocInputs = {
    title: string | null;
    path: string | null;
    file: File | null
}

// interface FireStoreType {
//     writeDoc: (...args: [WriteDocInputs]) => Promise<void>;
// }

/* eslint-disable no-console */
const FireStore = {
    writeDoc: (...args: [WriteDocInputs]) => {
        const [inputs] = args;
        return new Promise(async resolve => {
            try {
                const randomId = Math.floor(Math.random() * 1000000000);
                const docRef = doc(db, 'stocks', `${randomId}`);
                await setDoc(docRef, { title: inputs.title, path: inputs.path, createdAt: new Date().toISOString() });
                resolve("New doc successfully inserted.");
            } catch (error) {
                console.error('Error writing document:', error);
            }
        });
    },
};


export default FireStore;