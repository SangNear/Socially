"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Image, Loader2Icon, Send } from "lucide-react";
import { Button } from "./ui/button";
import { createPost } from "@/actions/post.action";
import toast from "react-hot-toast";

const CreatePost = () => {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleCreatePost = async () => {
    setIsPosting(true);
    try {
      const result = await createPost(content, imageUrl);
      if (result.success) {
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);
        toast.success("Post create successfully!");
      }
    } catch (error) {
      console.log("Error in fetching create a Post", error);
      toast.error("Failure create post!");
    } finally {
      setIsPosting(false);
    }
  };
  return (
    <div className="p-4 w-full border ">
      <div className="flex flex-col">
        <div className="flex space-x-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <Textarea
            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image className="w-6 h-6" />
            <span>Photo</span>
          </div>
          <Button
            variant="secondary"
            onClick={handleCreatePost}
            disabled={content ? false : true}
          >
            {isPosting ? (
              <>
                <Loader2Icon className="size-4 mr-2 animate-spin" />{" "}
                <span>Posting</span>
              </>
            ) : (
              <>
                <Send />
                <span>Post</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
