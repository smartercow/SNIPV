import { CSSPreprocessors, CSSPostprocessors, CSSFrameworks } from "./CSS";
import { JavaScriptFrameworks, TypeScriptFrameworks } from "./JavaScript/Frameworks";
import { JavaScriptLibraries } from "./JavaScript/Libraries";

export const LanguageOptions = [
  { label: "JavaScript", value: "javascript", langId: "1", 
    fileExtensions: [
      {label: ".js", value: "js", syntaxHighlight: "javascript",},
    ],  
    accessory: true, 
    accessories: [
      {
        label: "Framework", value: "framework", accessoryId: "1", langId: "1",
        options: JavaScriptFrameworks
      },
      {
        label: "Library", value: "library", accessoryId: "2", langId: "1",
        options: JavaScriptLibraries
      },
    ],
  },
  
  { label: "TypeScript", value: "typescript", langId: "2", 
    fileExtensions: [
      {label: ".ts", value: "ts", extId: "1", syntaxHighlight: "typescript",},
      {label: ".d.ts", value: "dts", extId: "3", syntaxHighlight: "ts",},
    ],  
    accessory: true, 
    accessories: [
      {
        label: "Framework", value: "framework", accessoryId: "1", langId: "2",
        options: TypeScriptFrameworks
      },
    ],
  },

  { label: "CSS", value: "css", langId: "3", 
    fileExtensions: [
      {label: ".css", value: "css", extId: "1", syntaxHighlight: "css",},
    ],  
    accessory: true, 
    accessories: [
      {label: "Pre-processors", value: "preprocessors", accessoryId: "1", langId: "3",
        options: CSSPreprocessors
      },
      {label: "Post-processors", value: "postprocessors", accessoryId: "2", langId: "3",
        options: CSSPostprocessors
      },
      {label: "CSS Frameworks", value: "cssframeworks", accessoryId: "3", langId: "3",
        options: CSSFrameworks
      },
    ],
  },

  { label: "HTML", value: "html", langId: "4",
    fileExtensions: [
      {label: ".html", value: "html", extId: "1", syntaxHighlight: "",},
    ],
    accessory: false, syntaxHighlight: "html", secondary: false 
  },

  { label: "Git", value: "git", langId: "5", fileExtensions: [{label: "any", value: "anygit", extId: "1", syntaxHighlight: "git",}],  accessory: false, },
  { label: "Gitignore", value: "gitignore", langId: "6", fileExtensions: [{label: ".gitignore", value: "gitignore", extId: "1", syntaxHighlight: "git",}],  accessory: false, },
  
  { label: "Node.js", value: "nodejs", langId: "7", 
    fileExtensions: [
      {label: ".js", value: "js", extId: "1", syntaxHighlight: "javascript",},
      {label: ".node", value: "node", extId: "2", syntaxHighlight: "javascript",}, //Syntax not sure
      {label: ".json", value: "json", extId: "3", syntaxHighlight: "json",},
    ],  accessory: false, },
  
  { label: "JSON", value: "json", langId: "8", fileExtensions: [{label: "json", value: "json", extId: "1", syntaxHighlight: "json",}], accessory: false, },
  
  { label: "GraphQL", value: "graphql", langId: "9", 
    fileExtensions: [
      {label: ".gql", value: "gql", extId: "1", syntaxHighlight: "sql",}
    ], accessory: false, },
  
  { label: "SQL", value: "sql", langId: "10", fileExtensions: [{label: "sql", value: "sql", extId: "1", syntaxHighlight: "",}], accessory: false, },
  { label: "PostgreSQL", value: "postgresql", langId: "11", 
    fileExtensions: [
      {label: ".sql", value: ".sql", extId: "1", syntaxHighlight: "sql",},
      {label: ".psql", value: "psql", extId: "2", syntaxHighlight: "sql",}, //Syntax not sure
      {label: ".dbu", value: "dbu", extId: "1", syntaxHighlight: "sql",} //Syntax not sure
    ], accessory: false, },
  
  { label: "Text", value: "text", langId: "12", fileExtensions: [{label: ".txt", value: "txt", extId: "1", syntaxHighlight: "txt",}], accessory: false, }, //Syntax not sure
  { label: "SVG", value: "svg", langId: "13", fileExtensions: [{label: ".svg", value: "svg", extId: "1", syntaxHighlight: "svg",}], accessory: false, }, //Syntax not sure
  
  { label: "Powershell", value: "powershell", langId: "14", 
    fileExtensions: [
      {label: "cmd.exe", value: "cmd", extId: "1", syntaxHighlight: "",}, //Syntax not sure
      {label: ".ps1", value: "ps1", extId: "2", syntaxHighlight: "",}, //Syntax not sure
      {label: ".psd1", value: "psd1", extId: "3", syntaxHighlight: "",}, //Syntax not sure
      {label: ".psm1", value: "psm1", extId: "4", syntaxHighlight: "",}, //Syntax not sure
    ], accessory: false, },
  
  { label: "MySQL", value: "mysql", langId: "15", fileExtensions: [{label: ".sql", value: "sql", extId: "1", syntaxHighlight: "sql",}], accessory: false, },
  { label: "Other", value: "other", langId: "16", fileExtensions: [{label: "any", value: "anyother", extId: "1", syntaxHighlight: "",}], accessory: false, },
  { label: "Lua", value: "lua", langId: "17", fileExtensions: [{label: ".lua", value: "lua", extId: "1", syntaxHighlight: "lua",}], accessory: false, },








  // { label: "ABAP", value: "abap", langId: "1", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "abap", secondary: false },
  // { label: "ABC", value: "abc", langId: "2", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "ActionScript", value: "actionscript", langId: "3", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "actionscript", secondary: false },
  // { label: "AppleScript", value: "applescript", langId: "148", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "applescript", secondary: false },
  // { label: "ADA", value: "ada", langId: "4", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "ada", secondary: false },
  // { label: "Arduino", value: "arduino", langId: "140", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "arduino", secondary: false },
  // { label: "Apache Configuration", value: "apacheconf", langId: "5", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "apacheconf", secondary: false },
  // { label: "AsciiDoc", value: "asciidoc", langId: "6", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "asciidoc", secondary: false },
  // { label: "Assembly x86", value: "assemblyx86", langId: "7", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "asm6502", secondary: false },
  // { label: "AutoHotKey", value: "autohotkey", langId: "8", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "autohotkey", secondary: false },
  // { label: "Batch File", value: "batchfile", langId: "9", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Brainfuck", value: "brainfuck", langId: "147", fileExtensions: [{label: ".br", value: "br", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "brainfuck", secondary: false },
  // { label: "Bro", value: "bro", langId: "10", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "bro", secondary: false },
  // { label: "C", value: "c", langId: "141", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "c", secondary: false },
  // { label: "C and C", value: "candc", langId: "11", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "C9Search", value: "c9search", langId: "12", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Cirru", value: "cirru", langId: "13", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Clojure", value: "clojure", langId: "14", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "clojure", secondary: false },
  // { label: "Cobol", value: "cobol", langId: "15", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "CoffeScript", value: "coffescript", langId: "16", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "coffeescript", secondary: false },
  // { label: "ColdFusion", value: "coldfusion", langId: "17", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Curly", value: "curly", langId: "20", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "C++", value: "cpp", langId: "142", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "cpp", secondary: false },
  // { label: "C#", value: "csharp", langId: "18", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "csharp", secondary: false },
  // { label: "D", value: "d", langId: "21", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "d", secondary: false },
  // { label: "Dart", value: "dart", langId: "22", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "dart", secondary: false },
  // { label: "Diff", value: "diff", langId: "23", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "diff", secondary: false },
  // { label: "Django", value: "django", langId: "24", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "django", secondary: false },
  // { label: "Docker File", value: "dockerfile", langId: "25", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "docker", secondary: false },
  // { label: "Dot", value: "dot", langId: "26", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Drools", value: "drools", langId: "27", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Eiffel", value: "eiffel", langId: "28", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "eiffel", secondary: false },
  // { label: "EJS", value: "ejs", langId: "29", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Elixir", value: "elixir", langId: "30", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "elixir", secondary: false },
  // { label: "Elm", value: "elm", langId: "31", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "elm", secondary: false },
  // { label: "Erlang", value: "erlang", langId: "32", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "erlang", secondary: false },
  // { label: "Forth", value: "forth", langId: "33", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Fortran", value: "fortran", langId: "34", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "fortran", secondary: false },
  // { label: "FreeMarker", value: "freeMarker", langId: "35", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Gcode", value: "gcode", langId: "36", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Gherkin", value: "gherkin", langId: "37", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "gherkin", secondary: false },
  // { label: "Glsl", value: "glsl", langId: "39", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "glsl", secondary: false },
  // { label: "Gobstones", value: "gobstones", langId: "40", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Go", value: "go", langId: "41", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "go", secondary: false },
  // { label: "Groovy", value: "groovy", langId: "43", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "groovy", secondary: false },
/*   { label: "HAML", value: "haml", langId: "44", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "haml" }, *///Moved to HTMLTemplates
  // { label: "Handlebars", value: "handlebars", langId: "45", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "handlebars", secondary: false },
  // { label: "Haskell", value: "haskell", langId: "46", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "haskell", secondary: false },
  // { label: "Haskell Cabal", value: "haskellcabal", langId: "47", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "haskell", secondary: false },
  // { label: "haXe", value: "haxe", langId: "48", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "haxe", secondary: false },
  // { label: "Hjson", value: "hjson", langId: "49", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "json", secondary: false },
  // { label: "HTML (Elixir)", value: "htmlelixir", langId: "51", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "html", secondary: false },
  // { label: "HTML (Ruby)", value: "htmlruby", langId: "52", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "html", secondary: false },
  // { label: "HTTP", value: "http", langId: "143", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "http", secondary: false },
  // { label: "Java", value: "java", langId: "53", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "java", secondary: false },
  // { label: "JSONiq", value: "jsoniq", langId: "56", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "JSP", value: "jsp", langId: "57", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "JSSM", value: "jssm", langId: "58", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
/*   { label: "JSX", value: "jsx", langId: "59", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "" }, */  //Moved to Javasript frameworks
  // { label: "Julia", value: "julia", langId: "60", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "julia", secondary: false },
  // { label: "Kotlin", value: "kotlin", langId: "61", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "kotlin", secondary: false },
  // { label: "LaTex", value: "latex", langId: "62", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "latex", secondary: false },
/*   { label: "LESS", value: "less", langId: "63", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "less", secondary: false }, */  //Moved to CSS proccessors
  // { label: "Lean", value: "lean", langId: "64", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Liquid", value: "liquid", langId: "65", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "liquid", secondary: false },
  // { label: "Lisp", value: "lisp", langId: "66", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "lisp", secondary: false },
  // { label: "LiveScript", value: "livescript", langId: "67", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "livescript", secondary: false },
  // { label: "LogiQL", value: "logiql", langId: "68", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "LSL", value: "lsl", langId: "69", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Lua Page", value: "luapage", langId: "71", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "lua", secondary: false },
  // { label: "Lucene", value: "lucene", langId: "72", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Makefile", value: "makefile", langId: "73", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "makefile", secondary: false },
/*   { label: "Markdown", value: "markdown", langId: "74", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "markdown" }, */ //Moved to HTMLTemplates
  // { label: "Markup", value: "markup", langId: "149", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "markup", secondary: false },
  // { label: "Mask", value: "mask", langId: "75", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "MATLAB", value: "matlab", langId: "76", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "matlab", secondary: false },
  // { label: "Maze", value: "maze", langId: "77", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "MEL", value: "mel", langId: "78", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "mel", secondary: false },
  // { label: "MUSHCode", value: "mushcode", langId: "79", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Nix", value: "nix", langId: "81", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "nix", secondary: false },
  // { label: "NSIS", value: "nsis", langId: "82", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "nsis", secondary: false },
  // { label: "Objective-C", value: "objectivec", langId: "83", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "objectivec", secondary: false },
  // { label: "OCaml", value: "ocaml", langId: "84", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "ocaml", secondary: false },
  // { label: "Pascal", value: "pascal", langId: "85", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "pascal", secondary: false },
  // { label: "Perl", value: "perl", langId: "86", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "perl", secondary: false },
  // { label: "pgSQL", value: "pgsql", langId: "87", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "PHP", value: "php", langId: "88", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "php", secondary: false },
  // { label: "Pig", value: "pig", langId: "89", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Praat", value: "praat", langId: "91", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Prolog", value: "prolog", langId: "92", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "prolog", secondary: false },
  // { label: "Properties", value: "properties", langId: "93", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "properties", secondary: false },
  // { label: "Protocol Buffers", value: "protobuf", langId: "94", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "protobuf", secondary: false },
  // { label: "Python", value: "python", langId: "95", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "python", secondary: false },
  // { label: "R", value: "r", langId: "96", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "r", secondary: false },
  // { label: "Razor", value: "razor", langId: "97", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "RDoc", value: "rdoc", langId: "98", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "RHTML", value: "rhtml", langId: "99", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "ruby", secondary: false }, //Ruby HTML
  // { label: "reST (reStructuredText)", value: "rest", langId: "100", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "rest", secondary: false },
  // { label: "Ruby", value: "ruby", langId: "101", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "ruby", secondary: false },
  // { label: "Rust", value: "rust", langId: "102", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "rust", secondary: false },
/*   { label: "SASS", value: "sass", langId: "103" },, fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "" */  //Moved to CSS processors
  // { label: "openSCAD", value: "scad", langId: "104", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Scala", value: "scala", langId: "105", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "scala", secondary: false },
  // { label: "Scheme", value: "scheme", langId: "106", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "scheme", secondary: false },
/*   { label: "SCSS", value: "scss", langId: "107" },, fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "" */  //Moved to CSS processors
  // { label: "Shell script", value: "sh", langId: "108", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "SJS", value: "sjs", langId: "109", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Smarty", value: "smarty", langId: "110", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
/*   { label: "snippets", value: "snippets", langId: "111", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false }, */ //Unknown
  // { label: "Soy (Closure Template)", value: "soy", langId: "112", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "soy", secondary: false },
  // { label: "Space", value: "space", langId: "113", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "SQLServer", value: "sqlserver", langId: "115", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "sql", secondary: false },
/*   { label: "Stylus", value: "stylus", langId: "116", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "" }, */
/*   { label: "Dart", value: "dart", langId: "118", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "" }, */  //Repeated line
  // { label: "Swift", value: "swift", langId: "119", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Tcl", value: "tcl", langId: "120", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "tcl", secondary: false },
  // { label: "Tex", value: "tex", langId: "121", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: ", secondary: false"},
  // { label: "Textile", value: "textile", langId: "123", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "textile", secondary: false },
  // { label: "Toml", value: "toml", langId: "124", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
/*   { label: "TSX", value: "tsx", langId: "125", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "" }, */ //Duplicated line > Typescript
/*   { label: "Twig", value: "twig", langId: "126", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "twig", secondary: false }, */  //Moved to > HTML templates
  // { label: "Vala", value: "vala", langId: "128", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "VBScript", value: "vbscript", langId: "129", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "Visual Basic", value: "vb", langId: "146", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "visual-basic", secondary: false },
  // { label: "Visual Basic .NET", value: "vbnet", langId: "145", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "vbnet", secondary: false },
/*   { label: "Velocity", value: "velocity", langId: "130", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "velocity", secondary: false }, */  //Moved to > HTML templates
  // { label: "Verilog", value: "verilog", langId: "131", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "verilog", secondary: false },
  // { label: "VHDL", value: "vhdl", langId: "132", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "vhdl", secondary: false },
  // { label: "Wollok", value: "wollok", langId: "133", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
  // { label: "XML", value: "xml", langId: "134", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "", secondary: false },
/*   { label: "XQuery", value: "xquery", langId: "135", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "xquery", secondary: false }, */ //Moved to > HTML templates
  // { label: "YAML", value: "yaml", langId: "136", fileExtensions: [{label: "none", value: "none", extId: "1", syntaxHighlight: "",}],  accessory: false, syntaxHighlight: "yaml", secondary: false }, //HTML templating
];

/* LAST: Markup - 149 */