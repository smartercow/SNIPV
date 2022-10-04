//accsId: 1
export const CSSPreprocessors = [
    {
        label: "SASS", value: "sass", accId: "1", accsType: "pre-processor", accsId: "1", 
        fileExtensions: [
            {label: ".scss", value: "scss", extId: "1", syntaxHighlight: "scss",},
            {label: ".sass", value: "sass", extId: "2", syntaxHighlight: "sass",},
        ]
    },
    {
        label: "Less", value: "less", accId: "2", accsType: "pre-processor", accsId: "1", 
        fileExtensions: [
            {label: ".css", value: "css", extId: "1", syntaxHighlight: "css",},
            {label: ".less", value: "less", extId: "2", syntaxHighlight: "less",},
        ]
    },
/*     {
        label: "Compass", value: "compass", accId: "3", accsType: "pre-processor", accsId: "1", 
        fileExtensions: [
            {label: ".css", value: "css", extId: "1", syntaxHighlight: "css",},
        ]
    }, */
];

//accsId: 2
export const CSSPostprocessors = [
    {
        label: "CSSNext", value: "cssnext", accId: "1", accsType: "post-processor", accsId: "2", 
        fileExtensions: [
            {label: ".scss", value: "scss", extId: "1", syntaxHighlight: "scss",},
            {label: ".sass", value: "sass", extId: "2", syntaxHighlight: "sass",},
        ]
    },
    {
        label: "PostCSS", value: "postcss", accId: "2", accsType: "post-processor", accsId: "2", 
        fileExtensions: [
            {label: ".css", value: "css", extId: "1", syntaxHighlight: "css",},
            {label: ".pcss", value: "pcss", extId: "2", syntaxHighlight: "css",},
            {label: ".postcss", value: "postcss", extId: "2", syntaxHighlight: "css",},
        ]
    },
];

//accsId: 3
export const CSSFrameworks = [
    {
        label: "Tailwind CSS", value: "tailwindcss", accId: "1", accsType: "framework", accsId: "3", 
        fileExtensions: [
            {label: ".module.css", value: "modulecss", extId: "1", syntaxHighlight: "css",},
            {label: ".config.js", value: "configjs", extId: "2", syntaxHighlight: "javascript",},
            {label: ".css", value: "css", extId: "3", syntaxHighlight: "css",},
            {label: ".html", value: "html", extId: "4", syntaxHighlight: "html",},
            {label: ".js", value: "js", extId: "5", syntaxHighlight: "javascript",},
            {label: ".jsx", value: "jsx", extId: "6", syntaxHighlight: "javascript",},
            {label: ".ts", value: "ts", extId: "7", syntaxHighlight: "ts",},
            {label: ".tsx", value: "tsx", extId: "8", syntaxHighlight: "tsx",},
        ]
    },
];