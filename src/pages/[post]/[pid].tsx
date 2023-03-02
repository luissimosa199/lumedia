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
    <article className="mx-auto w-2/3 rounded p-2 shadow-md">
      <h1 className="mb-5 text-3xl font-semibold">{data?.title}</h1>
      <p className="text-sm italic">Publicado: {`${data?.createAt.toLocaleDateString()}`}</p>
      <p className="text-sm italic">Por: {data?.authorName}</p>
      <div className="text-center">
        <p>{data?.content}</p>
      </div>
      <ul className="flex gap-1 text-xs">
        {data?.tags.map((tag, idx) => {
          return (
            <li className="rounded bg-grey p-1 font-semibold" key={idx}>
              {tag}
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default Post;
