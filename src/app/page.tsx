import Link from "next/link";

import { CreatePost } from "~/app/_components-main/create-post";
import { api } from "~/trpc/server";
import CreateAccount from "./_components-main/create-account";
import { userViewData } from "~/prop/types";

const Home: React.FC = async () => {
  const users = await api.user.findUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white from-[#2e026d] to-[#15162c] text-white dark:bg-gradient-to-b">
      <div className="flex flex-col items-center gap-4">
        <UserView data={users} />
        <div className="flex flex-col items-center gap-2">
          <CreateAccount />
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
};

const CrudShowcase: React.FC = async () => {
  const latestPost = await api.post.getLatest();
  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
};

const UserView: React.FC<userViewData> = async ({ data }) => {
  return (
    <div>
      <h1>{data?.name}</h1>
      <h2>{data?.email}</h2>
    </div>
  );
};

export default Home;
