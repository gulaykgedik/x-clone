import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import PageLoader from "../loader/page-loader";

const Protected = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));

    return () => unsub();
  }, []);

  if (user === undefined) {
    return <PageLoader />;
  }

  if (user === null || user?.emailVerified === false) {
    if (user?.emailVerified === false) toast.info("Mailinizi doğrulayın");
    return <Navigate to="/" replace />;
  }
  return <Outlet context={user} />;
};

export default Protected;
