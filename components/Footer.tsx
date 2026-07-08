"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer glass-panel">
      <div className="footer-grid">
        <div className="footer-brand">
          <h4>DR. DEVESH S. BALLAL</h4>
          <p>Consultant - Surgical Oncology & Robotic Surgery</p>
        </div>
        <div className="footer-links">
          <h5>Quick Links</h5>
          <div className="links-col">
            <Link href="/">Home</Link>
            <Link href="/about">Bio / Timeline</Link>
            <Link href="/team">Surgical Team</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/contact">Contact Coordinates</Link>
          </div>
        </div>
        <div className="footer-contact">
          <h5>Contact Timings</h5>
          <p>📍 Manipal Hospital, Old Airport Road, Bangalore</p>
          <p>📞 Phone: 1800 102 5555 / 080-22221111</p>
          <p>⏰ Outpatient: Monday - Saturday (9:00 AM - 4:00 PM)</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Dr. Devesh S. Ballal. All Rights Reserved. | <Link href="/admin">Portal Access</Link></p>
      </div>

      <style jsx>{`
        .footer {
          margin-top: 6rem;
          padding: 4rem 5% 2rem 5%;
          border-radius: 0;
          border-left: none;
          border-right: none;
          border-bottom: none;
          background: rgba(10, 14, 23, 0.9);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 1fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        .footer-brand h4 {
          font-family: var(--font-accent);
          font-weight: 700;
          font-size: 1.2rem;
          color: white;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .footer-brand p {
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .footer-links h5, .footer-contact h5 {
          font-family: var(--font-accent);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .links-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .links-col :global(a) {
          color: var(--text-secondary);
          font-size: 0.85rem;
          text-decoration: none;
          transition: var(--transition-fast);
        }

        .links-col :global(a:hover) {
          color: var(--primary);
        }

        .footer-contact p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .footer-bottom :global(a) {
          color: var(--primary);
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
