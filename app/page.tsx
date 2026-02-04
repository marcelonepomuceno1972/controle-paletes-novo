"use client";


import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
const router = useRouter();


return (
<main className="min-h-screen flex items-center justify-center bg-slate-100">
<div className="relative w-full max-w-6xl rounded-2xl overflow-hidden shadow-xl">
{/* IMAGEM DE FUNDO */}
<Image
src="/capa-logistica-reversa-v2.png"
alt="Logística Reversa"
width={1800}
height={1000}
className="w-full h-auto object-contain"
priority
/>


{/* CONTAINER CENTRAL AJUSTADO (SUBIDO ~5cm / 180px) */}
<div className="absolute inset-0 flex items-center justify-center">
<div className="w-[820px] h-[520px] flex flex-col items-center justify-center gap-5 transform -translate-y-[30px]">
<button
onClick={() => router.push("/painel")}
className="w-[320px] py-4 rounded-xl bg-slate-900 text-white text-lg font-bold hover:opacity-90 transition"
>
DASHBOARD
</button>


<button
onClick={() => router.push("/entrada")}
className="w-[320px] py-4 rounded-xl bg-green-600 text-white text-lg font-bold hover:opacity-90 transition"
>
REGISTRO DE ENTRADA
</button>


<button
onClick={() => router.push("/saida")}
className="w-[320px] py-4 rounded-xl bg-red-600 text-white text-lg font-bold hover:opacity-90 transition"
>
REGISTRO DE SAÍDA
</button>


<button
onClick={() => router.push("/retorno-loja")}
className="w-[320px] py-4 rounded-xl bg-orange-500 text-white text-lg font-bold hover:opacity-90 transition"
>
RETORNO DE LOJA
</button>
</div>
</div>
</div>
</main>
);
}