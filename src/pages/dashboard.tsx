import { FunctionComponent } from "react";
import { api } from "~/utils/api";

const Dashboard: FunctionComponent = () => {
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
    <div>
      <h1>Dashboard</h1>

      <div className="container m-2 w-2/3 rounded-sm p-2 shadow-md">
        {data.map((e) => {
          return (
            <div key={e.id}>
              <h2>{e.title}</h2>
              <p>Autor: {e.authorName}</p>
              <p>{`${e.createAt}`}</p>
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
      </div>
    </div>
  );
};

export default Dashboard;
