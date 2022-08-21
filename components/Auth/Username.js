import { collection, getDoc, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Firebase/clientApp'

const Username = async () => {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState("")
/*     const SetUsername = () => {
        try {
            const UserRef = collection(db, "UsersData1", user.uid)
            const UsernameQuery = query(UserRef, where("username", "==", ""))

            
        } catch (error) {
            
        }
    } */
  return (
    <div>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
    </div>
  )
}

export default Username