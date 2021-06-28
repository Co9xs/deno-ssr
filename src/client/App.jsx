import React, { useState, useEffect } from "https://jspm.dev/react@17.0.2";

export function App() {
  const [food, setFood] = useState(null);

  const onClick = (name) => {
    fetch(`/api/${name}`)
      .then((res) => res.json())
      .then((data) => setFood(data));
  };

  useEffect(() => {
    fetch("/api/potato")
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, []);

  return (
    <div>
      {food && (
        <p>
          name: {food.name}
          <br />
          like: {food.like}
          <br />
          dislike: {food.dislike}
        </p>
      )}
      <p>
        <button type="button" onClick={() => onClick("potato")}>
          potato
        </button>{" "}
        <button type="button" onClick={() => onClick("carrot")}>
          carrot
        </button>{" "}
        <button type="button" onClick={() => onClick("tomato")}>
          tomato
        </button>
      </p>
    </div>
  );
}