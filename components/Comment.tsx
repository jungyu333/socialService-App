import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { commentRemoveRequestAction } from "../action/postActions";
import { RootState } from "../reducers";

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
  flex
  justify-between
  w-full
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
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.userReducer);
  const onClickCommentRemove = () => {
    dispatch(
      commentRemoveRequestAction({
        commentId: comment.id,
        postId: comment.PostId,
      })
    );
  };
  return (
    <Wrapper>
      <CommentContainer>
        {!comment.User.avatar || comment.User.avatar === "null" ? (
          <Avatar />
        ) : (
          <img
            className="w-10 h-10 rounded-full"
            src={`http://localhost:4000/${comment.User.avatar}`}
          />
        )}
        <CommentBox>
          <div className="w-3/4 space-y-2">
            <Name>{comment.User.nickname}</Name>
            <Content>{comment.content}</Content>
          </div>
          {me?.id === comment.UserId ? (
            <div className="flex text-xs items-start text-gray-400 space-x-1">
              <button onClick={onClickCommentRemove}>삭제</button>
            </div>
          ) : null}
        </CommentBox>
      </CommentContainer>
    </Wrapper>
  );
}

export default Comment;
