import type { FunctionComponent } from "react";
import { api } from "~/utils/api";
import PostCard from "../postCard/postCard";

const LatestPosts: FunctionComponent = () => {
  const { data, error, isLoading } = api.post.getLatest.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <div>{error.message}</div>;
      </>
    );
  }
  return (
    <>
      <h2 className="text-gray-900 text-lg font-bold mb-2">Últimas publicaciones</h2>
      {data.map((e, idx) => {
        return (
          <PostCard key={idx} post={e}/>
        );
      })}
    </>
  );
};

export default LatestPosts;
