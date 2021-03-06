import React from "react";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { RootState } from "../reducers";

const Wrapper = tw.div`
  hidden
  absolute
  xl:flex 
  top-10
  left-10
`;

const ProfileWrapper = tw.div`
  w-96
  bg-gray-100
  h-48
  shadow-md
  flex-col
  items-center
  space-y-5
`;

const ProfileContainer = tw.div`
  flex
  space-x-5
  items-center
  justify-start
  px-4
  mt-8
`;

const Avatar = tw.img`
  w-20
  h-20
  rounded-full
  shadow-sm
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

const InfoContainer = tw.div`
  flex
  justify-center
`;

const InfoBox = tw.div`
  w-full
  flex-col
  justify-between
  items-center
  text-center
`;

function MyProfile() {
  const { me } = useSelector((state: RootState) => state.userReducer);
  return (
    <>
      <Wrapper>
        {me ? (
          <>
            <ProfileWrapper>
              <ProfileContainer>
                {me?.avatar === "null" ? (
                  <Image />
                ) : (
                  <Avatar src={`http://localhost:4000/${me?.avatar}`} />
                )}
                <UserInfo>
                  <UserName>{me?.nickname}</UserName>
                </UserInfo>
              </ProfileContainer>
              <InfoContainer>
                <InfoBox>
                  <div>게시물</div>
                  {me?.Posts?.length}
                </InfoBox>
                <InfoBox>
                  <div>팔로잉</div>
                  {me?.Followings?.length}
                </InfoBox>
                <InfoBox>
                  <div>팔로워</div>
                  {me?.Followers?.length}
                </InfoBox>
              </InfoContainer>
            </ProfileWrapper>
          </>
        ) : null}
      </Wrapper>
    </>
  );
}

export default MyProfile;
