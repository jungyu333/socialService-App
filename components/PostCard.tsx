import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Comment from "./Comment";
import PostImage from "../components/PostImage";

import CommentForm from "./CommentForm";
import PostButtons from "./PostButtons";
import PostContent from "./PostContent";
import Link from "next/link";

const Wrapper = tw.div`
  max-w-sm
  mx-auto
  sm:max-w-md
  border-2
  shadow-sm
  flex-col
  justify-center
  mt-4
  mb-2
`;

const ContentWrapper = tw.div`
  p-2
  w-full
`;

const ContentContainer = tw.div`
  flex
  items-center
  space-x-4
  w-full
`;

const Avatar = tw.div`
  bg-slate-500
  rounded-full
  w-12
  h-12
`;

const ContentInfo = tw.div`
  flex-col
  justify-start
  space-y-2
  items-start
  w-full
`;

const Name = tw.div`
  text-lg
  font-bold
`;

const CommentCount = tw.div`
  text-sm
  text-gray-500
  mt-2
`;

export interface PostProps {
  id: number;
  User: { id: number; nickname: string; avatar: string };
  UserId: number;
  content: string;
  Comments: {
    id: number;
    User: {
      id: number;
      avatar: string;
      nickname: string;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
    PostId: number;
  }[];
  Images: {
    id: number;
    src: string;
    createdAt: string;
    updatedAt: string;
    PostId: number;
  }[];
  Likers: { id: number }[];
  createdAt: string;
  updatedAt: string;
}

function PostCard(post: PostProps) {
  const [commentOpened, setCommentOpened] = useState(false);

  return (
    <Wrapper>
      {post.Images?.length > 0 ? <PostImage images={post.Images} /> : null}
      <ContentWrapper>
        <ContentContainer>
          <div>
            {!post.User?.avatar || post.User?.avatar === "null" ? (
              <Avatar />
            ) : (
              <img
                className="rounded-full w-12 h-12"
                src={`http://localhost:4000/${post.User.avatar}`}
              />
            )}
          </div>
          <ContentInfo>
            <Link href={`/user/${post.UserId}`}>
              <a>
                <Name>{post.User?.nickname}</Name>
              </a>
            </Link>

            <PostContent postData={post.content} />
          </ContentInfo>
        </ContentContainer>
        <PostButtons
          postId={post.id}
          Likers={post.Likers}
          setCommentOpened={setCommentOpened}
        />
        {commentOpened ? (
          <>
            <CommentForm {...post} />
            <div className="flex space-x-2">
              <CommentCount>{post.Comments.length} 개의 댓글</CommentCount>
              <div className=" text-sm text-gray-500 mt-2">
                {post.Likers.length} 개의 좋아요
              </div>
            </div>

            {post.Comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </>
        ) : null}
      </ContentWrapper>
    </Wrapper>
  );
}

export default PostCard;
