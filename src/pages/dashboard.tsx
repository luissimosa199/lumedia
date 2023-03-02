import { FunctionComponent } from "react";
import LatestPosts from "~/components/latestPosts/latestPosts";
import NewPost from "~/components/newPost/newPost";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="h-[90%]">
      <h1 className="mx-2">Panel de control de publicaciones</h1>
      <div className="flex h-full">

        <div className="flex flex-col gap-2 ml-2 w-1/3 p-2 h-full overflow-y-auto bg-grey rounded shadow-inner">
          <LatestPosts />
        </div>

        <div className="w-2/3">
          <NewPost/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
