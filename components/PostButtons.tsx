import {
  CommentOutlined,
  DeleteOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import tw from "tailwind-styled-components";
import { postDeleteRequestAction } from "../action/postActions";
import { RootState } from "../reducers";

const ButtonWrapper = tw.div`
  flex
  justify-between
  border-t-[1px]
  border-gray-400
  h-9
  pt-2
  mt-2
`;

const IconBox = tw.div`
  w-1/3
  text-center
  text-lg
  h-full
  hover:shadow-sm
  flex
  items-center
  justify-center
  cursor-pointer
  hover:text-indigo-600
  
`;

function PostButtons({ postId, setCommentOpened }) {
  const dispatch = useDispatch();

  const onClickComment = () => {
    setCommentOpened((prev) => !prev);
  };
  const onClickDeletePost = () => {
    dispatch(postDeleteRequestAction(postId));
  };

  return (
    <ButtonWrapper>
      <IconBox onClick={onClickDeletePost}>
        <DeleteOutlined />
      </IconBox>

      <IconBox>
        <HeartOutlined />
      </IconBox>
      <IconBox onClick={onClickComment}>
        <CommentOutlined />
      </IconBox>
    </ButtonWrapper>
  );
}

export default PostButtons;
