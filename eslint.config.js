import recommendedRules from "./eslint-recommended.js";

export default [
    {
        ignores: ["docs/assets/vendor/**"]
    },
    {
        files: ["docs/app.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                Element: "readonly",
                HTMLAnchorElement: "readonly",
                document: "readonly",
                fetch: "readonly",
                location: "readonly",
                window: "readonly"
            }
        },
        rules: recommendedRules
    }
];
