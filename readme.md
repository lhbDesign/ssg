## MVP 版本

- 引用连接 https://juejin.cn/video/7163857336258265102/section/7163859218716426271

- 执行 pnpm start 完成 ts 文件改动侦听， 实时编译到 dist 目录
- 执行 isbo build docs 完成打包
- 在 docs 下 执行 pnpm serve . 或者 serve . （需要全局安装了serve 使用 npm i -g serve  安装）， 完成服务启动， 浏览器打开本地服务，没有打开页面的话就进入 页面目录中的 build

## node
- node 中 使用 debugger ， 端点， 在控制台终端 中 新建 JavaScript Debug Terminal 窗口， 执行 isbo build docs 命令
- node 版本 16

## 构建工具
- ora
提供命令行 loading 效果
- tsup 
提供构建两种输出格式 esm 和 cjs 的能力
- e2e
配置在 playwright.config 中
1. 创建测试项目
2. 启动测试项目（也是拿到本地项目本地启动以后的url，在 playwright 配置文件中进行配置）
3. 开启无头浏览器进行访问
安装无头浏览器的操作在 prepare-e2e 文件中
使用 prepare:e2e 执行浏览器的 e2e ，使用 test:e2e 执行 e2e 测试用例（在 e2e/index.test.ts 中） ， 使用 test:init --ui 执行可视化测试用例查看页面，测试用例在（src\node\__test__\index.test.ts）中