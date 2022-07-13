import { UserAddOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch } from "react-redux";
import tw from "tailwind-styled-components";
import { removeMyFollowingRequestAction } from "../action/userAction";

const Container = tw.div`
  flex 
  items-center 
  justify-between
  shadow-md
  bg-gray-100
  h-24
  px-4
  my-10
`;

const Image = tw.div`
  bg-slate-500
  rounded-full
  w-12
  h-12
`;

const Avatar = tw.img`
  rounded-full
  w-12
  h-12
`;
interface followerProps {
  id: number;

  nickname: string;
  avatar: string;
}

function FollowCard(follower: followerProps) {
  const dispatch = useDispatch();
  const onClickUnFollow = () => {
    dispatch(removeMyFollowingRequestAction(follower.id));
  };

  return (
    <Container>
      <div className="flex space-x-3 items-center">
        {follower.avatar === "null" ? (
          <Image />
        ) : (
          <Avatar src={`http://localhost:4000/${follower?.avatar}`} />
        )}
        <div className="text-lg font-bold">{follower.nickname}</div>
      </div>
      <button
        onClick={onClickUnFollow}
        className="flex items-center text-sm text-gray-500 hover:text-indigo-700"
      >
        <UserAddOutlined />
        UnFollow
      </button>
    </Container>
  );
}

export default FollowCard;
