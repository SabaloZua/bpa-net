"use client";

interface dados {
  Titulo: string;
  subTitulo: string;
}
export default function DynamicHeader(props: dados) {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl text-gray-700">{props.Titulo}</h1>
      <p className="font-medium text-gray-500 mt-1 mb-3 sm:mb-4 text-sm sm:text-base">{props.subTitulo}</p>
    </div>
  );
}
