import { cac } from 'cac';
import * as path from 'path';
import { build } from './build';
const version = require('../../package.json').version;

const cli = cac('isbo').version(version).help();

import { createDevServer } from './dev';

cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    // 添加以下逻辑
    root = root ? path.resolve(root) : process.cwd();
    const server = await createDevServer(root);
    await server.listen();
    server.printUrls();
  });

// cli
//   .command("[root]", "start dev server")
//   .alias("dev")
//   .action(async (root: string) => {
//     console.log("dev", root);
//   });

cli
  .command('build [root]', 'build for production')
  .action(async (root: string) => {
    try {
      console.log('build1', root);
      await build(root);
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
