import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';

// vite 用来接入插件的地方
export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
    // 组件模板插件， 热更新插件
    plugins: [pluginIndexHtml(), pluginReact()],
    // 解决 vite 路径报错，告诉其项目根目录下的文件都是合法的
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
