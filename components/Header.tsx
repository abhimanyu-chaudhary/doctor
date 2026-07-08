"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <Link href="/" className="nav-logo">
        <span className="logo-accent">ONCO</span>MATTERS
      </Link>
      <nav className="nav-menu">
        <Link href="/" className={pathname === "/" ? "active-link" : ""}>
          Home
        </Link>
        <Link href="/about" className={pathname === "/about" || pathname === "/about/" ? "active-link" : ""}>
          Bio
        </Link>
        <Link href="/team" className={pathname === "/team" || pathname === "/team/" ? "active-link" : ""}>
          Surgical Team
        </Link>
        <Link href="/publications" className={pathname === "/publications" || pathname === "/publications/" ? "active-link" : ""}>
          Publications
        </Link>
        <Link href="/blogs" className={pathname === "/blogs" || pathname === "/blogs/" ? "active-link" : ""}>
          Blogs
        </Link>
        <Link href="/contact" className={pathname === "/contact" || pathname === "/contact/" ? "active-link" : ""}>
          Contact Coordinates
        </Link>
        <Link href="/admin" className="nav-admin-link">
          Admin CMS
        </Link>
      </nav>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 5%;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 14, 23, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
        }

        .nav-logo {
          font-family: var(--font-accent);
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: 0.1em;
          color: white;
          text-decoration: none;
        }

        .logo-accent {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-menu :global(a) {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: var(--transition-fast);
          text-decoration: none;
        }

        .nav-menu :global(a:hover), .nav-menu :global(a.active-link) {
          color: var(--primary);
        }

        .nav-menu :global(a.nav-admin-link) {
          font-size: 0.85rem;
          padding: 0.4rem 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
        }

        .nav-menu :global(a.nav-admin-link:hover) {
          border-color: var(--primary);
          color: var(--primary);
        }

        @media (max-width: 1024px) {
          .nav-menu {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
