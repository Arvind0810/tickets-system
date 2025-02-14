"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DownloadButton from "../download-btn/download-btn";

export default function Navbar() {
  const { user } = useAuth(); // Get user from context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Tickets</span>
            Next Tickets
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 items-center">
          {user && <Link href="/dashboard" className="text-sm font-semibold text-gray-900">Dashboard</Link>}
          {user && <Link href="/tickets" className="text-sm font-semibold text-gray-900">Tickets</Link>}
          {!user && <Link href="/login" className="btn primary">Log in</Link>}
          {user && <DownloadButton />}
          {user && <Link href="/logout" className="bg-red-500 py-2 px-3 rounded text-white">Log Out</Link>}
        </div>
      </nav>
    </header>
  );
}
