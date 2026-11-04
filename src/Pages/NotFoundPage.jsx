import { Link } from 'react-router-dom'

// Shown for any URL that doesn't match a page (RouteSeo marks it noindex)
export default function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="section-label">Error 404</span>
      <h1>Page not found</h1>
      <p>The page you are looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary"><span>Back to Home</span></Link>

      <style>{`
        .not-found {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 140px 24px 80px;
          text-align: center;
          background: var(--text-dark);
          color: var(--cloud-white);
        }
        .not-found h1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 300;
        }
        .not-found p { color: rgba(255, 255, 255, 0.6); margin-bottom: 16px; }
        .not-found .btn-primary { background: var(--cloud-white); color: var(--text-dark); }
      `}</style>
    </main>
  )
}
