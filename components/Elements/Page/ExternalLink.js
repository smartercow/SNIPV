import Link from "next/link";
import React from "react";
import { CgExternal } from "react-icons/cg";

const ExternalLink = ({ snippet }) => {
  return (
    <div className="linkSection bg-[#EFF2FB] px-4 py-1 ">
      {snippet.linkHeading && (
        <div>
          <p className="font-semibold">{snippet.linkHeading}</p>
        </div>
      )}

      {snippet.link && (
        <div>
          <Link href={snippet.link}>
            <a
              target="_blank"
              className="text-[#0072F5] underline underline-offset-4 text font-semibold text-lg"
            >
              {snippet.link}
              <span className="text-blue-500">
                <CgExternal />
              </span>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExternalLink;
