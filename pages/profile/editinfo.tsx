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
  avatarEditDeleteAction,
  avatarEditRequestAction,
  editInfoRequestAction,
  myInfoLoadRequestAction,
} from "../../action/userAction";
import { useRouter } from "next/router";
import wrapper from "../../store/configureStore";
import { GetServerSideProps } from "next";
import axios from "axios";
import { END } from "redux-saga";

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
  const { me, avatarPaths, editDone } = useSelector(
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
    dispatch(avatarEditDeleteAction());
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
  };

  useEffect(() => {
    if (editDone) {
      router.push("/profile");
    }
  }, [editDone]);

  return (
    <Layout>
      <LogInForm headTitle="회원 정보 수정">
        <LoginForm
          onSubmit={handleSubmit(onValid)}
          encType="multipart/form-data"
        >
          <div className="flex items-center space-x-3">
            {me.avatar !== "null" ? (
              <PreAvatar src={`http://localhost:4000/${me.avatar}`} />
            ) : (
              <Avatar />
            )}

            {me.avatar === "null" ? (
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.common.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.common.Cookie = cookie;
    }

    store.dispatch(myInfoLoadRequestAction());
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
    };
  });

export default editinfo;
