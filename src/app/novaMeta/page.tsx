"use client";

import { ref, onValue, push } from "firebase/database";
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
    const router = useRouter();
    const {userAuth, logout} = useAuthContext();
    
    const [novaMeta, setNovaMeta] = useState({
      titulo: "",
      descricao: "",
      data_inicio: "",
      data_conclusao: "",
      status: "",
      id_usuario: userAuth?.uid,
    });
  
    if (!userAuth) {
      router.push("/signin");
    }
    
  
    const addNovaMeta = () => {
        const today = new Date().toISOString().split('T')[0];
        
        if (novaMeta.status === "") {
            alert("Selecione o status da tarefa.");
            return;
        }
        
        if (novaMeta.descricao.length < 3) {
            alert("A descricão deve ter pelo menos 3 caracteres.");
            return;
        }
        if (novaMeta.descricao.length > 50) {
            alert("A descricão deve ter no maximo 50 caracteres.");
            return;
        }
        if (novaMeta.titulo.length < 3) {
            alert("O titulo deve ter pelo menos 3 caracteres.");
            return;
        }
        if (novaMeta.titulo.length > 15) {
            alert("O titulo deve ter no maximo 15 caracteres.");
            return;
        }

        if (novaMeta.data_inicio < today) {
            alert("A data de início não pode ser anterior ao dia atual.");
            return;
        }
        if (novaMeta.data_conclusao < novaMeta.data_inicio) {
            alert("A data de conclusão não pode ser anterior à data de início.");
            return;
        }
      push(ref(db, "/metas"), novaMeta);
      setNovaMeta({
        titulo: "",
        descricao: "",  
        data_inicio: "",    
        data_conclusao: "",
        status: "",
        id_usuario: userAuth?.uid,});
      router.push("/metas");
    };
   
    return (
      <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
        <div className="max-w-md mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNovaMeta();
            }}
          >
            <div className="mb-4">
              <h2 className="text-center text-3xl mb-8 font-extrabold text-white">
                Nova Meta
              </h2>
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="email"
              >
                usuario: {userAuth?.email}
              </label>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="titulo"
              >
                Titulo:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="titulo"
                type="text"
                placeholder="titulo"
                value={novaMeta.titulo}
                onChange={(e) =>
                  setNovaMeta({ ...novaMeta, titulo: e.target.value })
                }
              />
              

            </div>
            <div className="mb-8">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="descricao"
              >
                Descricao:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="descricao"
                type="text"
                placeholder="descricao"
                value={novaMeta.descricao}
                onChange={(e) =>
                  setNovaMeta({ ...novaMeta, descricao: e.target.value })
                }
              />
              
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="data_inicio"
              >
                Data de inicio:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="data_inicio"
                type="date"
                placeholder="data_inicio"
                
                value={novaMeta.data_inicio}
                onChange={(e) =>
                  setNovaMeta({ ...novaMeta, data_inicio: e.target.value })
                }
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="data_conclusao"
              >
                Data de conclusão:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="data_conclusao"
                type="date"
                placeholder="data_conclusao"
                value={novaMeta.data_conclusao}
                onChange={(e) =>
                  setNovaMeta({ ...novaMeta, data_conclusao: e.target.value })
                }
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status:
              </label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="status" value={novaMeta.status} onChange={(e) =>
                setNovaMeta({ ...novaMeta, status: e.target.value })
              } required>
                <option value="" disabled>Selecione o status</option>
                <option value="pendente">Pendente</option>
                <option value="andamento">Andamento</option>
                <option value="concluído">Concluído</option>
              </select>

            </div>
  
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Cadastrar Meta
              </button>
            </div>
            
          </form>
        </div>
      </div>
    );
  }