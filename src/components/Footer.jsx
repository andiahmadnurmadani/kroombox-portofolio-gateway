import { KROOMBOX } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 Kroombox Gateway — {KROOMBOX.tagline}</span>
      <span>Uptime <b>{KROOMBOX.stats.uptime}</b> · Renewable <b>{KROOMBOX.stats.renewable}</b></span>
    </footer>
  );
}
