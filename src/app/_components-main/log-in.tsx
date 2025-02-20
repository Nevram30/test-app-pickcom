"use client";
import React from "react";
import { AppProps } from "~/prop/types";

// # place the properties in the right-side of the React.FC..
// const LogInComponent: React.FC<AppProps> = ({}) => ...

const LogIn: React.FC<AppProps> = ({}) => {
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

export default LogIn;
