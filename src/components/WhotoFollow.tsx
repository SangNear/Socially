import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import ButtonFollow from "./ButtonFollow";
import { getRandomUser } from "@/actions/user.action";

const WhotoFollow = async () => {
  const users = await getRandomUser();
  if (users?.length == 0) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {users?.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.image || ""} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.username}</span>
                  <span className="text-xs text-gray-500">24 followers</span>
                </div>
              </div>
              <ButtonFollow targetUser={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhotoFollow;
