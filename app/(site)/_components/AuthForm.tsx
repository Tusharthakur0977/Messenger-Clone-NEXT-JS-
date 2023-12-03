"use client";

import Button from "@/app/_components/Button";
import Input from "@/app/_components/Inputs/Input";
import React from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle, BsFacebook } from "react-icons/bs";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

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
      axios
        .post("/api/register", data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("User Created Successfully");
          }
        })
        .catch((err: AxiosError) => {
          toast.error(err.response?.data as string);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((res) => {
          if (res?.error) {
            toast.error(res.error);
          }
          if (res?.ok && !res?.error) {
            toast.success("Logging");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialActions = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((res) => {
        if (res?.error) {
          toast.error(res.error);
        }
        if (res?.ok && !res?.error) {
          toast.success(`Logging using ${action}`);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onclick={() => socialActions("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onclick={() => socialActions("google")}
            />
            <AuthSocialButton
              icon={BsFacebook}
              onclick={() => socialActions("facebook")}
            />
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "New to Messenger?"
                : "Already hae an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login here"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
