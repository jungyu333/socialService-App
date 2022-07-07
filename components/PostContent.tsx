import Link from "next/link";
import React from "react";

function PostContent({ postData }) {
  return (
    <div>
      {postData?.split(/(#[^\s#]+)/g).map((hash, index) => {
        if (hash.match(/(#[^\s#]+)/)) {
          return (
            <Link key={index} href={`/hashtag/${hash.slice(1)}`}>
              <a className="text-indigo-400">{hash}</a>
            </Link>
          );
        }
        return hash;
      })}
    </div>
  );
}

export default PostContent;
