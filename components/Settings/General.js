import { Button, Input, Text, Tooltip } from "@nextui-org/react";
import React from "react";
import { BsQuestionCircleFill } from "react-icons/bs";

const General = () => {
  return (
    <div>
      <div>
        <Text h4>General</Text>
      </div>
      <hr />
      <div className="flex flex-col gap-4 my-2">
        <div>
          <div className="flex gap-1">
            <Text>Domain</Text>
            <Tooltip
              content={
                <Text color="white">
                  Din hosting domain uden &nbsp;
                  <Text b color="error">
                    https://www&nbsp;
                  </Text>
                </Text>
              }
              color="primary"
              keepMounted="true"
              css={{ zIndex: 999999 }}
              className="mt-1"
            >
              <Text h5 color="primary">
                <BsQuestionCircleFill />
              </Text>
            </Tooltip>
          </div>
          <div>
            <Input
              aria-label="domain"
              bordered
              labelLeft="https://"
              placeholder="snipv.vercel.app"
              width="40vw"
            />
          </div>
        </div>
        
        <div>
          <div className="flex gap-1">
            <Text>Github repository</Text>
            <Tooltip
              content={<Text color="white">Link til din forked Github repository</Text>}
              color="primary"
              keepMounted="true"
              css={{ zIndex: 999999 }}
              className="mt-1"
            >
              <Text h5 color="primary">
                <BsQuestionCircleFill />
              </Text>
            </Tooltip>
          </div>
          <div>
            <Input
              aria-label="domain"
              bordered
              placeholder="https://github.com/smartercow/SNIPV"
              width="40vw"
            />
          </div>
        </div>

        <div>
            <Button>Gem</Button>
        </div>
      </div>
    </div>
  );
};

export default General;