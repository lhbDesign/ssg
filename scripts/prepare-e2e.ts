import path from 'path';
import fse from 'fs-extra';
import * as execa from 'execa';

const exampleDir = path.resolve(__dirname, '../e2e/playground/basic');
// 声明 execa 需要使用到的参数， 这里是把 子进程的信息传入到父进程
const defaultExecaOpts = {
  cwd: exampleDir,
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

async function prepareE2E() {
  // ensure after build
  if (!fse.existsSync(path.resolve(__dirname, '../dist'))) {
    // exec build command  没有 dist 则进行构建， 使用 execa 包
    execa.commandSync('pnpm build', {
      cwd: path.resolve(__dirname, '../')
    });
  }

  // 安装无头浏览器
  execa.commandSync('npx playwright install', {
    cwd: path.join(__dirname, '../'),
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr
  });

  execa.commandSync('pnpm i', {
    cwd: exampleDir,
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr
  });

  // exec dev command
  execa.commandSync('pnpm dev', defaultExecaOpts);
}

prepareE2E();
