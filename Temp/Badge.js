{Object.keys(snip?.folder?.framework)
    .length > 0 && (
    <Badge css={{backgroundColor: "#F7E018",color: "#031B4E",}}variant="flat"className="font-mono">
      {snip?.folder?.framework?.label}
    </Badge>
  )}

  {Object.keys(snip?.folder?.processor)
    .length > 0 && (
    <div>
      <Badge
        color="#F7E018"
        css={{
          backgroundColor: "#009BDD",
          color: "white",
        }}
        variant="flat"
        className="font-mono"
      >
        {snip?.folder?.processor?.label}
      </Badge>
    </div>
  )}

  {!Object.keys(snip?.folder?.processor)
    .length > 0 &&
    !Object.keys(snip?.folder?.framework)
      .length > 0 && (
      <div>
        <p className="font-mono">
          {snip?.category?.label}
        </p>
      </div>
    )}