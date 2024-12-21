'use client'

import { Input } from './ui/input';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';



interface CustomInput {
 name: 'username' | 'codigo',
 label: string,
 placeholder:string
}


const CustomInput = ({  name, label, placeholder }:CustomInput) => {

  const [mostrarSenha, setMostrarSenha] = useState(true);
  const mudarIcon = mostrarSenha === true ? false : true;
    return (
      <div className="form-item text-gray-700 focus-within:text-bankGradient">
          <label 
            className='text-14 w-full max-w-[280px] font-medium '>{label}</label>
      
        <div className=" w-full items-center relative">
          <Input
            placeholder={placeholder}
            className="input-class"
            type={name === 'codigo' ? mostrarSenha ? 'password' : 'text': 'text'}
            maxLength={name === 'codigo' ? 20 : 40}
            
          />
          {name == 'codigo' &&

            <span className='text-gray-400 absolute left-[90%] top-3 '  onClick={() => {
              setMostrarSenha(mudarIcon);
           }}>
              {mudarIcon ? <EyeClosed/> : <Eye/>}
            </span>
          }
        </div>
      </div>
    )
  }
  
  export default CustomInput