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
import AvatarInput from "../components/AvatarInput";

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
      if (!avatarPaths) {
        dispatch(signUpRequestAction({ email, name, password }));
      } else {
        const formData = new FormData();
        formData.append("avatar", avatarPaths);
        formData.append("email", email);
        formData.append("name", name);
        formData.append("password", password);

        dispatch(signUpRequestAction(formData));
      }
    }
  };

  useEffect(() => {
    if (signUpDone) {
      router.replace("/signin");
    }
  }, [signUpDone]);

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
            <AvatarInput />
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
