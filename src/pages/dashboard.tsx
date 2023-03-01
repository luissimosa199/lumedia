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
      <h1 className="mx-2">Panel de control de publicaciones</h1>
      <div className="flex gap-10">

        <div className="container m-2 w-1/3 p-4">
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
        </div>

        <div className="w-full">
          <form className="flex w-2/3 flex-col gap-2 w-full p-10">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              name="title"
              type="text"
              className="rounded border"
            />
            <label htmlFor="content">Contenido</label>
            <input
              id="content"
              name="content"
              type="textarea"
              className="rounded border"
            />
            <label htmlFor="tags">Categorías</label>
            <input
              id="tags"
              name="tags"
              type="text"
              className="rounded border"
            />
            <div className="flex justify-end gap-2">
              <button className="rounded border-2 px-4 py-2">Despejar</button>
              <button className="rounded bg-darker-blue px-4 py-2 text-white">
                Enviar
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
