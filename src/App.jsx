import { useState } from "react";
import "./App.css";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [input, setInput] = useState("");
  const [names, setNames] = useState([]);
  const [keepLast, setKeepLast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameList = input
      .split(/[,\s]+/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    if (keepLast && nameList.length > 1) {
      const last = nameList[nameList.length - 1];
      const shuffled = shuffleArray(nameList.slice(0, -1));
      setNames([...shuffled, last]);
    } else {
      setNames(shuffleArray(nameList));
    }
  };

  return (
    <div className="container">
      <h1>Lista Aleatória</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite nomes separados por vírgula ou espaço"
          style={{ width: "350px", padding: "8px" }}
        />
        <button
          type="submit"
          style={{ marginLeft: "8px", padding: "8px 16px" }}
        >
          Enviar
        </button>
        <div style={{ marginTop: "12px", textAlign: "center", width: "100%" }}>
          <label
            style={{
              cursor: "pointer",
              fontSize: "1em",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={keepLast}
              onChange={(e) => setKeepLast(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Manter o último item sempre na última posição
          </label>
        </div>
      </form>
      {names.length > 0 && (
        <ul style={{ marginTop: "24px", fontSize: "1.2em" }}>
          {names.map((name, idx) => (
            <li key={idx}>{name.charAt(0).toUpperCase() + name.slice(1)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
