import {
  CommentOutlined,
  DeleteOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { useDispatch } from "react-redux";
import tw from "tailwind-styled-components";
import { postDeleteRequestAction } from "../action/postActions";

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
    console.log(postId);
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
