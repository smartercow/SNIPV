import React from "react";

const FileExtension = ({ snippet }) => {
  return (
    <div className="px-2 py-1 bg-[#EDF2F7]">
      <p className="text-black text-xs MonoHeading font-semibold lowercase">
        {snippet.folder?.language?.fileExtension?.label}
      </p>
    </div>
  );
};

export default FileExtension;
