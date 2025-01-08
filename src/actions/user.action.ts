"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return;

    const existsUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existsUser) return existsUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });
    return dbUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      _count: {
        select: {
          flowers: true,
          folowings: true,
          post: true,
        },
      },
    },
  });
}
export async function getDbUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("user not found");
  return user.id;
}

export async function getRandomUser() {
  try {
    const userId = await getDbUserId();

    const randomUsers = await prisma.user.findMany({
      where: {
        AND: [
          { NOT: { id: userId } },
          {
            NOT: {
              flowers: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        _count: {
          select: {
            flowers: true,
          },
        },
      },
      take: 3,
    });
    return randomUsers;
  } catch (error) {
    console.log("Error in getRandomUser", error);
  }
}

export async function toggleFollowApi(targetUserId: string) {
  try {
    const userId = await getDbUserId();

    //check relation between userId (current user) and targetUserId (user being followed/unfollowed)
    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetUserId,
        },
      },
    });

    //if existingFollow true that mean current user is following that targetuser, then delete it relationship if this function has call
    if (existingFollow) {
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targetUserId,
          },
        },
      });
      return {success: true, message: "Unfollow successfully!", state: false}
    } 
    //and existing false that mean current user is not follow that targetuser yet, then create relationship if this function has call
    else {
      await prisma.follows.create({
        data: {
          followerId: userId,
          followingId: targetUserId,
        },
      });
      return {success: true, message: "Follow successfully!", state: true}
    }
  } catch (error) {
    console.log("Error in toggle follow", error);
  }
}
