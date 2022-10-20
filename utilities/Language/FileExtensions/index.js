export const FileExtOptions = [
  {
    label: "JavaScript",
    value: "javascript",
    langId: "1",
    fileExtensions: [
      { label: ".js", value: "js", extId: "1", syntaxHighlight: "javascript" },
      { label: ".jsx", value: "jsx", extId: "2", syntaxHighlight: "jsx" },
      { label: ".glFT", value: "glft", extId: "3", syntaxHighlight: "json" },
    ],
  },

  {
    label: "TypeScript",
    value: "typescript",
    langId: "2",
    fileExtensions: [
      { label: ".ts", value: "ts", extId: "1", syntaxHighlight: "typescript" },
      { label: ".tsx", value: "tsx", extId: "2", syntaxHighlight: "tsx" },
      {
        label: ".d.ts",
        value: "dts",
        extId: "3",
        syntaxHighlight: "typescript",
      },
      { label: ".dart", value: "dart", extId: "4", syntaxHighlight: "dart" },
    ],
  },

  {
    label: "CSS",
    value: "css",
    langId: "3",
    fileExtensions: [
      { label: ".css", value: "css", extId: "1", syntaxHighlight: "css" },
      { label: ".scss", value: "scss", extId: "2", syntaxHighlight: "scss" },
      { label: ".sass", value: "sass", extId: "3", syntaxHighlight: "sass" },
      {
        label: ".module.css",
        value: "modulecss",
        extId: "4",
        syntaxHighlight: "css",
      },
      {
        label: ".module.scss",
        value: "modulescss",
        extId: "5",
        syntaxHighlight: "scss",
      },
      { label: ".js", value: "js", extId: "6", syntaxHighlight: "javascript" },
      { label: ".ts", value: "ts", extId: "7", syntaxHighlight: "typescript" },
      {
        label: ".config.js",
        value: "configjs",
        extId: "8",
        syntaxHighlight: "javascript",
      },
      { label: ".less", value: "less", extId: "9", syntaxHighlight: "less" },
    ],
  },

  {
    label: "HTML",
    value: "html",
    langId: "4",
    fileExtensions: [
      { label: ".html", value: "html", extId: "1", syntaxHighlight: "html" },
    ],
  },

  {
    label: "Git",
    value: "git",
    langId: "5",
    fileExtensions: [
      { label: ".git", value: "git", extId: "1", syntaxHighlight: "git" },
      {
        label: ".gitignore",
        value: "gitignore",
        extId: "2",
        syntaxHighlight: "git",
      },
      { label: "_any", value: "anygit", extId: "3", syntaxHighlight: "git" },
    ],
  },
  {
    label: "Environment Variables",
    value: "environmentvariables",
    langId: "6",
    fileExtensions: [
      { label: ".env", value: "env", extId: "1", syntaxHighlight: "" },
      {
        label: ".env.local",
        value: "envlocal",
        extId: "2",
        syntaxHighlight: "",
      },
      { label: ".env.test", value: "envtest", extId: "3", syntaxHighlight: "" },
      {
        label: ".env.development",
        value: "envdevelopment",
        extId: "3",
        syntaxHighlight: "",
      },
      {
        label: ".env.production",
        value: "envproduction",
        extId: "5",
        syntaxHighlight: "",
      },
    ],
  },
  {
    label: "Node.js",
    value: "nodejs",
    langId: "7",
    fileExtensions: [
      { label: ".js", value: "js", extId: "1", syntaxHighlight: "javascript" },
      {
        label: ".node",
        value: "node",
        extId: "2",
        syntaxHighlight: "javascript",
      }, //Syntax not sure
      { label: ".json", value: "json", extId: "3", syntaxHighlight: "json" },
    ],
  },

  {
    label: "JSON",
    value: "json",
    langId: "8",
    fileExtensions: [
      { label: "json", value: "json", extId: "1", syntaxHighlight: "json" },
    ],
  },

  {
    label: "GraphQL",
    value: "graphql",
    langId: "9",
    fileExtensions: [
      { label: ".gql", value: "gql", extId: "1", syntaxHighlight: "sql" },
    ],
  },

  {
    label: "SQL",
    value: "sql",
    langId: "10",
    fileExtensions: [
      { label: "sql", value: "sql", extId: "1", syntaxHighlight: "" },
    ],
  },
  {
    label: "PostgreSQL",
    value: "postgresql",
    langId: "11",
    fileExtensions: [
      { label: ".sql", value: ".sql", extId: "1", syntaxHighlight: "sql" },
      { label: ".psql", value: "psql", extId: "2", syntaxHighlight: "sql" }, //Syntax not sure
      { label: ".dbu", value: "dbu", extId: "3", syntaxHighlight: "sql" }, //Syntax not sure
    ],
  },

  {
    label: "Text",
    value: "text",
    langId: "12",
    fileExtensions: [
      { label: ".txt", value: "txt", extId: "1", syntaxHighlight: "txt" },
    ],
  }, //Syntax not sure
  {
    label: "SVG",
    value: "svg",
    langId: "13",
    fileExtensions: [
      { label: ".svg", value: "svg", extId: "1", syntaxHighlight: "svg" },
    ],
  }, //Syntax not sure

  {
    label: "Powershell",
    value: "powershell",
    langId: "14",
    fileExtensions: [
      { label: "cmd.exe", value: "cmd", extId: "1", syntaxHighlight: "" }, //Syntax not sure
      { label: ".ps1", value: "ps1", extId: "2", syntaxHighlight: "" }, //Syntax not sure
      { label: ".psd1", value: "psd1", extId: "3", syntaxHighlight: "" }, //Syntax not sure
      { label: ".psm1", value: "psm1", extId: "4", syntaxHighlight: "" }, //Syntax not sure
    ],
  },

  {
    label: "MySQL",
    value: "mysql",
    langId: "15",
    fileExtensions: [
      { label: ".sql", value: "sql", extId: "1", syntaxHighlight: "sql" },
    ],
  },
  {
    label: "Other",
    value: "other",
    langId: "16",
    fileExtensions: [
      { label: "any", value: "anyother", extId: "1", syntaxHighlight: "" },
    ],
  },
  {
    label: "Lua",
    value: "lua",
    langId: "17",
    fileExtensions: [
      { label: ".lua", value: "lua", extId: "1", syntaxHighlight: "lua" },
    ],
  },
];
