import React from "react";

const LanguageBadge = ({ snippets }) => {
  return (
    <>
      <div className="flex gap-2">
        {snippets?.folder?.mainFolder?.language?.langId && (
          <div
            className={`${snippets?.folder?.mainFolder?.language?.classTree} lBadge rounded-3xl flex justify-center items-center`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase">
              {snippets.folder?.mainFolder?.language?.label}
            </p>
          </div>
        )}

        {snippets?.folder?.language?.acc?.accId && (
          <div
            className={`${snippets?.folder?.language?.acc?.classTree} lBadge rounded-3xl flex justify-center items-center`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase">
              {snippets?.folder?.language?.acc?.label}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageBadge;
