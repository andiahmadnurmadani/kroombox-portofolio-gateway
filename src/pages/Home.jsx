import { useRef } from 'react';
import { motion } from 'framer-motion';
import { KROOMBOX } from '../data.js';
import { FadeIn, Stagger, itemFade } from '../components/Effects.jsx';
import TextType from '../components/TextType.jsx';
import RotatingText from '../components/RotatingText.jsx';
import LogoLoop from '../components/LogoLoop.jsx';
import MemberCard from '../components/MemberCard.jsx';
import '../components/MemberCard.css';

const milestones = [
  { y: '2024 Q1', t: 'Kroombox didirikan di Jakarta', d: 'Tiga co-founder mulai dari garasi dengan fokus hosting transparan.' },
  { y: '2024 Q2', t: 'Seed round 1.2M USD', d: 'Dipimpin AtapID VC bersama angel investor lokal.' },
  { y: '2024 Q3', t: 'Migrasi 100% ke Kubernetes', d: 'Zero downtime, deploy turun dari 12 menit ke 47 detik.' },
  { y: '2024 Q4', t: 'Ekspansi 4 region', d: 'Jakarta, Singapore, Frankfurt, Virginia — renewable mix 41%.' },
  { y: '2025 Q1', t: 'Renewable naik ke 83%', d: 'PPA panel surya ditandatangani dengan Hijau Daya.' },
  { y: '2025 Q2', t: '1.240+ klien aktif', d: 'Churn rate turun ke 1.4%, NPS skor 72.' }
];

const features = [
  { icon: '◈', title: 'Compute per-jam', body: 'VM & container dengan billing transparan. Tanpa minimum commit, bayar sesuai detik pemakaian.' },
  { icon: '▣', title: 'Object Storage', body: 'S3-compatible storage dengan redundansi 3 region. 11 nines durability untuk data kritis.' },
  { icon: '◉', title: 'Edge Network', body: 'CDN anycast 56 POP global. Cache invalidation real-time per objek, p50 latency 24 ms.' },
  { icon: '◐', title: 'Managed Database', body: 'Postgres & Redis managed dengan auto-scaling read replica dan point-in-time recovery.' },
  { icon: '◇', title: 'Carbon Reporting', body: 'Pelaporan emisi per workload. Pilih region hijau dan lihat dampak energi secara real-time.' },
  { icon: '◎', title: 'Status Publik', body: 'Status page, runbook, dan insiden diumumkan jujur. Tidak ada maintenance window yang disembunyikan.' }
];

const enterprise = [
  { icon: '✓', title: 'ISO 27001 & SOC 2 di pipeline', body: 'Keamanan dan compliance dibangun sejak hari pertama, bukan setelah insiden.' },
  { icon: '✓', title: 'Private network & VPC peering', body: 'Isolasi jaringan per tenant dengan opsi peering ke cloud provider lain.' },
  { icon: '✓', title: 'Support response SLA 15 menit', body: 'Tim engineer lokal siap on-call 24/7 dengan eskalasi langsung ke core team.' }
];

function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="180" width="120" height="100" rx="8" stroke="black" strokeWidth="2" fill="#fafafa" />
      <rect x="60" y="200" width="80" height="12" rx="2" fill="#000" />
      <rect x="60" y="220" width="60" height="8" rx="2" fill="#6c6c6c" />
      <rect x="60" y="236" width="70" height="8" rx="2" fill="#6c6c6c" />
      <rect x="60" y="252" width="50" height="8" rx="2" fill="#ff5b29" />

      <rect x="180" y="120" width="120" height="100" rx="8" stroke="black" strokeWidth="2" fill="#fafafa" />
      <rect x="200" y="140" width="80" height="12" rx="2" fill="#000" />
      <rect x="200" y="160" width="60" height="8" rx="2" fill="#6c6c6c" />
      <rect x="200" y="176" width="70" height="8" rx="2" fill="#6c6c6c" />
      <rect x="200" y="192" width="50" height="8" rx="2" fill="#ff5b29" />

      <rect x="100" y="40" width="120" height="80" rx="8" stroke="black" strokeWidth="2" fill="#f5ff80" />
      <rect x="120" y="60" width="80" height="12" rx="2" fill="#000" />
      <rect x="120" y="80" width="50" height="8" rx="2" fill="#000" />

      <path d="M160 120 L160 160 L180 160" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M240 180 L240 200 L300 200 L300 120" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M100 180 L80 180 L80 100 L100 100" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M320 200 L360 200 L360 100 L320 100" stroke="black" strokeWidth="2" strokeDasharray="4 4" />

      <circle cx="300" cy="90" r="24" stroke="black" strokeWidth="2" fill="#fafafa" />
      <path d="M292 90 L300 98 L316 82" stroke="#ff5b29" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="320" cy="90" r="6" fill="#f5ff80" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <div className="announcement">
        <b>Kroombox Gateway</b> — Portofolio tim, produk, dan partner · {KROOMBOX.founded}
      </div>

      <header className="topnav">
        <div className="topnav-brand">
          <img src="/image/logo.png" alt="Kroombox" />
          Kroombox
        </div>
        <nav className="topnav-links">
          <a href="#overview">Overview</a>
          <a href="#features">Fitur</a>
          <a href="#startup">Startup</a>
          <a href="#team">Tim</a>
          <a href="#partners">Partner</a>
        </nav>
        <div className="topnav-right">
          <div className="topnav-stat">UPTIME {KROOMBOX.stats.uptime}</div>
          <button className="topnav-cta">Hubungi kami</button>
        </div>
      </header>

      <section className="hero" id="overview">
        <div className="container">
          <div className="hero-grid">
            <FadeIn>
              <div className="hero-eyebrow">Kroombox Gateway / v2026.07</div>
              <h1 className="hero-title">
                Hosting yang
                <RotatingText
                  texts={['transparan,', 'cepat,', 'hijau.']}
                  mainClassName="hero-rotate"
                  splitBy="characters"
                  staggerFrom="last"
                  staggerDuration={0.022}
                  rotationInterval={2400}
                  transition={{ type: 'spring', damping: 28, stiffness: 380 }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-120%', opacity: 0 }}
                />
              </h1>
              <p className="hero-body">
                {KROOMBOX.description} Platform infrastruktur untuk tim yang tidak ingin menebak-nebak tagihan atau membuang energi.
              </p>
              <div className="hero-type-line">
                <TextType
                  text={[
                    'Transparansi biaya, tanpa hidden fees.',
                    'Infrastruktur cepat, latency rendah.',
                    'Energi hijau, 83% renewable.',
                  ]}
                  typingSpeed={60}
                  deletingSpeed={25}
                  pauseDuration={2800}
                  initialDelay={800}
                  loop={true}
                  showCursor={true}
                  cursorCharacter="▌"
                  cursorBlinkDuration={0.45}
                  textColors={['var(--color-signal-orange)', 'var(--color-signal-orange)', 'var(--color-signal-orange)']}
                  cursorClassName="hero-cursor"
                />
              </div>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#team">Lihat tim →</a>
                <a className="btn btn-secondary" href="#features">Jelajahi produk</a>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="hero-illustration">
                <HeroIllustration />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <FadeIn>
            <div className="stats-banner">
              <div className="stat-col">
                <div className="stat-value">{KROOMBOX.stats.uptime}</div>
                <div className="stat-label">Uptime Rata-rata</div>
              </div>
              <div className="stat-col">
                <div className="stat-value">{KROOMBOX.stats.clients}</div>
                <div className="stat-label">Klien Aktif</div>
              </div>
              <div className="stat-col">
                <div className="stat-value">{KROOMBOX.stats.dataCenters}</div>
                <div className="stat-label">Region DC</div>
              </div>
              <div className="stat-col">
                <div className="stat-value">{KROOMBOX.stats.renewable}</div>
                <div className="stat-label">Renewable Mix</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="features">
        <div className="container">
          <FadeIn>
            <div className="kicker">01 / Product</div>
            <h2 className="section-title">Empat pilar <span>layanan</span></h2>
            <p className="section-subtitle">Infrastruktur yang dirancang untuk transparency, kecepatan, dan keberlanjutan sejak awal.</p>
          </FadeIn>
          <Stagger className="feature-grid" gap={0.08}>
            {features.map((f) => (
              <motion.div key={f.title} className="feature-card" variants={itemFade}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-body">{f.body}</div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="timeline-section" id="startup">
        <div className="container">
          <FadeIn>
            <div className="kicker">02 / Startup</div>
            <h2 className="section-title">Perjalanan <span>18 bulan</span></h2>
            <p className="section-subtitle">Dari garasi hingga 4 region dalam setahun.</p>
          </FadeIn>
          <Stagger className="timeline" gap={0.08}>
            {milestones.map((m, i) => (
              <motion.div key={i} className="timeline-item" variants={itemFade}>
                <div className="timeline-dot" />
                <div className="timeline-year">{m.y}</div>
                <div>
                  <div className="timeline-title">{m.t}</div>
                  <div className="timeline-desc">{m.d}</div>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <section>
        <div className="container">
          <FadeIn>
            <div className="kicker">03 / Enterprise</div>
            <h2 className="section-title">Dibangun untuk <span>skala</span></h2>
          </FadeIn>
          <div className="detail-block" style={{ marginTop: 24 }}>
            {enterprise.map((e, i) => (
              <div key={i} className="enterprise-row">
                <div className="enterprise-icon">{e.icon}</div>
                <div>
                  <div className="enterprise-title">{e.title}</div>
                  <div className="enterprise-body">{e.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team">
        <div className="container">
          <FadeIn>
            <div className="kicker">04 / Team</div>
            <h2 className="section-title">{KROOMBOX.members.length} orang di <span>balik layar</span></h2>
            <p className="section-subtitle">Klik kartu anggota untuk melihat detail lengkap setiap individu.</p>
          </FadeIn>
          <Stagger className="team-grid" gap={0.06}>
            {KROOMBOX.members.map((m) => (
              <MemberCard key={m.id} m={m} />
            ))}
          </Stagger>
        </div>
      </section>

      <section className="partner-strip" id="partners">
        <div className="container">
          <div className="partner-label">Ditopang oleh partner</div>
        </div>
        <div className="partner-loop">
          <LogoLoop
            logos={KROOMBOX.partnerLogos}
            speed={45}
            direction="left"
            logoHeight={36}
            gap={48}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#fafafa"
            ariaLabel="Partner Kroombox"
          />
        </div>
      </section>

      <section style={{ paddingTop: 32 }}>
        <div className="container">
          <FadeIn>
            <div className="callout">
              <div className="callout-text">Siap migrasi ke hosting yang lebih transparan dan hijau?</div>
              <button className="btn btn-primary">Mulai konsultasi →</button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
