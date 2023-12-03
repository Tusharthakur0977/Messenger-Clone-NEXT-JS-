"use client";

import clsx from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IInputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<IInputProps> = ({
  label,
  errors,
  id,
  register,
  required,
  type,
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="black text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          className={clsx(
            `form-input block w-full border-0 rounded-md py-1.5 text-gray-900 shadow-sm
           ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 placeholder:text-gray-400`,
            errors[id] && "focus:ring-rose-500 ",
            disabled && "opacity-50 cursor-default"
          )}
          type={type}
          autoComplete={id}
          {...register(id, { required })}
          disabled={disabled}
          id={id}
        />
      </div>
    </div>
  );
};

export default Input;
