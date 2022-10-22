import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { Loading } from "@nextui-org/react";
import Head from "next/head";
import SetupPage from "../../../components/SnippetPage/SetupPage";
import Layout from "../../../components/Display/Setup/Layout";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Syntax from "../../../components/CreateSnippet/CreateSetup/Entries/Syntax";
import parse from "html-react-parser";

const Slug = () => {
  const {
    query: { id },
  } = useRouter();

  const [snippet, setSnippet] = useState();
  const [loading, setLoading] = useState(true);

  const [ents, setEnts] = useState();

  const getSnippetData = async () => {
    const snippetDocref = doc(db, "SetupData", `${id}`);
    const snippetData = await getDoc(snippetDocref);
    setSnippet(snippetData.data());
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getSnippetData();
    }
  }, [id]);

  useEffect(() => {
    if (snippet) {
      setEnts(Object.values(snippet.entries));
    }
  }, [snippet]);

  console.log("entsXX", ents);

  return (
    <div className="">
      <Head>
        <title>{snippet?.title}&nbsp;- SNIPV</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {ents && (
        <Layout>
          <div>
            {ents.entries.map((entry, index) => (
              <Box key={index} p={2} mb={2}>
                {entry.summary && (
                  <div className="parse">{parse(entry.summary)}</div>
                )}

                {entry.codeFiles && (
                  <Tabs variant="mainTab">
                    <TabList>
                      {entry.codeFiles.map((e, index) => {
                        return (
                          <Tab key={index}>
                            {e.title}
                            {e.entryFileExt.label}
                          </Tab>
                        );
                      })}
                    </TabList>

                    <TabPanels>
                      {entry.codeFiles.map((e, index) => {
                        return (
                          <TabPanel key={index}>
                            <Syntax entry={e} />
                          </TabPanel>
                        );
                      })}
                    </TabPanels>
                  </Tabs>
                )}
              </Box>
            ))}
          </div>
        </Layout>
      )}
      {loading && (
        <div className="flex justify-center items-center h-[20vh]">
          <Loading size="lg" />
        </div>
      )}
    </div>
  );
};

export default Slug;
