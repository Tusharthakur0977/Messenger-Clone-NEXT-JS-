"use client";

import Avatar from "@/app/_components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface IUserCardProps {
  user: User;
}

const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = React.useMemo(() => {
    setIsLoading(true);

    axios
      .post("/api/conversation", {
        userId: user.id,
      })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
      })
      .catch((err) => {
        toast.error(err?.message);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <Avatar user={user} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xl font-medium text-gray-900 ">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
