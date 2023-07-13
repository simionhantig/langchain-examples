import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/example01/index.ts"],
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  dts: true,
});
