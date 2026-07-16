import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function MemberCard({ m, index = 0 }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 12 });
  const sy = useSpring(my, { stiffness: 120, damping: 12 });
  const rot = useTransform(sx, [-100, 100], [-6, 6]);
  const ropeRot = useTransform(sx, [-100, 100], [-3, 3]);

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + 24));
  }
  function onLeave() { mx.set(0); my.set(0); }

  const code = `KBOX-${m.id.slice(0, 3).toUpperCase()}-${(index + 1).toString().padStart(2, '0')}`;

  return (
    <Link
      to={`/members/${m.id}`}
      className="lanyard-wrap"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div className="lanyard-rope" style={{ rotate: ropeRot }} />
      <div className="lanyard-clip" />
      <motion.div
        ref={ref}
        className="lanyard-card"
        style={{ rotate: rot, y: sy }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="lanyard-head">
          <div className="avatar">{m.avatar}</div>
          <div className="meta-block">
            <div className="name">{m.name}</div>
            <div className="role">{m.role}</div>
          </div>
          <button className="more" aria-label="More" onClick={(e) => e.preventDefault()}>···</button>
        </div>
        <div className="lanyard-id">
          <span>ID Badge</span>
          <span className="code">{code}</span>
        </div>
        <div className="lanyard-focus">{m.focus}</div>
        <div className="lanyard-foot">
          <div className="tags">
            {m.skills.slice(0, 2).map((s) => <span key={s} className="tag">{s}</span>)}
          </div>
          <div className="metric-mini">{m.metric.value}</div>
        </div>
      </motion.div>
    </Link>
  );
}
