"use client";

import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const { userAuth } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
      <h1 className="text-3xl font-bold leading-relaxed text-gray-100 text-center">Bem vindo {userAuth?.email} ao sistema de Metas/Tarefas</h1>
    </div>
  );
  
}
