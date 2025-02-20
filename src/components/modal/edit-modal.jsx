import Modal from "./index";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import uploadToStorage from "../../firebase/uploadToStorage";
import { toast } from "react-toastify";
import Loader from "../loader/index";

const EditModal = ({ isOpen, close, tweet }) => {
  const [isPicDeleting, setIsPicDeleting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target[0].value.trim();
    const file = e.target[1].files && e.target[1].files[0];

    if (!text && !file && !tweet.content.image) {
      return toast.info("Lütfen içeriği belileyin");
    }
    try {
      setIsLoading(true);

      const docRef = doc(db, "tweets", tweet.id);

      let updatedData = {
        "content.text": text,
        isEdited: true,
      };

      if (isPicDeleting) {
        updatedData["content.image"] = null;
      }

      if (file) {
        const imageUrl = await uploadToStorage(file);
        updatedData["content.image"] = imageUrl;
      }

      await updateDoc(docRef, updatedData);

      close();
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
    setIsPicDeleting(false);
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <h1 className="text-2xl">Tweet'i Düzenle</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-10 min-w-[90%]">
        <label className="text-sm mb-3">Metni Değiştir</label>
        <textarea
          className="resize-y min-h-20 max-h-[250px] bg-black text-secondary border border-zinc-700 rounded-md p-3 outline-none"
          defaultValue={tweet.content.text}
        />

        <label className="text-sm mt-8 mb-3">Fotoğrafı Değiştir</label>
        {!isPicDeleting && tweet.content.image ? (
          <button
            onClick={() => setIsPicDeleting(true)}
            type="button"
            className="button"
          >
            Resmi Kaldır
          </button>
        ) : (
          <input type="file" className="button" />
        )}

        <div className="flex justify-end gap-5 mt-10">
          <button onClick={close} type="button" className="cursor-pointer">
            Vazgeç
          </button>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-secondary text-black px-3 py-1 rounded-md cursor-pointer hover:bg-secondary/70 transition min-w-[80px]"
          >
            {isLoading ? <Loader /> : "Kaydet"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
