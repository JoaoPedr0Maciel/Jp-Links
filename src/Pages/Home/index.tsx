import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  textColor: string;
}
export const Home = () => {
  const [linksDb, setLinksDb] = useState<LinkProps[]>([]);

  useEffect(() => {
    const loadLinks = () => {
      const linkRef = collection(db, "Links");
      const queryRef = query(linkRef, orderBy("createdAt", "asc"));

      getDocs(queryRef).then((snapshot) => {
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

        setLinksDb(list);
      });
    };

    loadLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        João Pedro Maciel
      </h1>
      <span className="text-gray-50 font-normal mt-5">Veja meus links ⬇️</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center mt-10">
        {linksDb.map((item) => (
          <a
            target="_blank"
            href={item.url}
            key={item.id}
            style={{ background: item.bg }}
            className=" cursor-pointer h-[2.5rem] flex justify-center items-center rounded-lg mb-4 select-none transition-transform hover:scale-105"
          >
            <span>
              <p style={{ color: item.textColor }} className=" font-medium">
                {item.name}
              </p>
            </span>
          </a>
        ))}
      </main>

      <footer>
        <p className="text-gray-400 text-xl mt-24">
          &copy; Criado por João Pedro Maciel
        </p>
      </footer>
    </div>
  );
};
