"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toggleFollowApi } from "@/actions/user.action";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";

const ButtonFollow = ({ targetUser }: { targetUser: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const toggleFollow = async () => {
    setIsLoading(true);
    try {
      const result = await toggleFollowApi(targetUser);
      if (result && result.state !== null) {
        setIsFollow(result.state);
        toast.success(result.message);
      }
    } catch (error) {
      toast.error("Something wrong in follow function");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button variant="outline" onClick={toggleFollow}>
      {isLoading ? (
        <Loader2Icon className="size-4 mr-2 animate-spin" />
      ) : isFollow ? (
        "UnFollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
};

export default ButtonFollow;
