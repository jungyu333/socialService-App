import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";

const Profile = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>마이페이지 | Social Service</title>
      </Head>
      <Layout>
        <div>Profile</div>
      </Layout>
    </>
  );
};
export default Profile;
