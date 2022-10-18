import { components } from "react-select";
import FileExtension from "../../Display/FileExtension";
import CodeFoldersCounter from "../../Folders/CodeFolders/CodeFoldersCounter";
import ErrorFoldersCounter from "../../Folders/ErrorFolders/ErrorFoldersCounter";
import CodeSnippetsCounter from "../../Folders/CodeFolders/CodeSnippetsCounter";
import ErrorSnippetsCounter from "../../Folders/ErrorFolders/ErrorSnippetsCounter";

const { Option, SingleValue } = components;

export const ValueFileExt = (props) => (
  <SingleValue {...props}>
    <div className="flex items-center gap-2">
      {props.data?.rootDirectory == "main" && (
        <>
          {props.data?.folderSnippetType == "code" && (
            <CodeFoldersCounter id={props.data.mainFolderId} />
          )}

          {props.data?.folderSnippetType == "error" && (
            <ErrorFoldersCounter id={props.data.mainFolderId} />
          )}
        </>
      )}

      {props.data?.subFolderId && (
        <>
          {props.data?.folderSnippetType == "code" && (
            <CodeSnippetsCounter id={props.data.subFolderId} />
          )}

          {props.data.folderSnippetType == "error" && (
            <ErrorSnippetsCounter id={props.data.subFolderId} />
          )}
        </>
      )}

      <div className="text-[15px]">{props.data?.label}</div>

      {props.data.language?.fileExtension?.label && (
        <div className="fileExtBadge bg-[#ECF4FF] rounded-3xl flex justify-center items-center">
          <p className="text-black text-xs MonoHeading font-semibold lowercase">
            {props.data.language.fileExtension?.label}
          </p>
        </div>
      )}

      <div className="flex gap-2 justify-between items-center">
        {props.data.language?.acc?.accId ? (
          <div
            className={`${props.data.language.acc.classTree} lBadge rounded-3xl flex justify-center items-center`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase">
              {props.data.language.acc?.label}
            </p>
          </div>
        ) : (
          <div
            className={`${props.data.language?.classTree} lBadge rounded-3xl flex justify-center items-center`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase">
              {props.data.language?.label}
            </p>
          </div>
        )}
      </div>
    </div>
  </SingleValue>
);

export const OptionFileExt = (props) => (
  <Option {...props}>
    <div className="flex items-center gap-2">
      {props.data?.rootDirectory == "main" && (
        <>
          {props.data?.folderSnippetType == "code" && (
            <CodeFoldersCounter id={props.data.mainFolderId} />
          )}

          {props.data?.folderSnippetType == "error" && (
            <ErrorFoldersCounter id={props.data.mainFolderId} />
          )}
        </>
      )}

      {props.data?.subFolderId && (
        <>
          {props.data?.folderSnippetType == "code" && (
            <CodeSnippetsCounter id={props.data.subFolderId} />
          )}

          {props.data?.folderSnippetType == "error" && (
            <ErrorSnippetsCounter id={props.data.subFolderId} />
          )}
        </>
      )}

      <div className="w-full text-[15px]">{props.data?.label}</div>

      {props.data.language?.fileExtension?.label && (
        <div className="fileExtBadge bg-[#ECF4FF] rounded-3xl flex justify-center items-center">
          <p className="text-black text-xs MonoHeading font-semibold lowercase">
            {props.data.language.fileExtension?.label}
          </p>
        </div>
      )}

      <div className="flex gap-2 justify-between items-center">
        {props.data.language?.acc?.accId ? (
          <div
            className={`${props.data.language.acc.classTree} lBadge rounded-3xl flex justify-center items-center`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase whitespace-nowrap">
              {props.data.language.acc?.label}
            </p>
          </div>
        ) : (
          <div
            className={`${props.data.language?.classTree} lBadge rounded-3xl flex justify-center items-center`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase whitespace-nowrap">
              {props.data.language?.label}
            </p>
          </div>
        )}
      </div>
    </div>
  </Option>
);
