import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="public-header">
      <div className="public-container public-header-inner">
        <Link href="/" className="public-brand">
          <strong>TOTAL GAMING</strong>
          <span>ESPORTS STATISTICS</span>
        </Link>

        <nav className="public-nav">
          <Link href="/">Overview</Link>
          <Link href="/matches">Matches</Link>
          <Link href="/tournaments">Tournaments</Link>
          <Link href="/players">Players</Link>
        </nav>

        <div className="public-country">
          🇮🇳 INDIA
        </div>
      </div>
    </header>
  );
}
