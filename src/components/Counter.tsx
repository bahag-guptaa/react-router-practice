import {useState} from 'react'

interface CounterProps {
    color: string
}

const Counter = ({color}: CounterProps ) => {
    const [count, setCount] = useState<number>(0)

    return (
        <>
            <h1>Hello this is my Counter component</h1>
            <h2 style={{color: color}}>{count}</h2>
            <button onClick={() => setCount(count + 1)}>
                +1
            </button>
        </>
    )

}

export default Counter