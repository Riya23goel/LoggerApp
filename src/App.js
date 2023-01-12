import "./App.css";
import { useState } from "react";
import axios from 'axios';

export default function App() {
    const [val, setValue] = useState("");
    const [diff, setDiff] = useState("");

    async function saveStaticDataToFile () {
        const res = await axios({
          method: 'get',
          url: `http://localhost:5001/getLogs`,
          params: {
            data: val
          },
        });
        if(res.data === ""){
          setDiff("NO DIFF");
        } else 
          setDiff(res.data);
    }

    const saveData = (event) => {
        setValue(event.target.value);
    }

  return (
    <div className="App">
      <input placeholder="text to save" onChange={saveData}></input>
      <button type="button" onClick={saveStaticDataToFile}>Save</button>
      <br></br>
      <br></br>
      <br></br>
      {diff && <div>{diff}</div>}
    </div>
  );
}