import { useState } from "react";
import Sidebar from "./Sidebar";

export default function OwnerLayout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <main className="content ">
        {/* <Topbar setIsSidebar={setIsSidebar} /> */}
        {children}
      </main>
    </div>
  );
}
