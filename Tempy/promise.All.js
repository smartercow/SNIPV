      /*       const snippetDocs = await getDocs(postsQuery);
      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setSnippets((prev) => ({
        ...prev,
        snips: snippets,
      })); */

/*       Promise.all([codeDocs, errorDocs])
      .then((PromiseResults) => {
        
        PromiseResults.forEach((snapshot) => {
          const mergedSnippets = [];
          snapshot.docs.forEach((doc) => {
            mergedSnippets.push({ ...doc.data(), id: doc.id });
          });

          setSnippets(mergedSnippets);
          console.log("merged", mergedSnippets);
        })

      })
      .catch((e) => console.log("error", e)); */