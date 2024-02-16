import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConection";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

export const Header = () => {
  const handleLogOut = async () => {
    await signOut(auth);
  };

  return (
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white h-12 flex items-center justify-between px-3 rounded-xl">
        <div className="text-black font-medium text-lg flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/admin">Links</Link>
          <Link to="/admin">Redes Sociais</Link>
        </div>
        <button onClick={handleLogOut}>
          <BiLogOut className="text-red-500 text-2xl" />
        </button>
      </nav>
    </header>
  );
};
