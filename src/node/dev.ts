import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';

// vite 用来接入插件的地方
export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
    // 组件模板插件， 热更新插件
    plugins: [pluginIndexHtml(), pluginReact()]
  });
}
