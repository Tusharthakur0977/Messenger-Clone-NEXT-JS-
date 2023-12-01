"use client";

import Input from "@/app/_components/Inputs/Input";
import React from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

type VariantType = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = React.useState<VariantType>("LOGIN");
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleVariant = React.useCallback(() => {
    setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      //axios register
    }
    if (variant === "LOGIN") {
      //axios Login
    }
  };

  const socialActions = (action: string) => {
    setIsLoading(true);
    //social Signin
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <Input />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
