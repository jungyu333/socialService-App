import React from "react";
import tw from "tailwind-styled-components";

interface CommentProps {
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
}

const Wrapper = tw.div`
  max-w-sm
  sm:max-w-md
  mx-auto
`;

const CommentContainer = tw.div`
  mt-3
  pt-3
  flex
  items-center
  space-x-4
  border-t-[1px]
  border-gray-300
`;

const Avatar = tw.div`
  bg-slate-500
  w-10
  h-10
  rounded-full
`;

const CommentBox = tw.div`
  flex-col
  space-y-1
`;

const Name = tw.div`
  text-lg
  font-bold
`;

const Content = tw.div`
  text-sm
  text-gray-500
`;
function Comment(comment: CommentProps) {
  return (
    <Wrapper>
      <CommentContainer>
        {comment.User.avatar ? (
          <img
            className="w-10 h-10 rounded-full"
            src={`http://localhost:4000/${comment.User.avatar}`}
          />
        ) : (
          <Avatar />
        )}
        <CommentBox>
          <Name>{comment.User.nickname}</Name>
          <Content>{comment.content}</Content>
        </CommentBox>
      </CommentContainer>
    </Wrapper>
  );
}

export default Comment;
