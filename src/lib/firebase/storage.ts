import { storage } from "./clientApp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(image: File) {
  if (!image) {
    throw "No image Uploaded";
  }
  const filePath = `images/${image.name}`;
  const newImageRef = ref(storage, filePath);

  try {
    await uploadBytes(newImageRef, image);
    const url = await getDownloadURL(newImageRef);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image");
  }
}
