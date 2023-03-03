import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

const editPost: FunctionComponent = () => {
  const router = useRouter();
  const { pid } = router.query;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const { data, error, isLoading } = api.post.getOne.useQuery(
    {
      id: pid as string,
    },
    {
      onSuccess(data) {
        console.log("success");
        reset({
          title: data?.title as string,
          content: data?.content as string,
          tags: data?.tags.join(", "),
        });
      },
    }
  );

  const updatePost = api.post.update.useMutation({
    onSuccess: () => {
      alert("post updated");
    },
  });

  const onSubmit = (inputData: any) => {
    const processedData = {
      id: pid as string,
      title: inputData.title,
      content: inputData.content,
      tags: inputData.tags.split(", "),
      authorName: inputData.author,
    };

    updatePost.mutate(processedData);
  };

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
    <div className="mx-auto my-2 flex w-2/3 flex-col rounded p-2 shadow-md">
      <h1 className="mb-2 text-center text-2xl font-bold">
        Editar publicación
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="mb-5 p-2 text-lg font-semibold shadow-md"
          type="text"
          {...register("title")}
        />
        <input
          className="w-fit p-2 text-sm italic"
          type="text"
          value={data?.authorName}
          {...register("authorName")}
          disabled
        />
        <textarea
          className="my-6 p-2 text-left shadow-md"
          id="content"
          {...register("content")}
          rows={15}
        ></textarea>

        <input
          type="text"
          className="mb-2 w-fit p-2 text-sm italic"
          {...register("tags")}
        />

        <div className="flex">
          <button
            type="submit"
            className="mr-2 grow rounded bg-darker-blue px-4 py-2 text-white transition-all hover:opacity-50"
          >
            Guardar
          </button>
          <button
            type="button"
            className="grow rounded border-2 px-4 py-2 transition-all hover:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default editPost;
