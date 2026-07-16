import { useState, useEffect, useRef } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import MemberDetail from './pages/MemberDetail.jsx';
import { KROOMBOX } from './data.js';

function Tooltip({ member, onClose, onNavigate }) {
  if (!member) return null;
  return (
    <motion.div
      className="side-tooltip"
      initial={{ opacity: 0, x: -8, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -8, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="side-tooltip-arrow" />
      <button className="side-tooltip-close" onClick={onClose} aria-label="Tutup">×</button>
      <div className="side-tooltip-initial">{member.initials}</div>
      <div className="side-tooltip-name">{member.name}</div>
      <div className="side-tooltip-role">{member.role}</div>
      <div className="side-tooltip-meta">{member.location} · {member.joined}</div>
      <button
        className="side-tooltip-go"
        onClick={() => onNavigate(member.id)}
      >
        Buka detail →
      </button>
    </motion.div>
  );
}

function MemberSlot({ m, activeId, onActivate }) {
  const ref = useRef(null);
  const isActive = activeId === m.id;
  return (
    <button
      ref={ref}
      type="button"
      className={'side-slot' + (isActive ? ' active' : '')}
      onClick={(e) => {
        e.stopPropagation();
        const rect = ref.current.getBoundingClientRect();
        onActivate(m.id, rect);
      }}
      onDoubleClick={() => onActivate(null, null)}
    >
      <div className="side-slot-initial">{m.initials}</div>
    </button>
  );
}

function Sidebar({ activeId, onActivate, onNavigate }) {
  const [tooltip, setTooltip] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onActivate(null, null);
        setTooltip(null);
      }
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [onActivate]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        onActivate(null, null);
        setTooltip(null);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onActivate]);

  function handleActivate(id, rect) {
    if (id === null) {
      onActivate(null, null);
      setTooltip(null);
      return;
    }
    const m = KROOMBOX.members.find((x) => x.id === id);
    if (!m || !rect) return;
    setTooltip({
      member: m,
      top: rect.top + rect.height / 2,
      left: rect.right + 10
    });
    onActivate(id, rect);
  }

  return (
    <aside className="sidebar" ref={ref}>
      <NavLink to="/" end className="side-logo" title="Overview" onClick={() => handleActivate(null, null)}>
        <img src="/image/logo.png" alt="Kroombox" />
      </NavLink>

      <div className="side-divider" />

      <div className="side-section">
        {KROOMBOX.members.map((m) => (
          <MemberSlot
            key={m.id}
            m={m}
            activeId={activeId}
            onActivate={handleActivate}
          />
        ))}
      </div>

      <div className="side-avatar" title="Account">AN</div>

      {/* Fixed tooltip anchored to clicked slot */}
      <AnimatePresence>
        {tooltip && (
          <div
            className="side-tooltip-anchor"
            style={{ top: tooltip.top, left: tooltip.left }}
          >
            <Tooltip
              member={tooltip.member}
              onClose={() => handleActivate(null, null)}
              onNavigate={(id) => { onNavigate(id); handleActivate(null, null); }}
            />
          </div>
        )}
      </AnimatePresence>
    </aside>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="app">
      <Sidebar
        activeId={activeId}
        onActivate={(id) => setActiveId(id)}
        onNavigate={(id) => { navigate(`/members/${id}`); setActiveId(null); }}
      />
      <div className="shell">
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/members/:id" element={<MemberDetail />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}
