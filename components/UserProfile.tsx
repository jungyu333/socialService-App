import { UserAddOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { userFollowRequestAction } from "../action/userAction";
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
  
  flex
  items-center
  w-full
  justify-between
`;

const Follow = tw.button`
  text-sm
  text-gray-500
  hover:text-indigo-700
  flex 
  justify-end
  items-center
  w-2/4
  
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

function UserProfile() {
  const { userInfo, me } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const isFollowed = me?.Followings.find((user) => user.id === userInfo.id);
  const onClickButton = () => {
    if (!isFollowed) {
      dispatch(userFollowRequestAction(userInfo.id));
    } else {
      console.log("unfollow");
    }
  };

  return (
    <>
      <Wrapper>
        {userInfo ? (
          <>
            <ProfileWrapper>
              <ProfileContainer>
                {userInfo?.avatar === "null" ? (
                  <Image />
                ) : (
                  <Avatar src={`http://localhost:4000/${userInfo?.avatar}`} />
                )}
                <UserInfo>
                  <UserName>{userInfo?.nickname}</UserName>
                  {me ? (
                    <>
                      {!isFollowed ? (
                        <>
                          <Follow onClick={onClickButton}>
                            <UserAddOutlined />
                            Follow
                          </Follow>
                        </>
                      ) : (
                        <Follow onClick={onClickButton}>
                          <UserAddOutlined />
                          UnFollow
                        </Follow>
                      )}
                    </>
                  ) : null}
                </UserInfo>
              </ProfileContainer>
              <InfoContainer>
                <InfoBox>
                  <div>게시물</div>
                  {userInfo?.Posts?.length}
                </InfoBox>
                <InfoBox>
                  <div>팔로잉</div>
                  {userInfo?.Followings?.length}
                </InfoBox>
                <InfoBox>
                  <div>팔로워</div>
                  {userInfo?.Followers?.length}
                </InfoBox>
              </InfoContainer>
            </ProfileWrapper>
          </>
        ) : null}
      </Wrapper>
    </>
  );
}

export default UserProfile;
