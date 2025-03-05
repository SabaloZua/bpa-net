'use client'
import Tabela from '@/Components/Tabela'
import { ArrowRight, CreditCard, Eye, EyeClosed, Settings } from "lucide-react";
import Cartao from "@/Components/Cartão";
import Cambio from "@/Components/cambio";
import { Input } from "@/Components/ui/input";
import { useState } from 'react';
import Link from 'next/link';
export default function Home() {
  const [amount, setAmount] = useState('0.00');
  const [mostrarSaldo, setMostrarSado] = useState(true);
  const mudarIcon = mostrarSaldo === true ? false : true;
    return (
        <>
        <div className="flex items-center mb-6">
            <div className="bg-gray-200 p-2 rounded-full mr-4">
              <span 
              className="h-5 w-5 text-gray-600"
               onClick={() => {
                setMostrarSado(mudarIcon);
             }}>
               {mudarIcon ? <EyeClosed/> : <Eye/>}

              </span>
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">

                Saldo: Kz <span>{mostrarSaldo?"****":"20.000.000"}</span>,00
                </h1>
            </div>
          </div>

          {/* Cards Section */}
          <div className='flex flex-col gap-4'>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              {/* Card Section */}

              <div className=" lg:col-span-2 bg-gray-100 rounded-lg p-4 flex flex-col ">


                <div className="flex items-center justify-between ">
                  <h2 className="text-lg font-medium text-blue-500">Cartões</h2>
                  <div className="text-blue-500">
                    <ArrowRight />
                  </div>

                </div>
                <div className="w-full h-[0.5px] bg-[#efefef]   mb-4 mt-2"/>
                
                <div className="w-full flex justify-center">
                  <Cartao />

                </div>
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-12">
                    <button className="flex flex-col items-center text-gray-600">
                      <div className="p-3 rounded-full border border-gray-300 mb-2">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <span className="text-sm">Levantar</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-600">
                      <div className="p-3 rounded-full border border-gray-300 mb-2">
                        <Settings className="h-5 w-5" />
                      </div>
                      <span className="text-sm">Definições</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Transfer Section */}
              <div className=" bg-gray-100 rounded-lg p-4 flex  items-center flex-col">
                <div className=" w-full flex items-center justify-between">
                  <h2 className="text-lg font-medium text-blue-500">Enviar NaHora</h2>
                  <div className="text-blue-500">
                    <ArrowRight />
                  </div>
                </div>
                <div className="w-full h-[0.5px] bg-[#efefef]   mb-4 mt-2"/>
                <div className="space-y-4 w-full p-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conta de Origem</label>
                    <div className="relative">
                    
                      <Input
                        className=''
                        disabled={true}
                        placeholder='0013949403.30.0101'
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiário *</label>
                  
                    <Input
                    placeholder='Insira o N° de Telemóvel do Beneficiário'
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Montante *</label>
                    <div className="relative">
                    <Input
                    placeholder='Insira o N° de Telemóvel do Beneficiário'
                    value={`Kz ${amount}`}
                    onChange={(e) => {
                      // Extract only the number part and update
                      const val = e.target.value.replace(/[^0-9.]/g, '');
                      setAmount(val || '0.00');
                    }}

                    />
                    </div>
                  </div>

                  <button className="w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <span>Validar</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>

              </div>
            </div>

            <div className='grid grid-cols-1 rounded-lg lg:grid-cols-4 gap-4 p-5 bg-gray-100 '>

              {/* llll; */}
              <div className=" lg:col-span-2 bg-white rounded-xl  p-4 flex flex-col ">

                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-blue-500">Transaçoes recentes</h2>
                  <div className="text-blue-500">
                    <Link href={'/transacoes'} className='cursor-pointer'>
                    <ArrowRight />
                    </Link>

                  </div>
                </div>
                <div className="w-full h-[0.5px] bg-[#efefef]   mb-4 mt-2"/>
                <Tabela />

              </div>
              <div className=" lg:col-span-2 bg-white rounded-xl p-3 flex flex-col ">

                <div className="flex items-center justify-between ">
                  <h2 className="text-lg font-medium text-blue-500">Câmbio</h2>
                  <div className="text-blue-500">
                    <ArrowRight />
                  </div>
                </div>

                {/* Cambio section */}
                <div className="w-full h-[0.5px] bg-[#efefef] mb-4  mt-2"/>
                <Cambio />

              </div>
            </div>

          </div>
        </>
    )
}