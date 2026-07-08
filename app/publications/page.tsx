"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DEFAULT_ARTICLES = [
  {
    id: "art-1",
    title: "Can compartment based complete mesocolic excision improve outcomes in patients with right colon cancer with metastatic D3 nodes?",
    authors: "Ballal DS, et al.",
    journal: "AME Clin Trials Rev",
    year: "2024",
    link: "#"
  },
  {
    id: "art-2",
    title: "Abdominoperineal Resection for T4 Low Rectal Cancer After Neoadjuvant Therapy—Are the Outcomes Acceptable?",
    authors: "Ballal DS, et al.",
    journal: "Indian Journal of Surgical Oncology",
    year: "2024",
    link: "https://doi.org/10.1007/S13193-024-02028-3"
  },
  {
    id: "art-3",
    title: "Impact of post-hepatectomy biliary leaks on long-term survival in different liver tumours: A single institute experience",
    authors: "Ballal DS, et al.",
    journal: "Ann Hepatobiliary Pancreat Surg",
    year: "2024",
    link: "https://doi.org/10.14701/AHBPS.24-078"
  }
];

export default function PublicationsPage() {
  const [articles, setArticles] = useState(DEFAULT_ARTICLES);
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");

  useEffect(() => {
    const isLocalNodeDev = typeof window !== "undefined" && window.location.hostname === "localhost" && window.location.port === "3000";
    if (isLocalNodeDev) {
      return;
    }

    fetch("../api.php?action=get_data")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && resData.data && resData.data.articles) {
          setArticles(resData.data.articles);
        }
      })
      .catch((err) => {
        console.warn("Using fallback local data on Publications page", err);
      });
  }, []);

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = 
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.journal.toLowerCase().includes(search.toLowerCase()) ||
      art.authors.toLowerCase().includes(search.toLowerCase());
    const matchesYear = selectedYear === "All" || art.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  const years = ["All", ...Array.from(new Set(articles.map((a) => a.year)))].sort().reverse();

  return (
    <div className="portfolio-container">
      <Header />

      <main className="subpage-main">
        <section className="pubs-intro">
          <span className="pubs-badge">Academic Contributions</span>
          <h1>Talks & Published Research</h1>
          <p>Scientific publications and clinical trial analyses exploring advanced robotic interventions, hepatectomy techniques, and oncological resections.</p>
        </section>

        <section className="pubs-controls-wrapper glass-panel">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by publication keyword, co-author, journal..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-box">
            <label>Filter by Year:</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {years.map((yr) => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="pubs-list-section">
          <div className="publications-list">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <div key={art.id} className="article-card glass-panel">
                  <div className="article-meta">
                    <span className="article-year">{art.year}</span>
                    <span className="article-journal">{art.journal}</span>
                  </div>
                  <h4 className="article-title">{art.title}</h4>
                  <p className="article-authors">{art.authors}</p>
                  {art.link && art.link !== "#" && (
                    <a href={art.link} target="_blank" rel="noopener noreferrer" className="article-link">
                      Access Scientific Publication 
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: 6}}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="no-results">No publications found matching criteria.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .subpage-main {
          padding: 8rem 5% 4rem 5%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .pubs-intro {
          text-align: center;
          margin-bottom: 4rem;
        }

        .pubs-badge {
          padding: 0.35rem 0.8rem;
          background: rgba(0, 242, 254, 0.08);
          border: 1px solid rgba(0, 242, 254, 0.2);
          border-radius: 20px;
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .pubs-intro h1 {
          font-family: var(--font-accent);
          font-size: 2.75rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, white, var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .pubs-intro p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .pubs-controls-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          padding: 1.25rem 2rem;
          margin-bottom: 3rem;
        }

        .search-box {
          flex: 1;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .search-box input:focus {
          border-color: var(--primary);
          outline: none;
        }

        .filter-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .filter-box select {
          padding: 0.75rem 1.25rem;
          background: var(--bg-primary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: var(--text-primary);
          cursor: pointer;
        }

        .publications-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .article-card {
          padding: 2rem;
        }

        .article-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .article-year {
          color: var(--primary);
          padding: 0.15rem 0.5rem;
          background: rgba(0, 242, 254, 0.08);
          border-radius: 4px;
        }

        .article-journal {
          color: var(--text-secondary);
          align-self: center;
        }

        .article-title {
          font-family: var(--font-accent);
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .article-authors {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
        }

        .article-link {
          display: inline-flex;
          align-items: center;
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 600;
          transition: var(--transition-fast);
          text-decoration: none;
        }

        .article-link:hover {
          color: var(--secondary);
        }

        .no-results {
          text-align: center;
          color: var(--text-secondary);
          padding: 3rem;
        }

        @media (max-width: 768px) {
          .pubs-controls-wrapper {
            flex-direction: column;
            gap: 1.25rem;
            align-items: stretch;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
