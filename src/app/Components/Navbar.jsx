"use client"; // if you want interactivity (clicks, routing)

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <strong>MyApp</strong>
        </div>

        <ul style={{ display: "flex", listStyle: "none", gap: "1rem", margin: 0, padding: 0 }}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="space-x-1">
          <button onClick={()=>signIn()} >Login</button>
          <Link href={"/register"}><button >Register</button></Link>
        </div>
      </div>
    </nav>
  );
}
