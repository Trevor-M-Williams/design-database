import { NextResponse } from "next/server";

import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/db/firebase";

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
    return NextResponse.json({ message: "Success" }, options);
  } catch (error) {
    return NextResponse.json({ error }, options);
  }
}

async function postToFirebase(dataUrl: string) {
  const storageRef = ref(storage, "test2.jpg");
  const blob = base64ToBlob(dataUrl, "image/jpeg");

  uploadBytes(storageRef, blob).then((snapshot) => {
    console.log("Uploaded a blob!");
  });
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
