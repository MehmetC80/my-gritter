import React from 'react';

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  value,
  disabled,
  onChange,
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      onChange={onChange}
      value={value}
      className='
   w-full
   p-4
   text-lg
   bg-slate-900
   rounded-md
   outline-none
   border-neutral-700
   text-white
   focus:border-skye-500
   focus:border-2
   transition
   disabled::bg-neutral-900
   disabled:opacity-70
   disabled:cursor-not-allowed

   '
    />
  );
};
export default Input;
