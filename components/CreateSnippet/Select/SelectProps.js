import { components } from "react-select";
import FileExtension from "../../Display/FileExtension";
import CodeSnippetsCounter from "../../Folders/CodeFolders/CodeSnippetsCounter";

const { Option, SingleValue } = components;

export const OptionFileExt = (props) => (
  <Option {...props}>
    <div className="flex items-center gap-2">
      {props.data.subFolderId && (
        <CodeSnippetsCounter id={props.data.subFolderId} />
      )}

      <div className="w-full font-semibold text-[14px]">{props.data?.label}</div>

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
  </Option>
);

export const ValueFileExt = (props) => (
  <SingleValue {...props}>
    <div className="flex items-center gap-2">
      {props.data.subFolderId && (
        <CodeSnippetsCounter id={props.data.subFolderId} />
      )}

      <div className="w-full font-semibold text-[14px]">{props.data?.label}</div>

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
