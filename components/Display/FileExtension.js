import React from "react";

const FileExtension = ({ snippet }) => {
  return (
    <div className="fileExtBadge rounded-3xl flex justify-center items-center">
      <p className="text-black text-xs MonoHeading font-semibold lowercase">
        {snippet.folder?.language?.fileExtension?.label}
      </p>
    </div>
  );
};

export default FileExtension;
