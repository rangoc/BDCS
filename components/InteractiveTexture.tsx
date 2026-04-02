import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const StaticTexture = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23AE9751' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const CROSS_SPACING = 60;
const CROSS_SIZE = 6;
const CROSS_THICKNESS = 2;
const INFLUENCE_RADIUS = 300;
const MAX_ROTATION = Math.PI / 2;
const MAX_DISPLACEMENT = 20;
const LERP_SPEED = 0.12;
const SETTLE_THRESHOLD = 0.01;

export function InteractiveTexture({
  parentRef,
}: {
  parentRef: React.RefObject<HTMLElement | null>;
}) {
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover)");
    setHasHover(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  if (!hasHover) return <StaticTexture aria-hidden="true" />;

  return <InteractiveTextureCanvas parentRef={parentRef} />;
}

function InteractiveTextureCanvas({
  parentRef,
}: {
  parentRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rotationsRef = useRef<Float32Array | null>(null);
  const offsetsXRef = useRef<Float32Array | null>(null);
  const offsetsYRef = useRef<Float32Array | null>(null);
  const rafRef = useRef<number>(0);
  const gridRef = useRef({ cols: 0, rows: 0 });
  const activeRef = useRef(false);

  const drawStatic = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const { cols, rows } = gridRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "rgba(174, 151, 81, 0.025)";

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = col * CROSS_SPACING + CROSS_SPACING / 2;
        const cy = row * CROSS_SPACING + CROSS_SPACING / 2;
        ctx.fillRect(
          cx - CROSS_THICKNESS / 2,
          cy - CROSS_SIZE,
          CROSS_THICKNESS,
          CROSS_SIZE * 2
        );
        ctx.fillRect(
          cx - CROSS_SIZE,
          cy - CROSS_THICKNESS / 2,
          CROSS_SIZE * 2,
          CROSS_THICKNESS
        );
      }
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, []);

  const startLoop = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;
    rafRef.current = requestAnimationFrame(draw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const { cols, rows } = gridRef.current;
    const rotations = rotationsRef.current;
    const ofsX = offsetsXRef.current;
    const ofsY = offsetsYRef.current;
    if (!rotations || !ofsX || !ofsY) return;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const mouseActive = mx > -9000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    let maxDelta = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const idx = row * cols + col;
        const cx = col * CROSS_SPACING + CROSS_SPACING / 2;
        const cy = row * CROSS_SPACING + CROSS_SPACING / 2;

        let targetRotation = 0;
        let targetOfsX = 0;
        let targetOfsY = 0;

        if (mouseActive) {
          const dx = mx - cx;
          const dy = my - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < INFLUENCE_RADIUS && dist > 0) {
            const angle = Math.atan2(dy, dx);
            const strength = 1 - dist / INFLUENCE_RADIUS;
            const eased = strength * strength;
            targetRotation = angle * eased * (MAX_ROTATION / (Math.PI / 2));
            targetOfsX = -Math.cos(angle) * eased * MAX_DISPLACEMENT;
            targetOfsY = -Math.sin(angle) * eased * MAX_DISPLACEMENT;
          }
        }

        const dr = (targetRotation - rotations[idx]) * LERP_SPEED;
        const dox = (targetOfsX - ofsX[idx]) * LERP_SPEED;
        const doy = (targetOfsY - ofsY[idx]) * LERP_SPEED;

        rotations[idx] += dr;
        ofsX[idx] += dox;
        ofsY[idx] += doy;

        const delta = Math.abs(dr) + Math.abs(dox) + Math.abs(doy);
        if (delta > maxDelta) maxDelta = delta;

        ctx.save();
        ctx.translate(cx + ofsX[idx], cy + ofsY[idx]);
        ctx.rotate(rotations[idx]);
        ctx.fillStyle = "rgba(174, 151, 81, 0.025)";
        ctx.fillRect(
          -CROSS_THICKNESS / 2,
          -CROSS_SIZE,
          CROSS_THICKNESS,
          CROSS_SIZE * 2
        );
        ctx.fillRect(
          -CROSS_SIZE,
          -CROSS_THICKNESS / 2,
          CROSS_SIZE * 2,
          CROSS_THICKNESS
        );
        ctx.restore();
      }
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (!mouseActive && maxDelta < SETTLE_THRESHOLD) {
      activeRef.current = false;
      drawStatic(canvas);
      return;
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [drawStatic]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const cols = Math.ceil(rect.width / CROSS_SPACING) + 1;
      const rows = Math.ceil(rect.height / CROSS_SPACING) + 1;
      gridRef.current = { cols, rows };
      const count = cols * rows;
      rotationsRef.current = new Float32Array(count);
      offsetsXRef.current = new Float32Array(count);
      offsetsYRef.current = new Float32Array(count);

      drawStatic(canvas);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      startLoop();
    };

    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();

    window.addEventListener("resize", resize);
    parent.addEventListener("mousemove", handleMouse);
    parent.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      activeRef.current = false;
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", handleMouse);
      parent.removeEventListener("mouseleave", handleLeave);
    };
  }, [draw, drawStatic, startLoop, parentRef]);

  return <Canvas ref={canvasRef} aria-hidden="true" />;
}
