import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KROOMBOX } from '../data.js';
import { FadeIn, Stagger, itemFade } from '../components/Effects.jsx';

export default function MemberDetail() {
  const { id } = useParams();
  const m = KROOMBOX.members.find((x) => x.id === id) || KROOMBOX.members[0];

  return (
    <section className="detail">
      <div className="container">
        <FadeIn>
          <Link className="detail-back" to="/">← Kembali ke overview</Link>
        </FadeIn>

        <div className="detail-grid">
          <FadeIn>
            <div className="detail-profile">
              <div className="detail-avatar">{m.initials}</div>
              <div className="detail-name">{m.name}</div>
              <div className="detail-role">{m.role}</div>
              <div className="detail-id">KBOX-{m.id.slice(0,3).toUpperCase()}-001</div>
              <div className="detail-meta">
                <div><b>Bergabung</b> {m.joined}</div>
                <div><b>Lokasi</b> {m.location}</div>
                <div><b>Fokus</b> {m.focus}</div>
              </div>
            </div>
          </FadeIn>

          <div>
            <Stagger className="detail-metrics" gap={0.08}>
              <motion.div className="detail-metric" variants={itemFade}>
                <div className="v">{m.metric.value}</div>
                <div className="k">{m.metric.label}</div>
              </motion.div>
              <motion.div className="detail-block" variants={itemFade}>
                <div className="detail-block-title">Keahlian utama</div>
                <div className="partner-grid" style={{ justifyContent: 'flex-start', marginTop: 6 }}>
                  {m.skills.map((s) => <span key={s} className="partner-pill">{s}</span>)}
                </div>
              </motion.div>
            </Stagger>

            <Stagger>
              <motion.div className="detail-block" variants={itemFade}>
                <div className="detail-block-title">Tentang</div>
                <p>{m.bio}</p>
              </motion.div>
              <motion.div className="detail-block" variants={itemFade}>
                <div className="detail-block-title">Tugas & tanggung jawab</div>
                <ul className="detail-list">
                  {m.tasks.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </motion.div>
              <motion.div className="detail-block" variants={itemFade}>
                <div className="detail-block-title">Pencapaian di Kroombox</div>
                <ul className="detail-list ach">
                  {m.achievements.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </motion.div>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
