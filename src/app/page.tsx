import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";

import ImageGrid from "@/components/image-grid";

async function fetchData() {
  try {
    const colrRef = collection(db, "images");
    const snap = await getDocs(colrRef);
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

export default async function Home() {
  const data = await fetchData();

  return <ImageGrid data={data} />;
}
