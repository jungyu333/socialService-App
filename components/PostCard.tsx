import React from "react";
import tw from "tailwind-styled-components";

const Wrapper = tw.div`
  max-w-sm
  mx-auto
  sm:max-w-md
`;

function PostCard() {
  return <Wrapper>PostCard</Wrapper>;
}

export default PostCard;
