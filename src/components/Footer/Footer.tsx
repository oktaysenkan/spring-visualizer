import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="absolute bottom-14 text-zinc-400 text-sm">
      Made by
      <Link
        className="ml-1 text-zinc-200 hover:text-zinc-100"
        href="https://github.com/oktaysenkan"
        rel="noopener noreferrer"
        target="_blank"
      >
        @oktaysenkan
      </Link>
    </footer>
  );
};

export default Footer;
