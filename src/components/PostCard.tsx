import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Heart, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { getPost } from "@/actions/post.action";


type Post = {
    id: string;
    author: {
      id: string;
      image: string | null;
      username: string;
      name: string | null;
    };
    comments: {
      author: {
        id: string;
        image: string | null;
        username: string;
        name: string | null;
      };
    }[];
    likes: any[];
    _count: any;
  };

const PostCard = ({ post }: { post: Post }) => {
    
  return (
    <div className="mt-5  bg-zinc-900 rounded-xl ">
      <div className=" py-4 flex flex-col gap-3">
        <div className="px-4 flex gap-4 items-center">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </Avatar>
          <span>lam sang</span>
          <span className="text-gray-500 text-xs">3 minutes ago</span>
        </div>
        <p className="px-4 text-base text-gray-400">
          Thanks for the 50k subs everyone
        </p>
        <Image
          src="https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-dep-thien-nhien-2-1.jpg.webp"
          alt="img"
          width={900}
          height={900}
          className="object-contain w-full"
        />
        <div className="px-2">
          <Separator className="mt-2 w-full" />
        </div>

        <div className="px-4 flex justify-between items-center">
          <div className="flex gap-2 items-center ">
            <Heart className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500 transition-all duration-500" />
            <span className="text-gray-400 text-md">5</span>
          </div>
          <div className="flex gap-2 items-center">
            <MessageCircleMore className="w-5 h-5 text-gray-400 cursor-pointer hover:text-zinc-600 transition-all duration-500" />
            <span className="text-gray-400 text-md">5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
