import Link from "next/link";

import { CreatePost } from "~/app/_components-main/create-post";
import { api } from "~/trpc/server";
import CreateAccount from "./_components-main/create-account";
import { userViewData } from "~/prop/types";

const Home: React.FC = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white from-[#2e026d] to-[#15162c] text-white dark:bg-gradient-to-b">
      <div className="flex flex-col items-center gap-4">
        {/* <UserView /> */}
        <div className="flex flex-col items-center gap-2">
          {/* <CreateAccount /> */}
        </div>
      </div>
    </main>
  );
};

// const UserView: React.FC = async () => {
//   const users = await api.user.findUser();
//   return (
//     <div>
//       {users && (
//         <>
//           <h1>{users.name}</h1>
//           <h2>{users.email}</h2>
//         </>
//       )}
//     </div>
//   );
// };

export default Home;
