import React from "react";
import { ADDRESSEE } from "./const";

export default function Header() {
  return (
    <header data-cy="header" className="p-4 bg-blue-200 italic">
      Chat with "{ADDRESSEE}"
    </header>
  );
}
