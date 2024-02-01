import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { db, storage } from "@/db/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const options = {
  status: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};

export async function OPTIONS() {
  return NextResponse.json({}, options);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await postToFirebase(data);
    return NextResponse.json(
      { message: "Image uploaded successfully!" },
      options
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ error }, { ...options, status: 500 });
  }
}

async function postToFirebase(data: ImageCaptureData) {
  const name = data.name;
  const source = data.source;
  const siteId = source.split("/")[2];
  const fileName = `${name}_${Date.now()}.jpg`;
  const storageRef = ref(storage, fileName);
  const blob = base64ToBlob(data.dataUrl, "image/jpeg");

  try {
    const snapshot = await uploadBytes(storageRef, blob);
    const imageUrl = await getDownloadURL(snapshot.ref);

    const metadata = {
      name,
      imageUrl,
      source,
      siteId,
      tags: data.tags,
      timestamp: data.timestamp,
    };

    const mainColRef = collection(db, "images");
    const siteColRef = collection(db, "sites", siteId, "images");

    await addDoc(mainColRef, metadata);
    await addDoc(siteColRef, metadata);

    revalidatePath("/");

    console.log("Image uploaded and metadata stored in Firestore!");
  } catch (error) {
    console.error("Error uploading image and storing metadata:", error);
  }
}

function base64ToBlob(base64: string, contentType: string) {
  const byteCharacters = atob(
    base64.replace(/^data:image\/(jpeg|png|gif|bmp);base64,/, "")
  );
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}
