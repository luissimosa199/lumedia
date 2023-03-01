import { FunctionComponent } from "react";
import { api } from "~/utils/api";

const LatestPosts: FunctionComponent = () => {
  const { data, error, isLoading } = api.post.getAll.useQuery();

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
      <h2>Últimas publicaciones</h2>
      {data.map((e) => {
        return (
          <div className="rounded-sm p-2 text-sm shadow-md" key={e.id}>
            <h2>{e.title}</h2>
            <p>Autor: {e.authorName}</p>
            <p>{`${e.createAt.toLocaleDateString()}`}</p>
            <div>
              <ul className="flex gap-1 text-xs">
                {e.tags.map((tag, idx) => {
                  return <li key={idx}>{tag}</li>;
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LatestPosts;
