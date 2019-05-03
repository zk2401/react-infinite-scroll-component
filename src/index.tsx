import React, { useState } from "react";

export default function InfiniteScroll() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={setCount.bind({}, count + 1)}>Increment counter</button>
    </div>
  );
}
