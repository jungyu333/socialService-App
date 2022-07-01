import Head from "next/head";
import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Layout from "../components/Layout";
import LogInForm from "../components/LogInForm";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { signUpRequestAction } from "../action/signUpAction";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { avatarUploadRequestAction } from "../action/userAction";

const LoginForm = tw.form`
  space-y-5
  px-16
`;

const SubmitButton = tw.button`
  text-white
  hover:bg-indigo-600
  hover:font-bold
  border
  p-2
  px-4
  mt-12
  rounded-md
  bg-indigo-400
`;

const Error = tw.div`
  text-red-500
  text-sm
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

const AvatarInput = tw.input`
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
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
}

function createuser() {
  const { signUpDone, signUpLoading, signUpError } = useSelector(
    (state: RootState) => state.signUpReducer
  );
  const dispatch = useDispatch();
  const { avatarPaths } = useSelector((state: RootState) => state.userReducer);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidForm>();
  const onValid = ({ email, name, password, passwordCheck }: ValidForm) => {
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다");
      reset({ passwordCheck: "" });
    } else {
      dispatch(signUpRequestAction({ email, name, password }));
    }
  };

  const avatarInput = useRef<HTMLInputElement>();
  const onClickAvater = useCallback(() => {
    avatarInput.current.click();
  }, [avatarInput.current]);

  const onChangeAvatar = (e) => {
    const avatarFormData = new FormData();
    [].forEach.call(e.target.files, (file) => {
      avatarFormData.append("avatar", file);
    });
    dispatch(avatarUploadRequestAction(avatarFormData));
  };

  useEffect(() => {
    if (signUpDone) {
      router.replace("/signin");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>회원가입| Social Service</title>
      </Head>
      <Layout>
        <LogInForm headTitle="회원가입" isLogIn={false}>
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

              <AvatarButton onClick={onClickAvater}>이미지</AvatarButton>
            </div>
            <AvatarInput
              name="avatar"
              type="file"
              ref={avatarInput}
              onChange={onChangeAvatar}
            />
            <Input
              register={register("email", {
                required: "Email Id를 입력해주세요",
              })}
              type="email"
              placeholder="Email ID"
            />
            <Error>{errors.email?.message}</Error>
            <Input
              register={register("name", {
                required: "닉네임을 입력해주세요",
                maxLength: {
                  value: 10,
                  message: "닉네임은 10자 이하로 입력해주세요",
                },
              })}
              type="text"
              placeholder="닉네임"
            />
            <Error>{errors.name?.message}</Error>
            <Input
              register={register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 5,
                  message: "비밀번호는 5자 이상으로 입력해주세요",
                },
              })}
              type="password"
              placeholder="Password"
            />
            <Error>{errors.password?.message}</Error>
            <Input
              register={register("passwordCheck", {
                required: "비밀번호를 다시 한번 입력해주세요",
              })}
              type="password"
              placeholder="Password Check"
            />
            <Error>{errors.passwordCheck?.message}</Error>
            <div>
              <SubmitButton>
                {signUpLoading ? "Loading..." : "회원가입"}
              </SubmitButton>
            </div>
          </LoginForm>
        </LogInForm>
      </Layout>
    </>
  );
}

export default createuser;
