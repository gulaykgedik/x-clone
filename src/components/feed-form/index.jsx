import { useRef, useState } from "react";
import FormActions from "./form-actions";
import TextArea from "./text-area";
import UserAvatar from "./user-avatar";
import ImagePreview from "./image-preview";
import { toast } from "react-toastify";
import uploadToStorage from "../../firebase/uploadToStorage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const clearImage = () => {
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    const file = e.target.image.files[0];

    if (!text && !file) return toast.warning("Lütfen içeriği belirleyin.");

    try {
      setIsLoading(true);
      const url = await uploadToStorage(file);

      const collectionRef = collection(db, "tweets");

      await addDoc(collectionRef, {
        content: {
          text,
          image: url,
        },
        isEdited: false,
        likes: [],
        createdAt: serverTimestamp(),
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });

      e.target.reset();
      clearImage();
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  return (
    <div className="border-b border-tw-gray p-4 flex gap-3">
      <UserAvatar photo={user.photoURL} name={user.displayName} />

      <form onSubmit={handleSubmit} className="w-full pt-1">
        <TextArea />

        <ImagePreview image={image} clearImage={clearImage} />

        <FormActions
          isLoading={isLoading}
          onImageChange={onImageChange}
          fileInputRef={fileInputRef}
        />
      </form>
    </div>
  );
};

export default Form;
