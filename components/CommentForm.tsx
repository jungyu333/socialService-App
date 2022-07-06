import React from "react";
import { PostProps } from "./PostCard";
import tw from "tailwind-styled-components";
import { SendOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { addCommentRequestAction } from "../action/postActions";

const Wrapper = tw.div`
  max-w-sm
  sm:max-w-md
  mx-auto
  w-full
  flex-col
`;
const TextArea = tw.textarea`
  w-full
  p-2
  mt-2
  border-[1px]
  border-gray-400
  rounded-md
  focus:outline-none
  focus:ring-1
  focus:ring-indigo-600
  text-sm
  text-gray-500
  scrollbar-hide
`;

const SubmitButton = tw.button`
  hover:text-indigo-600
  text-lg
  pl-1
  -mt-2
`;

interface ValidForm {
  content: string;
}
function CommentForm(post: PostProps) {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.userReducer.me);
  const { register, handleSubmit, reset } = useForm<ValidForm>();
  const onValid = ({ content }: ValidForm) => {
    dispatch(
      addCommentRequestAction({ content: content, postId: post.id, userId: id })
    );
    reset();
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <TextArea
          {...register("content", { required: "내용을 입력해주세요" })}
          rows={3}
        />
        <SubmitButton>
          <SendOutlined />
        </SubmitButton>
      </form>
    </Wrapper>
  );
}

export default CommentForm;
