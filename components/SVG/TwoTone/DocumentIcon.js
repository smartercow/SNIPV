import { Icon } from "@chakra-ui/react";

export const DocumentIcon = ({ fill, size, height, width, ...props }) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        opacity="0.4"
        d="M15.7162 16.2234H8.4962"
        stroke="#200E32"
        strokeWidth="1.5"
        strokLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M15.7162 12.0369H8.4962"
        stroke="#200E32"
        strokeWidth="1.5"
        strokLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M11.2513 7.86011H8.4963"
        stroke="#200E32"
        strokeWidth="1.5"
        strokLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9086 2.74976C15.9086 2.74976 8.2316 2.75376 8.2196 2.75376C5.4596 2.77076 3.7506 4.58676 3.7506 7.35676V16.5528C3.7506 19.3368 5.4726 21.1598 8.2566 21.1598C8.2566 21.1598 15.9326 21.1568 15.9456 21.1568C18.7056 21.1398 20.4156 19.3228 20.4156 16.5528V7.35676C20.4156 4.57276 18.6926 2.74976 15.9086 2.74976Z"
        stroke="#200E32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
