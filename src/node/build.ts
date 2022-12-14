import path from 'path';
import fs from 'fs-extra';
import { join } from 'path';
import { build as viteBuild } from 'vite';
import type { RollupOutput } from 'rollup';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import ora from 'ora';
import { pathToFileURL } from 'url';
// 1. 把 client 和 server 端的代码进行打包 生成两份打包产物， 分别跑在客服端和服务器端
// 2. 引入 server-entry 模块
// 3. 服务端渲染， 产出 HTML
export async function bundle(root: string) {
  const resolveViteConfig = (isServer: boolean): any => ({
    mode: 'production', // 生成环境构建
    root, // 路径
    build: {
      ssr: isServer,
      outDir: isServer ? '.temp' : 'build', // 输出产物目录
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH, // 打包入口
        output: {
          format: isServer ? 'cjs' : 'esm' // 打包产物格式 服务端是运行在node中， 所以使用 commonjs 格式
        }
      }
    }
  });
  // loading
  const spinner = ora();

  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build 客户端
      viteBuild(resolveViteConfig(false)),
      // server build 服务端
      viteBuild(resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log(e);
  }
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  console.log('Rendering page in server side...,', clientChunk?.fileName);
  const appHtml = render();
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="./${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
  await fs.ensureDir(join(root, 'build'));
  await fs.writeFile(join(root, 'build/index.html'), html);
  await fs.remove(join(root, '.temp'));
}

export async function build(root: string) {
  const [clientBundle, serverBundle] = await bundle(root);
  // 引入 ssr 入口模块
  const serverEntryPath = path.resolve(root, '.temp', 'ssr-entry.js');
  const { render } = await import(
    pathToFileURL(serverEntryPath) as unknown as string
  );
  // 服务端渲染
  await renderPage(render, root, clientBundle);
}
