const postCSSImport = require("postcss-import");
const tailwindCSS = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const productionMode = process.env.NODE_ENV === "production";

// More minification of CSS
const cssnano = require("cssnano")({ preset: "default" });

module.exports = {
  plugins: [
    postCSSImport,
    tailwindCSS,
    autoprefixer,

    // Only purge and minify in production
    ...(productionMode ? [cssnano] : []),
  ],
};
