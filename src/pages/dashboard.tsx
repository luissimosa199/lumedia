import type { FunctionComponent } from "react";
import LatestPosts from "~/components/latestPosts/latestPosts";
import NewPost from "~/components/newPost/newPost";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="h-[90%]">
      <h1 className="mx-2 mb-2 text-gray-900 text-3xl font-bold">Panel de control de publicaciones</h1>
      <div className="flex flex-col-reverse h-full sm:flex-row">

        <div className="flex flex-col mb-2 sm:ml-2 mx-auto w-[95%] sm:w-1/3 p-2 max-h-[90vh] overflow-y-auto bg-grey rounded shadow-inner">
          <LatestPosts />
        </div>

        <div className="w-full sm:w-2/3">
          <NewPost/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
