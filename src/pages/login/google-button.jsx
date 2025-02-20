import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleButton = () => {
  const navigate = useNavigate();

  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/feed");
    });
    toast.success("Oturumunuz açıldı");
  };
  return (
    <button
      onClick={handleGoogle}
      className="bg-white flex items-center justify-center py-2 px-10 rounded-full text-black hover:bg-gray-300 whitespace-nowrap gap-x-3 transition cursor-pointer "
    >
      <img src="/google-logo.png" alt="google-logo" className="h-[20px]" />
      <span className="font-semibold">Google ile Giriş Yap</span>
    </button>
  );
};

export default GoogleButton;
