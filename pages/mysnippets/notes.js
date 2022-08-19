import React from 'react'
import MyNotesSnippets from '../../components/MySnippets/MyNotesSnippets'
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";

const Notes = () => {
  return (
    <div>
      <div>
        <SnippetsTypeLinks />
      </div>
      <div>
      <MyNotesSnippets />

      </div>
    </div>
  )
}

export default Notes