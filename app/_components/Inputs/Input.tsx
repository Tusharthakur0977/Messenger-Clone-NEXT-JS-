"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IInputProps {
  label: string;
  id: string;
  type: string;
  required: boolean;
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
      <label htmlFor={id} className="black text-sm font-medium ">{label}</label>
      <input type={type} required={required} disabled={disabled} id={id} />
      rrere vg6
    </div>
  );
};

export default Input;
