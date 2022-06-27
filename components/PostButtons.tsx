import {
  CommentOutlined,
  DeleteOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import tw from "tailwind-styled-components";

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

function PostButtons({ setCommentOpened }) {
  const onClickComment = () => {
    setCommentOpened((prev) => !prev);
  };
  return (
    <ButtonWrapper>
      <IconBox>
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
