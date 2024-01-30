import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/db/firebase";

export default async function Home() {
  const imagesRef = ref(storage, "/");

  const res = await listAll(imagesRef);
  const urls = await Promise.all(
    res.items
      .map(async (imageRef) => {
        try {
          const url = await getDownloadURL(imageRef);
          return url;
        } catch (error) {
          console.error("Error fetching image URL:", error);
          return null;
        }
      })
      .filter((url) => url !== null)
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <div className="grid grid-cols-3 gap-2">
        {urls.map((url, index) => (
          <div
            key={url}
            className="h-64 bg-secondary flex items-center justify-center"
          >
            <img
              src={url || ""}
              alt={`Screenshot ${index + 1}`}
              className="w-4/5"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
