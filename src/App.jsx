import React, { useState } from "react";

function App() {
  const [jokes, setJokes] = useState("Button To Dbao Ustadd");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("Any");
  const [bgColor, setBgColor] = useState("bg-gradient-to-r from-blue-400 to-purple-500");

  const toggleBgColor = () => {
    setBgColor(prevColor =>
      prevColor === "bg-gradient-to-r from-blue-400 to-purple-500"
        ? "bg-gradient-to-r from-green-400 to-blue-500"
        : "bg-gradient-to-r from-blue-400 to-purple-500"
    );
  };

  const fetchJoke = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
      const data = await res.json();
      
      const jokeText = data.type === "twopart" 
        ? `${data.setup} ... ${data.delivery}` 
        : data.joke;

      setJokes(jokeText);
    } catch (error) {
      setJokes("Joke loading failed, try again!");
    }

    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${bgColor} `}>
      <nav className="w-full flex justify-end p-4 ">
        <button
          className="px-4 py-2 text-white bg-gray-800 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mx-auto cursor-pointer"
          onClick={toggleBgColor}
        >
          Toggle Background
        </button>
      </nav>
      <h1 className="text-5xl font-extrabold text-white mb-4">Jokes Generator</h1>
      <p className="text-lg text-white mb-4">Select a category and generate a joke</p>

      
      <select
        className=" px-1 py-2 mb-4 text-lg font-medium bg-white rounded-md shadow-md focus:outline-none  focus:ring-2 focus:ring-indigo-500 text-center appearance-none cursor-pointer"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Any">Any</option>
        <option value="Programming">Programming</option>
        <option value="Dark">Dark</option>
        <option value="Pun">Pun</option>
        <option value="Spooky">Spooky</option>
        <option value="Christmas">Christmas</option>
      </select>

      <button
        className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 flex items-center gap-2 cursor-pointer"
        onClick={fetchJoke}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24 cursor-not-allowed">
              <circle className="opacity-25 cursor-not-allowed " cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
              <path className="opacity-75 cursor-not-allowed" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Loading...
          </>
        ) : (
          "Generate Joke"
        )}
      </button>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-xl font-bold text-center text-gray-800">
          {isLoading ? "Fetching a joke..." : jokes}
        </p>
        <p className="text-lg font-medium text-center text-gray-600 mt-4 underline">
          {category !== "Any" ? `Category: ${category}` : ""}
        </p>
      </div>
    </div>
  );
}

export default App;
