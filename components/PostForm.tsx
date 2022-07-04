import { PlusSquareOutlined } from "@ant-design/icons";
import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import tw from "tailwind-styled-components";
import {
  addPostRequestAction,
  postImageUploadRequestAction,
} from "../action/postActions";
import { RootState } from "../reducers";

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
  const { imagePaths } = useSelector((state: RootState) => state.postReducer);
  const dispatch = useDispatch();
  const photoInput = useRef<HTMLInputElement>();
  const { register, handleSubmit, reset } = useForm<ValidForm>();
  const onClickPhoto = useCallback(() => {
    photoInput.current.click();
  }, [photoInput.current]);
  const onValid = ({ content }: ValidForm) => {
    if (!imagePaths) {
      dispatch(addPostRequestAction({ content }));
    } else {
      const formData = new FormData();
      imagePaths.forEach((image) => {
        formData.append("image", image);
      });
      formData.append("content", content);
      dispatch(addPostRequestAction(formData));
    }
  };
  const onChangePhoto = (e) => {
    console.log(e.target.files);
    const formData = new FormData();
    [].forEach.call(e.target.files, (file) => {
      formData.append("postimg", file);
    });
    dispatch(postImageUploadRequestAction(formData));
  };

  return (
    <Wrapper>
      <FormContainer
        onSubmit={handleSubmit(onValid)}
        encType="multipart/form-data"
      >
        <TextArea {...register("content")} rows={4} />
        <SubmitButtonContainer>
          <PlusPhoto onClick={onClickPhoto} />
          <ImageInput
            multiple
            type="file"
            ref={photoInput}
            name="postimg"
            onChange={onChangePhoto}
          />
          <SubmitButton>짹짹</SubmitButton>
        </SubmitButtonContainer>
      </FormContainer>
    </Wrapper>
  );
}

export default PostForm;
