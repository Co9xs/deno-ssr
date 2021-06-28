import React,  { useState } from "https://jspm.dev/react@17.0.2"
export const App = () => {
  const [count, setCount] = useState(0)

  const countUp = () => {
    setCount((currentCount) => currentCount + 1)
  }

  const countDown = () => {
    setCount((currentCount) => currentCount - 1)
  }

  return (
    <div>
      {count}
      <button type="button" onClick={countUp}>
        count up
      </button>
      <button type="button" onClick={countDown}>
        count down
      </button>
    </div>
  )
}