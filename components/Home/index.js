import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../Firebase/clientApp';
import Feed from './Feed';

const HomePage = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(true);
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);

  console.log(snippets);
  useEffect(() => {
    const snippetsSub = onSnapshot(
      collection(db, "Snippets"),
      (snapshot) => {
        let snippetList = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          snippetList.push({ id: doc.id, ...doc.data()});
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setSnippets(snippetList);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
        snippetsSub();
    };
  }, []);
  return (
    <div>
        <Feed user={user} snippets={snippets} tags={tags}/>
    </div>
  )
}

export default HomePage