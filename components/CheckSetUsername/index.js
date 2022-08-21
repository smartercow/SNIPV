import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../Firebase/clientApp';

const CheckSetUsername = () => {
    const [user] = useAuthState(auth);

    const CheckUsername = async () => {
  
      const docRef = doc(db, "UsersData1", user.uid);
      const docSnap = await getDoc(docRef);

       console.log("DOC REF", docSnap);
  
      if (!docSnap.exists() && docSnap.data().username?.length > 3) {
       console.log("is not > 3");
      } else if (docSnap.exists() && docSnap.data().username?.length > 3) {
        console.log("IS > 3");
        //<Don't show SetUserName Modal>
      }
    };
  
    useEffect(() => {
      if (user) {
        CheckUsername();
      }
    }, [user]);

  return (
    <div>CheckSetUsername</div>
  )
}

export default CheckSetUsername
