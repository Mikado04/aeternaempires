import { useEffect, useRef, useCallback } from "react";

/* --- Réglages --- */
const PARTICLE_DENSITY = 0.00012; // densité des particules interactives (baisse si ça rame)
const BG_PARTICLE_DENSITY = 0.00005; // poussière d'arrière-plan
const MOUSE_RADIUS = 180; // rayon d'influence de la souris
const RETURN_SPEED = 0.08; // vitesse de retour à l'origine (ressort)
const DAMPING = 0.9; // frottement
const REPULSION_STRENGTH = 1.2; // force de répulsion
const MAX_PARTICLES = 260; // garde-fou perfs (collisions en O(n²))

/* Couleurs de la marque */
const ACCENT = "#C81E2A"; // rouge Aeterna (remplace le bleu Google)
const ACCENT_RGB = "200, 30, 42";

const randomRange = (min, max) => Math.random() * (max - min) + min;

const HeroParticles = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const particlesRef = useRef([]);
  const backgroundParticlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });
  const frameIdRef = useRef(0);

  // Initialisation des particules
  const initParticles = useCallback((width, height) => {
    const count = Math.min(
      Math.floor(width * height * PARTICLE_DENSITY),
      MAX_PARTICLES
    );
    const particles = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: randomRange(1, 2.5),
        color: Math.random() > 0.9 ? ACCENT : "#ffffff", // 10% de particules rouges
      });
    }
    particlesRef.current = particles;

    const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY);
    const bg = [];
    for (let i = 0; i < bgCount; i++) {
      bg.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: randomRange(0.5, 1.5),
        alpha: randomRange(0.1, 0.4),
        phase: Math.random() * Math.PI * 2,
      });
    }
    backgroundParticlesRef.current = bg;
  }, []);

  // Boucle d'animation
  const animate = useCallback((time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Halo radial pulsant (rouge très léger)
    const cx = w / 2;
    const cy = h / 2;
    const pulseOpacity = Math.sin(time * 0.0008) * 0.035 + 0.075;
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.7);
    gradient.addColorStop(0, `rgba(${ACCENT_RGB}, ${pulseOpacity})`);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // 2. Poussière d'arrière-plan scintillante
    const bg = backgroundParticlesRef.current;
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < bg.length; i++) {
      const p = bg[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5;
      ctx.globalAlpha = p.alpha * (0.3 + 0.7 * twinkle);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 3. Particules interactives
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Forces : souris + ressort
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (mouse.isActive && distance < MOUSE_RADIUS && distance > 0) {
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        const repulsion = force * REPULSION_STRENGTH;
        p.vx -= (dx / distance) * repulsion * 5;
        p.vy -= (dy / distance) * repulsion * 5;
      }
      p.vx += (p.originX - p.x) * RETURN_SPEED;
      p.vy += (p.originY - p.y) * RETURN_SPEED;
    }

    // Collisions élastiques
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = p1.size + p2.size;
        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          if (dist > 0.01) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            p1.x -= nx * overlap * 0.5;
            p1.y -= ny * overlap * 0.5;
            p2.x += nx * overlap * 0.5;
            p2.y += ny * overlap * 0.5;
            const dvx = p1.vx - p2.vx;
            const dvy = p1.vy - p2.vy;
            const vAlongNormal = dvx * nx + dvy * ny;
            if (vAlongNormal > 0) {
              const m1 = p1.size;
              const m2 = p2.size;
              const restitution = 0.85;
              const impulse = (-(1 + restitution) * vAlongNormal) / (1 / m1 + 1 / m2);
              p1.vx += (impulse * nx) / m1;
              p1.vy += (impulse * ny) / m1;
              p2.vx -= (impulse * nx) / m2;
              p2.vy -= (impulse * ny) / m2;
            }
          }
        }
      }
    }

    // Intégration + dessin
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x += p.vx;
      p.y += p.vy;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.3 + velocity * 0.1, 1);
      ctx.fillStyle = p.color === "#ffffff" ? `rgba(255,255,255,${opacity})` : p.color;
      ctx.fill();
    }

    frameIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Redimensionnement (gère le devicePixelRatio pour la netteté)
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [initParticles]);

  // Démarrage / arrêt de la boucle
  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true,
    };
  };
  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default HeroParticles;
