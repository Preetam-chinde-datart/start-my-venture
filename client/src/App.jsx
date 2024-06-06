import { useState } from "react";
import Data from "../components/Data";

function App() {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="mt-10 container text-center mx-auto">
      <h1 className="text-3xl py-4">Get data from OpenAI</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="checkbox"
          name="isPaid"
          id="isPaid"
          onChange={(e) => setIsPaid(e.target.checked)}
        />
      </form>
      <div>
        <Data isPaid={isPaid} />
      </div>
    </div>
  );
}

export default App;
