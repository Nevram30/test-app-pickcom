import React from "react";

interface AppProps {
  name: string;
}

const App: React.FC<AppProps> = ({ name }) => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">First Steps →</h1>
        <div className="text-lg">
          Just the basics - Everything you need to know to set up your database
          and authentication.
        </div>
      </div>
    </>
  );
};

export default App;
