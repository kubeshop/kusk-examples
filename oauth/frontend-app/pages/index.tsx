import React from "react";
import { Layout } from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      <div>
        <a
          href="/user"
          className="bg-green-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          Log In
        </a>
      </div>
    </Layout>
  );
};

export default Index;
