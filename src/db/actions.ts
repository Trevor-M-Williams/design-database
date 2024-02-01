import { db } from "@/db/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

export async function fetchData() {
  try {
    const colRef = collection(db, "images");
    const snap = await getDocs(colRef);
    const data = snap.docs
      .map((doc) => {
        return doc.data() as ImageMetadata;
      })
      .sort((a, b) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });

    return data;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return [];
  }
}

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
