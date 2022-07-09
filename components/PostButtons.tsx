import {
  CommentOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartTwoTone,
} from "@ant-design/icons";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import tw from "tailwind-styled-components";
import {
  addLikeRequestAction,
  postDeleteRequestAction,
  removeLikeRequestAction,
} from "../action/postActions";
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

function PostButtons({ postId, Likers, setCommentOpened }) {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.userReducer);

  const onClickComment = () => {
    if (!me) {
      alert("로그인이 필요합니다.");
    } else {
      setCommentOpened((prev) => !prev);
    }
  };
  const onClickDeletePost = () => {
    dispatch(postDeleteRequestAction(postId));
  };

  const onClickLike = () => {
    if (!me) {
      alert("로그인이 필요합니다.");
    } else {
      dispatch(addLikeRequestAction(postId));
    }
  };

  const onClickUnLike = () => {
    if (!me) {
      alert("로그인이 필요합니다.");
    } else {
      dispatch(removeLikeRequestAction(postId));
    }
  };
  const isLike = Likers.find((like) => like.id === me?.id);
  console.log(isLike);
  return (
    <ButtonWrapper>
      <IconBox onClick={onClickDeletePost}>
        <DeleteOutlined />
      </IconBox>

      {isLike ? (
        <IconBox onClick={onClickUnLike}>
          <HeartTwoTone twoToneColor="#eb2f96" />
        </IconBox>
      ) : (
        <IconBox onClick={onClickLike}>
          <HeartOutlined />
        </IconBox>
      )}
      <IconBox onClick={onClickComment}>
        <CommentOutlined />
      </IconBox>
    </ButtonWrapper>
  );
}

export default PostButtons;
