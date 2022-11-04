import NextLink from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { TagsInput } from "react-tag-input-component";
import { InfoSquareIcon } from "../../../SVG/InfoSquareIcon";

const Tags = ({ id, dataFetched, tags, setTagInputValues }) => {
  return (
    <div>
      <div className="w-full flex gap-2 items-center">
        <div className="w-full">
          {!id && (
            <TagsInput
              value={tags}
              onChange={setTagInputValues}
              name="tags"
              placeHolder="Skriv og tryk ENTER"
            />
          )}

          {dataFetched && (
            <TagsInput
              value={tags}
              onChange={setTagInputValues}
              name="tags"
              placeHolder="Skriv og tryk ENTER"
            />
          )}
        </div>

        <Popover>
          <PopoverTrigger>
            <IconButton
              variant="ghost"
              icon={
                <Icon as={InfoSquareIcon} fill="Primary" height={8} width={8} />
              }
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <NextLink href="/info/help/tags" passHref>
                <Link isExternal fontSize={15} color="Primary">
                  Læs hvordan man skriver søgbare tags{" "}
                  <ExternalLinkIcon w={3} h={3} />
                </Link>
              </NextLink>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Tags;
