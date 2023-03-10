import Link from "next/link";
import type { FunctionComponent } from "react";
import { api } from "~/utils/api";

const Posts: FunctionComponent = () => {
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
    <div className='h-full my-2 overflow-x-auto'>
      <table className="rounded p-2 shadow-md mx-1 mb-2 md:mx-10 table-auto border-separate text-sm border-spacing-6">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Fecha</th>
            <th>Categorias</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => {
            return (
              <tr key={post.id} className="border border-y-grey border-x-white">
                <td>{post.title}</td>
                <td>{post.authorName}</td>
                <td>{post.createAt.toLocaleDateString()}</td>
                <td>
                  {post.tags.map((tag, idx) => {
                    return <span key={idx} className="bg-grey rounded p-1 mx-1">{tag}</span>;
                  })}
                </td>
                <td>
                  <Link href={`/post/${post.id}`}>→</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
