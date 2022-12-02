import { App } from './app';
import { renderToString } from 'react-dom/server';

// For ssr component render  拿到组件的 HTML 字符串
export function render() {
  return renderToString(<App />);
}
