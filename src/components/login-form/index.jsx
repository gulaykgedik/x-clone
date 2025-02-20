import EmailInput from "./email-input";
import PasswordInput from "./password-input";
import ForgotPassword from "./forgot-password";
import AuthToggle from "./auth-toggle";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());
    try {
      if (isSignUp) {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await sendEmailVerification(res.user);

        toast.info("Mailinize doğrulama epostası gönderildi");

        setIsSignUp(false);
      } else {
        const res = await signInWithEmailAndPassword(auth, email, password);

        if (!res.user.emailVerified) {
          return toast.info("Lütfen mailinizi doğrulayın");
        }

        navigate("/feed");
        toast.success("Oturumunuz açıldı");
      }

      e.target.reset();
    } catch (error) {
      toast.error("Hata: " + error.code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <EmailInput />

      <PasswordInput />

      {!isSignUp ? <ForgotPassword /> : <div className="h-[28px] w-1" />}

      <button
        type="submit"
        className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300 cursor-pointer"
      >
        {isSignUp ? "Kaydol" : "Giriş Yap"}
      </button>

      <AuthToggle isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </form>
  );
};

export default Form;
