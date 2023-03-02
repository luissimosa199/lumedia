import Link from "next/link";
import { FunctionComponent, Key } from "react";

interface PostCardProps {
  post: {
    id: Key;
    title: String;
    authorName: String;
    createAt: Date;
    tags: String[];
  };
}

const PostCard: FunctionComponent<PostCardProps> = ({ post }) => {
  return (
    <div className="flex rounded-sm p-2 text-sm shadow-md bg-white" key={post.id}>
      <div className="grow">
        <h2 className='font-semibold'>{post.title}</h2>
        <p>Autor: {post.authorName}</p>
        <p>{`${post.createAt.toLocaleDateString()}`}</p>
        <div>
          <ul className="flex gap-1 text-xs">
            {post.tags.map((tag, idx) => {
              return <li className='bg-grey rounded p-1' key={idx}>{tag}</li>;
            })}
          </ul>
        </div>
      </div>

      <div>
        <Link href={`/post/${post.id}`}>→</Link>
      </div>
    </div>
  );
};

export default PostCard;
