import { defineConfig } from "tsup"

export default defineConfig({
  entry:["src/node/cli.ts"],  // 指定入口
  bundle:true,  // bundle 格式
  splitting:true,  // 开启拆包功能
  outDir:"dist",
  format:["cjs","esm"],
  dts:true,
  shims:true  // 对 esm 和 cjs 的 api 进行 polyfill 的代码带入， 解决 esm 环境 无法使用 __dirname 这种问题
})