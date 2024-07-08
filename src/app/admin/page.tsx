"use client";

import React from "react";

type AdminProps = {
  name: string;
};

const Admin: React.FC<AdminProps> = ({ name }) => {
  return (
    <>
      <div>
        <h1>Admin</h1>
      </div>
    </>
  );
};

export default Admin;
