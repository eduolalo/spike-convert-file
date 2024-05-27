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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const str = reader.result as string;
      setEncoded(str);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
      setEncoded(null);
    };
  };

  const selectAll = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.select();
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
      {encoded && (
        <textarea
          className="card"
          onFocus={selectAll}
          value={encoded}
          readOnly
        ></textarea>
      )}
      <br />
      <img src="" alt="" />
    </>
  );
}

export default App;
