import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;
const preprocess = sveltePreprocess({ sourceMap: !production });
const outputPath = production ? '../build/' : '../templates/';

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: `${outputPath}assets/js/index.js`,
  },
  plugins: [
    svelte({ customElement: true, dev: !production, preprocess }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    !production && livereload(),
    production && terser(),
  ],
  watch: { clearScreen: false },
};
