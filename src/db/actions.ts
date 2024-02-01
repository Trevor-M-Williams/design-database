import { db } from "@/db/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

export async function updateDB() {
  const mainColRef = collection(db, "images");
  const mainColSnapshot = await getDocs(mainColRef);

  for (const documentSnapshot of mainColSnapshot.docs) {
    const docRef = doc(db, "images", documentSnapshot.id);
    await updateDoc(docRef, {
      name: deleteField(),
    });
  }
}
