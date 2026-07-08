"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Local fallback data matching manipal hospitals blogs
const DEFAULT_BLOGS = [
  {
    id: "blog-1",
    title: "Everything You Need To Know About Robot-Assisted Hysterectomy",
    date: "Aug 01, 2025",
    readTime: "7 min read",
    link: "https://www.manipalhospitals.com/oldairportroad/blog/robot-assisted-hysterectomy/",
    image: "https://www.manipalhospitals.com/uploads/blog/Robot_Assisted_Hysterectomy.png",
    summary: "Robotic hysterectomies are transforming gynecological surgeries with unprecedented precision. Dr. Devesh S. Ballal explains the benefits, staging recovery, and patient-centered workflows."
  },
  {
    id: "blog-2",
    title: "Robotic Surgery: Transforming the Future of Minimally Invasive Care",
    date: "Aug 01, 2025",
    readTime: "6 min read",
    link: "https://www.manipalhospitals.com/oldairportroad/blog/robotic-surgery-benefits-procedures/",
    image: "https://www.manipalhospitals.com/uploads/blog/How_Robotic_Surgery_is_Revolutionizing_Minimally_Invasive_Procedures.png",
    summary: "Robotic technology provides surgeons with detailed 3D visualization and superior range of motion, translating directly to smaller incisions, shorter hospital stays, and safer resections."
  }
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);

  useEffect(() => {
    const isLocalNodeDev = typeof window !== "undefined" && window.location.hostname === "localhost" && window.location.port === "3000";
    if (isLocalNodeDev) {
      return;
    }

    fetch("../api.php?action=get_data")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && resData.data && resData.data.blogs) {
          setBlogs(resData.data.blogs);
        }
      })
      .catch((err) => {
        console.warn("Using fallback local data on Blogs page", err);
      });
  }, []);

  return (
    <div className="portfolio-container">
      <Header />

      <main className="subpage-main">
        <section className="blogs-intro">
          <span className="blogs-badge">Cancer Care Insights</span>
          <h1>Healthcare Blogs & Articles</h1>
          <p>Scientific perspectives, explanation of robotic procedures, and advice on surgical oncology treatments from Dr. Devesh S. Ballal.</p>
        </section>

        <section className="blogs-grid-section">
          <div className="blogs-grid">
            {blogs.map((post) => (
              <div key={post.id} className="blog-card-full glass-panel">
                <div className="blog-card-image">
                  {post.image ? (
                    <img src={post.image} alt={post.title} />
                  ) : (
                    <div className="image-placeholder">Oncology Blog</div>
                  )}
                </div>
                
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-card-date">📅 {post.date}</span>
                    <span className="blog-card-read">⏱️ {post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                  
                  <div className="card-footer-action">
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="read-more-btn">
                      Read Full Article 
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: 6}}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .subpage-main {
          padding: 8rem 5% 4rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .blogs-intro {
          text-align: center;
          margin-bottom: 4rem;
        }

        .blogs-badge {
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

        .blogs-intro h1 {
          font-family: var(--font-accent);
          font-size: 2.75rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, white, var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blogs-intro p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2.5rem;
        }

        .blog-card-full {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: var(--transition-smooth);
        }

        .blog-card-image {
          width: 100%;
          aspect-ratio: 1.6;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid var(--border-color);
        }

        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .blog-card-full:hover .blog-card-image img {
          transform: scale(1.03);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .blog-card-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .blog-card-meta {
          display: flex;
          gap: 1.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.85rem;
        }

        .blog-card-body h3 {
          font-family: var(--font-accent);
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.4;
          color: white;
          margin-bottom: 0.85rem;
        }

        .blog-card-body p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.55;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .read-more-btn {
          display: inline-flex;
          align-items: center;
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 700;
          transition: var(--transition-fast);
          text-decoration: none;
        }

        .read-more-btn:hover {
          color: var(--secondary);
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .blogs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
