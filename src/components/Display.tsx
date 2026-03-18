import { useState } from "react";

interface DisplayProps {
  count: number;
//   setCount: (count: number) => void
  setCount: React.Dispatch<React.SetStateAction<number>>
}

const Display = ({ count, setCount }: DisplayProps) => {
  return (
    <>
    <p>{count}</p>
    <button onClick={() => setCount(count + 1)}>
        +1
    </button>
    </>
  )
};

const Parent = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <Display count={count} setCount={setCount} />
    </div>
  );
};


export default Parent