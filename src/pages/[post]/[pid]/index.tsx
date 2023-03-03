import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;

  const { data, error, isLoading } = api.post.getOne.useQuery({
    id: pid as string,
  });

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
    <article className="mx-auto my-2 w-2/3 rounded p-2 shadow-md">
      <h1 className="mb-5 text-3xl font-semibold">{data?.title}</h1>
      <p className="text-sm italic">
        Publicado: {`${data?.createAt.toLocaleDateString()}`}
      </p>
      <p className="text-sm italic">Por: {data?.authorName}</p>
      <div className="my-6 text-left">
        <p>
          {data?.content.split("\n\n").map((e, idx) => {
            return (
              <p className="my-2 leading-relaxed" key={idx}>
                {e}
              </p>
            );
          })}
        </p>
      </div>
      <div className="flex">
        <ul className="flex gap-1 text-xs grow">
          {data?.tags.map((tag, idx) => {
            return (
              <li className="rounded bg-grey p-1 font-semibold h-fit" key={idx}>
                {tag}
              </li>
            );
          })}
        </ul>
        <div className="flex">
          <button className="mr-2 rounded bg-darker-blue px-4 py-2 text-white transition-all hover:opacity-50">
            <Link href={`/post/${pid}/edit`}>Editar</Link> 
          </button>
          <button className="px-4 py-2 border-2 rounded transition-all hover:opacity-50">
            Borrar
          </button>
        </div>
      </div>
    </article>
  );
};

export default Post;
