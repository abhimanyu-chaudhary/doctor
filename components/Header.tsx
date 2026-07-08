"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <Link href="/" className="nav-logo" onClick={() => setIsOpen(false)}>
        <span className="logo-accent">ONCO</span>MATTERS
      </Link>
      
      {/* Desktop Menu */}
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

      {/* Hamburger Toggle Button */}
      <button 
        className={`menu-toggle ${isOpen ? "open" : ""}`} 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label="Toggle Menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          <Link href="/" className={pathname === "/" ? "active-link" : ""} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about" className={pathname === "/about" || pathname === "/about/" ? "active-link" : ""} onClick={() => setIsOpen(false)}>
            Bio
          </Link>
          <Link href="/team" className={pathname === "/team" || pathname === "/team/" ? "active-link" : ""} onClick={() => setIsOpen(false)}>
            Surgical Team
          </Link>
          <Link href="/publications" className={pathname === "/publications" || pathname === "/publications/" ? "active-link" : ""} onClick={() => setIsOpen(false)}>
            Publications
          </Link>
          <Link href="/blogs" className={pathname === "/blogs" || pathname === "/blogs/" ? "active-link" : ""} onClick={() => setIsOpen(false)}>
            Blogs
          </Link>
          <Link href="/contact" className={pathname === "/contact" || pathname === "/contact/" ? "active-link" : ""} onClick={() => setIsOpen(false)}>
            Contact Coordinates
          </Link>
          <Link href="/admin" className="mobile-admin-link" onClick={() => setIsOpen(false)}>
            Admin CMS
          </Link>
        </nav>
      </div>

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
          z-index: 1001;
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

        /* Mobile Hamburger icon */
        .menu-toggle {
          display: none;
          position: relative;
          width: 30px;
          height: 30px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }

        .bar {
          position: absolute;
          left: 3px;
          width: 24px;
          height: 2px;
          background-color: white;
          transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
        }

        .bar:nth-child(1) {
          top: 9px;
        }

        .bar:nth-child(2) {
          top: 15px;
        }

        .bar:nth-child(3) {
          top: 21px;
        }

        .menu-toggle.open .bar:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }

        .menu-toggle.open .bar:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }

        .menu-toggle.open .bar:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: #0a0e17; /* Solid color to prevent transparent overlap leakage */
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translateX(100%);
          visibility: hidden;
          transition: transform 0.4s cubic-bezier(0.77, 0.2, 0.05, 1), visibility 0.4s ease;
        }

        .mobile-drawer.open {
          transform: translateX(0);
          visibility: visible;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.25rem;
          width: 100%;
        }

        .mobile-nav-links :global(a) {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.4s ease, transform 0.4s ease, color 0.2s ease;
        }

        .mobile-drawer.open .mobile-nav-links :global(a) {
          opacity: 1;
          transform: translateX(0);
        }

        /* Cascade delay timings for mobile navigation links */
        .mobile-nav-links :global(a:nth-child(1)) { transition-delay: 0.1s; }
        .mobile-nav-links :global(a:nth-child(2)) { transition-delay: 0.15s; }
        .mobile-nav-links :global(a:nth-child(3)) { transition-delay: 0.2s; }
        .mobile-nav-links :global(a:nth-child(4)) { transition-delay: 0.25s; }
        .mobile-nav-links :global(a:nth-child(5)) { transition-delay: 0.3s; }
        .mobile-nav-links :global(a:nth-child(6)) { transition-delay: 0.35s; }
        .mobile-nav-links :global(a:nth-child(7)) { transition-delay: 0.4s; }

        .mobile-nav-links :global(a:hover), .mobile-nav-links :global(a.active-link) {
          color: var(--primary);
        }

        .mobile-nav-links :global(a.mobile-admin-link) {
          font-size: 1.1rem;
          padding: 0.5rem 1.5rem;
          border: 1px solid var(--primary);
          border-radius: 30px;
          color: var(--primary);
          margin-top: 1rem;
        }

        @media (max-width: 1024px) {
          .nav-menu {
            display: none;
          }
          .menu-toggle {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
