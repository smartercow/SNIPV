import { components } from "react-select";
import FoldersCounter from "../../Folders/FoldersLoad/FoldersCounter";
import SNIPCounter from "../../Folders/FoldersLoad/SNIPCounter";

const { Option, SingleValue } = components;

export const ValueFileExt = (props) => (
  <SingleValue {...props}>
    <div className="flex items-center gap-2">
      {props.data?.rootDirectory == "main" && (
        <>
          <FoldersCounter id={props.data.mainFolderId} />
        </>
      )}

      {props.data?.subFolderId && (
        <>
          <SNIPCounter id={props.data.subFolderId} />
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
          <FoldersCounter id={props.data.mainFolderId} />
        </>
      )}

      {props.data?.subFolderId && (
        <>
          <SNIPCounter id={props.data.subFolderId} />
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
