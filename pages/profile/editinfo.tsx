import React, { useCallback, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import tw from "tailwind-styled-components";
import LogInForm from "../../components/LogInForm";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useDispatch } from "react-redux";
import {
  avatarDeleteAction,
  avatarEditRequestAction,
  avatarUploadRequestAction,
  editInfoRequestAction,
} from "../../action/userAction";
import { useRouter } from "next/router";
import AvatarInput from "../../components/AvatarInput";

const LoginForm = tw.form`
  space-y-4
  px-16
`;

const SubmitButton = tw.button`
  text-white
  hover:bg-indigo-600
  hover:font-bold
  border
  p-2
  px-4
  mt-8
  rounded-md
  bg-indigo-400
`;

const InputHead = tw.div`
  text-sm
  text-gray-500
  text-start
`;

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

interface ValidForm {
  nickname: string;
}

function editinfo() {
  const router = useRouter();
  const avatarInput = useRef<HTMLInputElement>();
  const { me } = useSelector((state: RootState) => state.userReducer);
  const { editLoading, editDone, editError, avatarPaths } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { register, handleSubmit, setValue } = useForm<ValidForm>();
  const dispatch = useDispatch();
  const onClickAvater = useCallback(() => {
    avatarInput.current.click();
  }, [avatarInput.current]);

  const onChangeAvatar = (e) => {
    const avatarEditFormData = new FormData();
    [].forEach.call(e.target.files, (file) => {
      avatarEditFormData.append("avataredit", file);
    });
    console.log(avatarEditFormData.get("avataredit"));
    dispatch(avatarEditRequestAction(avatarEditFormData));
    e.target.value = "";
  };

  const onClickDeleteAvatar = () => {
    dispatch(avatarDeleteAction());
  };
  useEffect(() => {
    if (me) {
      if (me.nickname) {
        setValue("nickname", me.nickname);
      }
    }
  }, [me]);

  const onValid = ({ nickname }: ValidForm) => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("avatar", avatarPaths);
    console.log(formData.get("nickname"));
    console.log(formData.get("avatar"));
    dispatch(editInfoRequestAction(formData));
    if (editDone) {
      router.push("/profile");
    }
  };

  return (
    <Layout>
      <LogInForm headTitle="회원 정보 수정">
        <LoginForm
          onSubmit={handleSubmit(onValid)}
          encType="multipart/form-data"
        >
          <div className="flex items-center space-x-3">
            {avatarPaths ? (
              <PreAvatar src={`http://localhost:4000/${avatarPaths}`} />
            ) : (
              <Avatar />
            )}

            {!avatarPaths ? (
              <AvatarButton onClick={onClickAvater}>이미지</AvatarButton>
            ) : (
              <AvatarButton onClick={onClickDeleteAvatar}>초기화</AvatarButton>
            )}
          </div>
          <InputAvatar
            name="avataredit"
            type="file"
            ref={avatarInput}
            onChange={onChangeAvatar}
          />
          <InputHead>Nick Name</InputHead>
          <Input
            register={register("nickname")}
            type="text"
            placeholder="Name"
          />

          <div>
            <SubmitButton>수정하기</SubmitButton>
          </div>
        </LoginForm>
      </LogInForm>
    </Layout>
  );
}

export default editinfo;
