import Image from "next/image";
import React from "react";
import { IconType } from "react-icons";

 interface IAuthSocialButtonProp {
  icon: IconType | string;
  onclick: () => void;
}
const AuthSocialButton: React.FC<IAuthSocialButtonProp> = ({
  icon: Icon,
  onclick,
}) => {
  const isIcon = typeof Icon !== "string";
  return (
    <button
      type="button"
      onClick={onclick}
      className="inline-flex w-full justify-center rounded-md px-4 py-2 shadow-sm hover:ring-1 hover:ring-inset hover:ring-gray-300
   hover:bg-gray-50 focus:outline-offset-0"
    >
      {isIcon ? (
        <Icon size="1.5rem" />
      ) : (
        <Image alt="" src={Icon} width={24} height={24} />
      )}
    </button>
  );
};

export default AuthSocialButton;
