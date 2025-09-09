import React, { useState } from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { AnimatePresence, motion } from 'framer-motion';

export const PageTransitionDemo: React.FC = () => {
  const [page, setPage] = useState(0);

  return (
    <div style={{ position: 'relative', width: 520, height: 320 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setPage(0)} style={btnStyle(page === 0)}>Overview</button>
        <button onClick={() => setPage(1)} style={btnStyle(page === 1)}>Details</button>
        <button onClick={() => setPage(2)} style={btnStyle(page === 2)}>Insights</button>
      </div>

      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 260 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] } }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -10, transition: { duration: 0.2 } }}
            style={cardStyle}
          >
            {page === 0 && <Section title="Overview" color="linear-gradient(135deg, #60a5fa33, #c084fc33)" />}
            {page === 1 && <Section title="Details" color="linear-gradient(135deg, #34d39933, #60a5fa33)" />}
            {page === 2 && <Section title="Insights" color="linear-gradient(135deg, #f472b633, #f59e0b33)" />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; color: string }> = ({ title, color }) => (
  <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
    <div style={{
      width: '90%', height: '75%', borderRadius: 16, padding: 24,
      background: `rgba(255,255,255,0.06)`,
      backdropFilter: 'blur(10px) saturate(120%)', WebkitBackdropFilter: 'blur(10px) saturate(120%)',
      border: '1px solid rgba(255,255,255,0.15)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.22)',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: color, pointerEvents: 'none' }} />
      <h3 style={{ position: 'relative', margin: 0, zIndex: 1 }}>{title}</h3>
      <p style={{ position: 'relative', zIndex: 1, opacity: 0.8 }}>Glass page transition demo</p>
    </div>
  </div>
);

const cardStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
};

const btnStyle = (active: boolean): React.CSSProperties => ({
  padding: '6px 10px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.2)',
  background: active ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
  color: 'white',
});

export default PageTransitionDemo;

