import { Button, Icon, Input, Text, Tooltip, useToast } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import { db } from "../../firebase/clientApp";

const initialValues = {
  domain: "",
  repo: "",
};
const General = () => {
  const [form, setForm] = useState(initialValues);
  const { domain, repo } = form;
  const toast = useToast();
  const [update, setUpdate] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form?.upt === true) {
      try {
        await updateDoc(doc(db, "Settings", "General"), {
          ...form,
          upt: true,
        });
        setUpdate(!update);
        toast({
          description: "Indstillingerne blev gemt",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.log("Fejl i indstillinger", error);
      }
    } else {
      try {
        await setDoc(doc(db, "Settings", "General"), {
          ...form,
          upt: true,
        });
        setUpdate(!update);
        toast({
          description: "Indstillingerne blev gemt",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.log("Fejl i indstillinger", error);
      }
    }
  };

  useEffect(() => {
    const getAccess = async () => {
      const docRef = doc(db, "Settings", "General");
      const access = await getDoc(docRef);
      setForm(access.data());
    };
    getAccess();
  }, [update]);

  return (
    <div className="flex flex-col gap-4 my-2">
      <div>
        <div className="flex gap-1 items-center">
          <Text>Domain</Text>
          {/*           <Tooltip label="Din hosting domain uden https://www">
            <Icon as={BsQuestionCircleFill} w={3} h={3} />
          </Tooltip> */}
        </div>
        <div>
          <Input
            aria-label="domain"
            name="domain"
            placeholder="snipv.vercel.app"
            width="70%"
            value={domain}
            min={5}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <div className="flex gap-1 items-center">
          <Text>Github repository</Text>
          {/*           <Tooltip
            label="Link til din forked Github repository"
            aria-label="Github repo"
            hasArrow
          >
            <Icon as={BsQuestionCircleFill} w={3} h={3} />
          </Tooltip> */}
        </div>
        <div>
          <Input
            aria-label="domain"
            name="repo"
            bordered
            placeholder="https://github.com/smartercow/SNIPV"
            width="70%"
            value={repo}
            min={5}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Button
          onClick={handleSubmit}
          bg="Primary"
          color="white"
          _hover={{ bg: "PrimaryLight" }}
        >
          {form?.upt === true ? "Opdatere" : "Gem"}
        </Button>
      </div>
    </div>
  );
};

export default General;
