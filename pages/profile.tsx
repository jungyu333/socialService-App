import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import tw from "tailwind-styled-components";
import {
  StarOutlined,
  TwitterOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import CircleItem from "../components/CircleItem";
import { useDispatch } from "react-redux";
import { logOutRequestAction } from "../action/actions";
import { useRouter } from "next/router";

const ProfileWrapper = tw.div`
  max-w-sm
  mx-auto
  bg-gray-100
  mt-24
  h-36
  shadow-md
  flex
  items-center
  sm:max-w-lg
`;

const ProfileContainer = tw.div`
  flex
  space-x-5
  items-center
  px-4
`;

const Image = tw.div`
  bg-slate-700
  rounded-full
  w-20
  h-20
  shadow-sm
`;

const UserInfo = tw.div`
  space-y-2
`;

const UserName = tw.div`
  text-2xl
  font-bold
`;

const ButtonContainer = tw.div`
  flex
  text-sm
  space-x-3
`;

const Button = tw.button`
  border
  rounded-md
  p-2
  bg-indigo-400
  hover:bg-indigo-600
  hover:text-white
`;

const CommunicateWrapper = tw.div`
  max-w-sm
  mx-auto
  h-48
  flex
  justify-between
  items-center
  text-center
  sm:max-w-lg
`;

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const onClickLogOut = () => {
    dispatch(logOutRequestAction());
    router.replace("/signin");
  };
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>마이페이지 | Social Service</title>
      </Head>
      <Layout>
        <ProfileWrapper>
          <ProfileContainer>
            <Image />
            <UserInfo>
              <UserName>jungyu</UserName>
              <ButtonContainer>
                <Button>Edit Profile</Button>
                <Button onClick={onClickLogOut}>로그아웃</Button>
              </ButtonContainer>
            </UserInfo>
          </ProfileContainer>
        </ProfileWrapper>
        <CommunicateWrapper>
          <CircleItem text="내 게시물">
            <TwitterOutlined style={{ color: "white", fontSize: "24px" }} />
          </CircleItem>
          <CircleItem text="팔로잉">
            <UserAddOutlined style={{ color: "white", fontSize: "24px" }} />
          </CircleItem>
          <CircleItem text="팔로워">
            <StarOutlined style={{ color: "white", fontSize: "24px" }} />
          </CircleItem>
        </CommunicateWrapper>
      </Layout>
    </>
  );
};
export default Profile;
