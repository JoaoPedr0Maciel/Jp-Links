import { auth } from "../services/firebaseConection";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateProps {
  children: React.ReactNode;
}
export function Private({ children }: PrivateProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        localStorage.setItem("reactLinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    return () => {
      unSub();
    };
  }, []);

  if (loading) {
    return <div className="text-2xl text-white font-bold">Carregando...</div>;
  }

  if (!signed) {
    navigate("/login");
  }

  return <>{children}</>;
}
