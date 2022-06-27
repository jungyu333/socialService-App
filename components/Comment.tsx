import React from "react";
import tw from "tailwind-styled-components";

interface CommentProps {
  User: {
    name: string;
  };
  content: string;
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
        <Avatar />
        <CommentBox>
          <Name>{comment.User.name}</Name>
          <Content>{comment.content}</Content>
        </CommentBox>
      </CommentContainer>
    </Wrapper>
  );
}

export default Comment;
