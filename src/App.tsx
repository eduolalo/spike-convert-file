import React, { useState } from "react";

import "./App.css";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [encoded, setEncoded] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const encode = async () => {
    if (!file) {
      return;
    }
    console.log(typeof file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      const str = reader.result as string;
      setEncoded(str.split("base64,")[1]);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
      setEncoded(null);
    };
  };

  return (
    <>
      <h1>Ecoder file to base64</h1>
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button onClick={encode}>Encode to Base64</button>}
      <br />
      <br />
      {encoded && <textarea value={encoded} readOnly></textarea>}
    </>
  );
}

export default App;
