import { useState } from 'react';

export function Layout() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>这是一个组件示例</h1>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>Add Count</button>
      </div>
    </div>
  );
}
