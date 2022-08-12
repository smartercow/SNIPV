import React from "react";

const Feed = ({user, snippets, tags}) => {
  console.log("Snippets",snippets);
  return (
    <div>
      {snippets?.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <div>{item.tags}</div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
