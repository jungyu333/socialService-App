import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import {
  avatarDeleteAction,
  avatarUploadRequestAction,
} from "../action/userAction";
import { RootState } from "../reducers";

const PreAvatar = tw.img`
  rounded-full
  w-16
  h-16
`;

const Avatar = tw.img`
 bg-slate-500
  w-16
  h-16
  rounded-full
`;

const InputAvatar = tw.input`
  hidden
`;

const AvatarButton = tw.div`
  cursor-pointer
  text-sm
  text-gray-500
  hover:text-indigo-600
  hover:font-bold
  border-2
  rounded-md
  p-2
`;

function AvatarInput() {
  const avatarInput = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const onClickAvater = useCallback(() => {
    avatarInput.current.click();
  }, [avatarInput.current]);

  const onChangeAvatar = (e) => {
    const avatarFormData = new FormData();
    [].forEach.call(e.target.files, (file) => {
      avatarFormData.append("avatar", file);
    });
    dispatch(avatarUploadRequestAction(avatarFormData));
    e.target.value = "";
  };

  const onClickDeleteAvatar = () => {
    dispatch(avatarDeleteAction());
  };

  useEffect(() => {
    dispatch(avatarDeleteAction());
  }, []);

  const { avatarPaths, me } = useSelector(
    (state: RootState) => state.userReducer
  );

  return (
    <>
      <div className="flex items-center space-x-3">
        {avatarPaths !== "null" ? (
          <PreAvatar src={`http://localhost:4000/${avatarPaths}`} />
        ) : (
          <Avatar />
        )}

        {avatarPaths === "null" ? (
          <AvatarButton onClick={onClickAvater}>이미지</AvatarButton>
        ) : (
          <AvatarButton onClick={onClickDeleteAvatar}>초기화</AvatarButton>
        )}
      </div>
      <InputAvatar
        name="avatar"
        type="file"
        ref={avatarInput}
        onChange={onChangeAvatar}
      />
    </>
  );
}

export default AvatarInput;
