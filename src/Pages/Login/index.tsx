import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { FormEvent, useState } from "react";
import { auth } from "../../services/firebaseConection";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" h-screen flex justify-center items-center flex-col">
      <Link to="/home">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Links
          </span>
        </h1>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-1"
        action=""
      >
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 rounded h-9 border-0 text-lg font-medium text-white"
        >
          Acessar
        </button>
      </form>
    </div>
  );
};
