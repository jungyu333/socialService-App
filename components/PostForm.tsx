import { PlusSquareOutlined } from "@ant-design/icons";
import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import tw from "tailwind-styled-components";
import { addPostAction } from "../action/actions";

const Wrapper = tw.div`
  max-w-sm
  mx-auto
  sm:max-w-md
  mt-10
`;

const FormContainer = tw.form`
  space-y-1
`;

const TextArea = tw.textarea`
  w-full
  p-2
  focus:outline-none
  focus:ring-2
  focus:ring-indigo-500
  rounded-md
  border-[1px]
  border-gray-400
  
`;

const SubmitButtonContainer = tw.div`
  flex
  items-center
  justify-between
`;

const SubmitButton = tw.button`
  bg-indigo-400
  hover:bg-indigo-600
  text-white
  p-2
  px-4
  rounded-md
`;

const PlusPhoto = tw(PlusSquareOutlined)`
  text-indigo-400
  hover:text-indigo-700
  text-3xl
  cursor-pointer
`;

const ImageInput = tw.input`
  hidden
`;

interface ValidForm {
  content: string;
}
function PostForm() {
  const dispatch = useDispatch();
  const photoInput = useRef<HTMLInputElement>();
  const { register, handleSubmit, reset } = useForm<ValidForm>();
  const onClickPhoto = useCallback(() => {
    photoInput.current.click();
  }, [photoInput.current]);
  const onValid = (ValidForm: ValidForm) => {
    dispatch(addPostAction());

    reset();
  };
  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit(onValid)}>
        <TextArea {...register("content")} rows={4} />
        <SubmitButtonContainer>
          <PlusPhoto onClick={onClickPhoto} />
          <ImageInput type="file" ref={photoInput} />
          <SubmitButton>짹짹</SubmitButton>
        </SubmitButtonContainer>
      </FormContainer>
    </Wrapper>
  );
}

export default PostForm;
