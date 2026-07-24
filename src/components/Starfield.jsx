import { useEffect, useRef } from "react";

const Starfield = ({
  starCount = 25000,
  waveFrequency = 20,
  starEscapeWidth = 255,
  voidWidth = 100,
  starColor = { r: 168, g: 85, b: 247 },
  maxOpacity = 255,
  rotationSpeed = 0.0005,
  waveSpeed = 0.01,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const starsRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas.getContext("2d");
    let size = { x: 0, y: 0 };
    let imagedata, buf, buf8, data;
    let startTime = Date.now();
    let currentTime = 0;

    const setSize = () => {
      size.x = container.clientWidth;
      size.y = container.clientHeight;
      canvas.width = size.x;
      canvas.height = size.y;

      imagedata = context.createImageData(size.x, size.y);
      buf = new ArrayBuffer(imagedata.data.length);
      buf8 = new Uint8ClampedArray(buf);
      data = new Uint32Array(imagedata.data.buffer);
      starsRef.current = [];
    };

    const rotate = (cx, cy, x, y, radians) => {
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      const nx = cos * (x - cx) + sin * (y - cy) + cx;
      const ny = cos * (y - cy) - sin * (x - cx) + cy;
      return { x: nx, y: ny };
    };

    const createStar = () => {
      const star = {};
      const rands = [
        Math.random() * (starEscapeWidth / 2) + 1,
        Math.random() * (starEscapeWidth / 2) + starEscapeWidth,
      ];
      star.orbital = rands.reduce((p, c) => p + c, 0) / rands.length;
      star.opacity = Math.floor(
        (1 - star.orbital / starEscapeWidth) * maxOpacity + Math.random() * 80
      );
      star.position = {
        x: size.x / 2,
        y: size.y / 2 + star.orbital,
      };
      star.originPosition = { ...star.position };
      star.rotation = Math.PI * (Math.random() * 2);
      star.position = rotate(
        size.x / 2,
        size.y / 2,
        star.position.x,
        star.position.y,
        star.rotation
      );
      star.realPosition = { ...star.position };
      star.rSpeed = Math.random() * rotationSpeed + star.opacity / 20000;
      star.waveSpeed1 = Math.random() * waveSpeed;
      star.waveSpeed2 = Math.random() * waveSpeed;
      star.wave1 = Math.sin(currentTime * star.waveSpeed1) * waveFrequency;
      star.wave2 = Math.sin(currentTime * star.waveSpeed2) * waveFrequency;
      star.id = starsRef.current.length;
      starsRef.current.push(star);
    };

    const drawStar = (star) => {
      const prevIndex =
        Math.floor(star.realPosition.y + star.wave1) * size.x +
        Math.floor(star.realPosition.x + star.wave2);
      if (prevIndex >= 0 && prevIndex < data.length) {
        data[prevIndex] = 0;
      }

      star.wave1 = Math.sin(currentTime * star.waveSpeed1) * waveFrequency;
      star.wave2 = Math.sin(currentTime * star.waveSpeed2) * waveFrequency;
      star.realPosition = rotate(
        size.x / 2,
        size.y / 2,
        star.position.x,
        star.position.y,
        star.rSpeed * currentTime
      );
      star.opacity = Math.floor(
        (1 - star.orbital / starEscapeWidth) * maxOpacity + Math.random() * 80
      );

      const index =
        Math.floor(star.realPosition.y + star.wave1) * size.x +
        Math.floor(star.realPosition.x + star.wave2);
      if (index >= 0 && index < data.length) {
        data[index] =
          (star.opacity << 24) | (starColor.b << 16) | (starColor.g << 8) | starColor.r;
      }
    };

    const render = () => {
      currentTime = (Date.now() - startTime) / 10;

      if (starsRef.current.length < starCount) {
        for (
          let i = 0;
          i < Math.min(100, starCount - starsRef.current.length);
          i++
        ) {
          createStar();
        }
      }

      for (const star of starsRef.current) {
        drawStar(star);
      }

      context.putImageData(imagedata, 0, 0);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    setSize();
    render();

    const resizeHandler = () => setSize();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [
    starCount,
    waveFrequency,
    starEscapeWidth,
    voidWidth,
    starColor,
    maxOpacity,
    rotationSpeed,
    waveSpeed,
  ]);

  return (
    // Fond blanc sur le conteneur : le canvas est transparent
    // là où aucune étoile n'est dessinée, donc c'est ce fond
    // qui détermine la couleur visible en arrière-plan.
    <div ref={containerRef} className="w-full h-full bg-white">
      <canvas ref={canvasRef} />
    </div>
  );
};

export { Starfield };