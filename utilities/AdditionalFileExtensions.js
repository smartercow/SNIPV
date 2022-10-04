export const AdditionalFileExtensions1 = [
    { label: "ABAP", value: "abap", langId: "1", fileExtension: "ab",  accessory: false, },
    { label: "Javascript", value: "javascript", langId: "54", fileExtension: "js", accessory: true, 
        accessories: [
            {label: "Framework", value: "framework", accessoryId: "1", 
                options: [
                    {label: "React.js", value: "reactjs", langId: "1", fileExtensions: [
                        {label: ".js", value: "js"},
                        {label: ".jsx", value: "js"},
                    ]},
                    {label: "Next.js", value: "nextjs", langId: "2", fileExtensions: [
                        {label: ".js", value: "js"},
                        {label: ".jsx", value: "jsx"},
                    ]},
                ]
            },
            {label: "Library", value: "library", accessoryId: "2", 
                options: [
                    {label: "Three.js", value: "threejs", langId: "1", fileExtensions: [
                        {label: ".js", value: "js"},
                        {label: ".json", value: "json"},
                    ]},
                    {label: "jQuery", value: "jquery", langId: "2", fileExtensions: [
                        {label: ".js", value: "js"},
                    ]},
                ]
            },
        ] 
    },
    { label: "Typescript", value: "typescript", langId: "127", 
        fileExtension: [
            {label: ".ts", value: "ts"},
            {label: ".tsx", value: "tsx"},
        ], 
        accessory: true, 
        accessories: [
            {label: "Framework", value: "framework", accessoryId: "1", 
                options: [
                    {label: "React.js", value: "reactjs", langId: "1", fileExtensions: [
                        {label: ".ts", value: "ts"},
                        {label: ".tsx", value: "tsx"},
                    ]},
                    {label: "Next.js", value: "nextjs", langId: "2", fileExtensions: [
                        {label: ".ts", value: "ts"},
                        {label: ".tsx", value: "tsx"},
                    ]},
                ]
            },
        ]
    },
    { label: "AppleScript", value: "applescript", langId: "17", fileExtension: "ap", accessory: false, },
    { label: "CSS", value: "css", langId: "19", fileExtension: "css", accessory: true,
        accessories: [
            {label: "Pre-processors", value: "preprocessors", accessoryId: "1", 
                options: [
                    {label: "SCSS", value: "reactjs", langId: "1", fileExtensions: [
                        {label: ".scss", value: "scss"},
                    ]},
                    {label: "SASS", value: "sass", langId: "2", fileExtensions: [
                        {label: ".sass", value: "sass"},
                    ]},
                ]
            },
            {label: "Post-processors", value: "postprocessors", accessoryId: "2", 
                options: [
                    {label: "TestPost", value: "testpost2", langId: "1", fileExtensions: [
                        {label: ".tst", value: "js"},
                    ]},
                    {label: "TestPost2", value: "testpost2", langId: "2", fileExtensions: [
                        {label: ".tst2", value: "tst2"},
                    ]},
                ]
            },
        ]
    },
]

export const AdditionalFileExtensions = [  
    {langId: "3", options: [
        {label: ".as", value: "css", extId: "1"},
    ]},
    {langId: "19", options: [
        {label: ".css", value: "css", extId: "1"},
    ]},
    {langId: "54", options: [
        {label: ".js", value: "js", extId: "1"},
        {label: ".dut", value: "dut", extId: "2"},
    ]},
    {langId: "127", options: [
        {label: ".ts", value: "ts", extId: "1"},
        {label: ".tsx", value: "tsx", extId: "2"},
        {label: ".d.ts", value: "dts", extId: "3"},
    ]},
]