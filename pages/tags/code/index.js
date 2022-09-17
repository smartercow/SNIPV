import { collection, onSnapshot } from 'firebase/firestore';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

const CodeTagsPage = () => {
  const [user] = useAuthState(auth);

  const [codeTags, setCodeTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const snapSub = onSnapshot(
      collection(db, "CodeSnippetsData1"),
      (snapshot) => {
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
        });
        const uniqueTags = [...new Set(tags)];
        setCodeTags(uniqueTags);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      snapSub();
    };
  }, [user]);

  console.log("CODETAGS",codeTags);

  return (
    <div className="min-h-[80vh]">CodeTagsPage</div>
  )
}

export default CodeTagsPage