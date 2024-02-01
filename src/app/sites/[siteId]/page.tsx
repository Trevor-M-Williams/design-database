import Link from "next/link";

import { db } from "@/db/firebase";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

async function fetchData(siteId: string): Promise<ImageMetadata[]> {
  try {
    const colRef = collection(db, "sites", siteId, "images");
    const snap = await getDocs(colRef);

    const promises = snap.docs.map(async (document) => {
      const imageRef = document.data().imageRef as string;
      const docRef = doc(db, "images", imageRef);
      const docSnap = await getDoc(docRef);
      return docSnap.data() as ImageMetadata;
    });

    const data = await Promise.all(promises);
    const sortedData = data.sort((a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
    return sortedData;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return [];
  }
}

export default async function ProfilePage({
  params: { siteId },
}: {
  params: { siteId: string };
}) {
  const data = await fetchData(siteId);

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto p-8">
      <div className="flex items-center justify-between mb-4">
        <Link
          href={data[0].source}
          target="_blank"
          className="text-3xl font-semibold"
        >
          {siteId.replace("www.", "")}
        </Link>
        <Link href="/" className="text-xl font-medium">
          Gallery
        </Link>
      </div>

      <div className="flex flex-col gap-8 items-center">
        {data.map((imageData, i) => (
          <div key={i}>
            <img
              src={imageData.imageUrl}
              alt={`${siteId}-${i}`}
              draggable="false"
              className="max-h-[95vh] max-w-full rounded-lg shadow-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
