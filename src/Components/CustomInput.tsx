import { z } from 'zod';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

import { Control } from 'react-hook-form'
import { authFormSchema } from '@/lib/utils';



interface CustomInput {
 control: Control<z.infer<typeof authFormSchema>>,
 name: 'username' | 'codigo',
 label: string,
 placeholder:string
}


const CustomInput = ({ control, name, label, placeholder }:CustomInput) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="form-item">
            <FormLabel className="form-label">
              {label}
            </FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input 
                  placeholder={placeholder}
                  className="input-class"
                  type={name === 'codigo' ? 'password' : 'text'}
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </div>
        )}
      />
    )
  }
  
  export default CustomInput