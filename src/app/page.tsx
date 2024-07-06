import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import CreateAccount from "./_components/create-account";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white from-[#2e026d] to-[#15162c] text-white dark:bg-gradient-to-b">
      <div className="flex flex-col items-center gap-4">
        <div>{getUserAll()}</div>
        <div className="flex flex-col items-center gap-2">
          <CreateAccount />
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
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
}

async function getUserAll() {
  const users = await api.user.findUser();
  return (
    <div className="w-full max-w-xs">
      {users ? (
        <p className="truncate">Your most recent user: {users.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
