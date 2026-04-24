import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import Loader from "../loader";

const Protected = () => {
  //aktif kullanıcı (oturumu açık olan) state'i
  const [user, setUser] = useState(undefined);

  //aktif kullanıcı (oturumu açık olan) verisini al
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  //kullanıcı verisi yükleniyorsa ekrana loader bas
  if (user === undefined) return <Loader />;

  //kullanıcının oturumu kapalıysa login sayfasına yönlendir
  if (user === null) return <Navigate to="/" replace />;

  //kullanıcının oturumu açıksa sayfayı göster

  //Outlet'le alt route'un elementini ekrana bas
  return <Outlet context={user} />;
};

export default Protected;
