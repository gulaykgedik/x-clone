import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./index";
import { v4 } from "uuid";

const uploadToStorage = async (file) => {
  if (!file || !file.type.startsWith("image")) return null;

  if (file.size > 2097152) {
    toast.error("Lütfen 2mb'ın altında bir medya yükleyin");
    throw new Error("Medya içeriği sınırı aşıyor");
  }

  const imageRef = ref(storage, v4() + file.name);

  await uploadBytes(imageRef, file);

  const url = await getDownloadURL(imageRef);

  return url;
};
export default uploadToStorage;
