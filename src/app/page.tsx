import { getPost } from "@/actions/post.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import WhotoFollow from "@/components/WhotoFollow";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPost();

  return (
    <div className="grid gird-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : ""}
        <div className="w-full">
          {posts?.length ? (
            posts.map((post) => <PostCard post={post} key={post.id} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
      <div className=" lg:col-span-4 sticky ">
        <WhotoFollow />
      </div>
    </div>
  );
}
