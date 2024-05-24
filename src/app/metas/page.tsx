"use client";

import { ref, onValue, remove } from "firebase/database";
import { db } from "../../services/firebase/firebaseConfiguration";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";


interface IMeta {
  [key: string]: {
    titulo: string;
    descricao: string;
    data_inicio: string;
    data_conclusao: string;
    status: string;
    id_usuario: string;
  };
}

 
export default function Home() {
  const { userAuth, logout } = useAuthContext();
  const [metas, setMetas] = useState<IMeta>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  if (!userAuth) {
    router.push("/signin");
  }

  useEffect(() => {
    const fetchData = () => {
      const unsubscribe = onValue(ref(db, "/metas"), (querySnapShot) => {
        const tasksData: IMeta = querySnapShot.val() || {};
        console.log(tasksData);
        setMetas(tasksData);
        setLoading(false);
      });
      return () => unsubscribe();
    };
    fetchData();
  }, []);


  console.log(userAuth?.uid);
  console.log(userAuth?.email);
  console.log(metas)
  


  function ClearMeta(metaKey: string) {
    const metaRef = ref(db, `/metas/${metaKey}`);
    remove(metaRef);
  }

  return (
    <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
      <h1 className="text-3xl font-bold leading-relaxed text-gray-100 text-center">METAS</h1>
      <div className="flex flex-col gap-8 m-12">
        {!loading &&
          Object.keys(metas).map((id) => (
            metas[id].id_usuario === userAuth?.uid &&
            <div key={id} className="relative py-3">
              <div className="max-w-full mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-6">
                  <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    {loading ? "Carregando..." : `${metas[id].titulo}`.toUpperCase()}
                  </h2>
                  <div className="my-4">
                    <p className="text-gray-700">{`Descrição: ${metas[id].descricao}`}</p>
                    <p className="text-gray-700">{`Status: ${metas[id].status}`}</p>
                    <p className="text-gray-700">{`Data de Início: ${metas[id].data_inicio}`}</p>
                    <p className="text-gray-700">{`Data de conclusão: ${metas[id].data_conclusao}`}</p>
  
                    <div className="flex justify-center space-x-4 mt-4">
                      <button
                        onClick={() => ClearMeta(id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
  
}
