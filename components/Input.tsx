import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import tw from "tailwind-styled-components";

const InputItem = tw.input`
  w-full
  rounded-md
  p-2
  placeholder:text-gray-300
  focus:outline-indigo-700
`;

interface InputProps {
  type: "email" | "password" | "text";
  placeholder: String;
  register: UseFormRegisterReturn;
  required?: boolean;
}

function Input({ type, placeholder, register, required }: InputProps) {
  return (
    <>
      {type === "email" ? (
        <InputItem
          autoComplete="off"
          {...register}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      ) : null}
      {type === "password" ? (
        <InputItem
          autoComplete="off"
          {...register}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      ) : null}
      {type === "text" ? (
        <InputItem
          autoComplete="off"
          {...register}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      ) : null}
    </>
  );
}

export default Input;
