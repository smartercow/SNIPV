const filteredMain = folders.filter((lang) => {
    if (lang?.mainFolderId == mainEdited?.folder?.mainFolderId) {
      return lang;
    }
  });

  useEffect(() => {
      if (mainEdited) {
        setSelectValue(null);
        setSelectedMainFolder({});
        setMainDeleted(false);
        setRefreshed(true);
      }

  }, [mainEdited]);

  useEffect(() => {
    if(refreshed) {
      setSelectValue(filteredMain[0]);
      // setSelectedMainFolder(filteredMain[0]);
      console.log("REEEEESHEDD!!");
    }
  }, [refreshed])
  