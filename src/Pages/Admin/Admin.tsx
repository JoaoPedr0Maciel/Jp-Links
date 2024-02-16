import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Input } from "../../components/Input/Input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  textColor: string;
}
export const Admin = () => {
  const [nameInput, setnameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#ffffff");
  const [textColorInput, setTextColorInput] = useState("#000000");
  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "Links");
    const queryRef = query(linksRef, orderBy("createdAt", "asc"));

    const unSub = onSnapshot(queryRef, (snapshot) => {
      let list = [] as LinkProps[];
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          textColor: doc.data().textColor,
        });
      });

      setLinks(list);
    });

    return () => {
      unSub();
    };
  }, []);

  const handleSubmitLink = (e: FormEvent) => {
    e.preventDefault();
    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "Links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      textColor: textColorInput,
      createdAt: new Date(),
    })
      .then(() => {
        console.log("Cadastrado com sucesso!");
        setnameInput("");
        setUrlInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteLink = async (id: string) => {
    const docRef = doc(db, "Links", id);
    await deleteDoc(docRef);
  };

  return (
    <div className="flex flex-col items-center pb-7 px-2 min-h-screen ">
      <Header />
      <form
        onSubmit={handleSubmitLink}
        className="flex flex-col mb-3 mt-8 w-full max-w-xl"
      >
        <label className="text-white font-medium mb-1">Nome do link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setnameInput(e.target.value)}
        />
        <label className="text-white font-medium mb-1 ">URL</label>
        <Input
          placeholder="Digite a URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex py-3 gap-5">
          <div className="flex gap-1">
            <label className="text-white font-medium mb-1 ">
              Fundo do Link
            </label>
            <input
              className="cursor-pointer"
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <label className="text-white font-medium mb-1 ">
              Texto do Link
            </label>
            <input
              className="cursor-pointer"
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <>
            <div className="flex flex-col justify-center items-center border-gray-100/25 border rounded-md">
              <label className="text-white font-medium mb-3 ">
                Veja como esta ficando
              </label>
              <article
                className="w-11/12 max-w-lg flex flex-col mb-8 items-center justify-between bg-zinc-900 rounded px-1 py-3"
                style={{ backgroundColor: backgroundColorInput }}
              >
                <p className="font-bold" style={{ color: textColorInput }}>
                  {nameInput}
                </p>
              </article>
            </div>

            <button
              type="submit"
              className="mb-6 bg-green-500 h-9 rounded-lg font-bold mt-6"
            >
              Cadastrar Link
            </button>
          </>
        )}
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

      {links.map((item) => (
        <article
          key={item.id}
          className="flex items-center justify-between w-11/12 max-w-xl h-12 rounded-lg px-10"
          style={{ backgroundColor: item.bg, color: item.textColor }}
        >
          <p className="font-bold">{item.name}</p>
          <div>
            <button onClick={() => handleDeleteLink(item.id)}>
              <FiTrash size={18} color="white" className="cursor-pointer" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
