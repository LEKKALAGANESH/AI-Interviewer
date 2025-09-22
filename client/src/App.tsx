import React from "react";
import Interview from "./components/Interview";

const App: React.FC = () => {
  return (
    <div className="app min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">AI Interviewer</h1>
        <p className="text-gray-600 text-center">
          Conduct your face-to-face mock interview for SDE Intern role
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <Interview />
      </main>
    </div>
  );
};

export default App;
