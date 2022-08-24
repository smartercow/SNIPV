{snippet.folder.framework > 0  ? (
    <div>
      {snippet.folder.framework > 0 && (
        <p>{snippet.folder.framework?.label}</p>
      )}
      {snippet.folder.processor > 0 && (
        <p>{snippet.folder.processor?.label}</p>
      )}
    </div>
  ) : (
    <p>{snippet.folder.langauge?.label}</p>
  )}