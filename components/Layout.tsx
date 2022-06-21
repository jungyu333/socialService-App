import Link from "next/link";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>홈</a>
        </Link>
        <Link href="/profile">
          <a>마이페이지</a>
        </Link>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
