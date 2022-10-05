import { components } from "react-select";

const { Option, SingleValue } = components;

export const OptionFileExt = (props) => (
  <Option {...props}>
    <div className="flex items-center gap-2">
      {props.data.language?.fileExtension?.label && (
        <div className="w-12">
          <p className="extensionBadge ">
            {props.data.language.fileExtension?.label}
          </p>
        </div>
      )}
      <div className="w-full">{props.data?.label}</div>
      <div className="flex gap-2 justify-between items-center">
        {props.data.language?.acc ? (
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
      {props.data.language?.fileExtension?.label && (
        <div className="w-12">
          <p className="extensionBadge">
            {props.data.language.fileExtension?.label}
          </p>
        </div>
      )}
      <div className="w-full">{props.data?.label}</div>
      <div className="flex gap-2 justify-between items-center">
        {props.data.folder?.language?.acc.accId ? (
                    <div
                    className={`${props.data.folder?.language.classTree} lBadge rounded-3xl flex justify-center items-center`}
                  >
                    <p className="text-xs MonoHeading font-semibold lowercase">
                      {props.data.folder.language?.label}
                    </p>
                    </div>
        ) : (
          <div
            className={`${props.data.folder?.mainFolder?.language.classTree} lBadge rounded-3xl flex justify-center items-center`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase">
              {props.data.folder?.mainFolder?.language.label}
            </p>
          </div>
        )}
      </div>
    </div>
  </SingleValue>
);
