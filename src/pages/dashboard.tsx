import { FunctionComponent } from "react";
import LatestPosts from "~/components/latestPosts/latestPosts";
import NewPost from "~/components/newPost/newPost";

const Dashboard: FunctionComponent = () => {
  return (
    <div>
      <h1 className="mx-2">Panel de control de publicaciones</h1>
      <div className="flex gap-10">

        <div className="container m-2 w-1/3 p-4">
          <LatestPosts />
        </div>

        <div className="w-full">
          <NewPost/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
