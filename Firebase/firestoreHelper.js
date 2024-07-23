import { db } from "./firebaseSetup";
import { collection, addDoc } from "firebase/firestore";

export async function writeToDB(goal) {
    try {
        await addDoc(collection(db, "goals"), {
            goal: goal,
        });
        console.log(goal)
    }
    catch (err) {
        console.log(err)
    }
}

export async function deleteFromDB(id) {
    try {
        await deleteDoc(doc(db, "goals", id));
    }
    catch (err) {
        console.log(err)
    }
}