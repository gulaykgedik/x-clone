import { CiImageOn as Image } from "react-icons/ci";
import { MdOutlineGifBox as Gif } from "react-icons/md";
import { FaRegSmile as Smile } from "react-icons/fa";
import Loader from "../loader";

const FormActions = ({ isLoading, onImageChange, fileInputRef }) => {
  return (
    <div className="flex justify-between ">
      <div className="text-tw-blue text-2xl flex gap-4 mt-8">
        <label htmlFor="image" type="button" className="form-icon">
          <input
            id="image"
            type="file"
            name="image"
            className="hidden"
            onChange={onImageChange}
            ref={fileInputRef}
          />
          <Image />
        </label>
        <button type="button" className="form-icon">
          <Gif />
        </button>

        <button type="button" className="form-icon">
          <Smile />
        </button>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="mt-10 bg-white text-black rounded-full p-1 font-bold tracking-wide hover:brightness-70 min-w-[100px] transition cursor-pointer flex justify-center"
      >
        {isLoading ? <Loader /> : " Gönder"}
      </button>
    </div>
  );
};

export default FormActions;
