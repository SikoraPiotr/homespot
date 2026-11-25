"use client";

import { useLayoutEffect, useRef, useState } from "react";

const EDGE = 18;

type Point = { x: number; y: number };

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function snakePath(points: Point[], width: number) {
  if (points.length !== 8) return "";

  const y1 = average(points.slice(0, 3).map((point) => point.y));
  const y2 = average(points.slice(3, 5).map((point) => point.y));
  const y3 = average(points.slice(5, 8).map((point) => point.y));
  const [p1, p2, p3, p4, p5, p6, p7, p8] = points;
  const rightRadius = (y2 - y1) / 2;
  const leftRadius = (y3 - y2) / 2;
  const right = width - EDGE;
  const left = EDGE;

  return [
    `M ${p1.x} ${y1}`,
    `L ${p2.x} ${y1}`,
    `L ${p3.x} ${y1}`,
    `L ${right - rightRadius} ${y1}`,
    `A ${rightRadius} ${rightRadius} 0 0 1 ${right - rightRadius} ${y2}`,
    `L ${p4.x} ${y2}`,
    `L ${p5.x} ${y2}`,
    `L ${left + leftRadius} ${y2}`,
    `A ${leftRadius} ${leftRadius} 0 0 0 ${left + leftRadius} ${y3}`,
    `L ${p6.x} ${y3}`,
    `L ${p7.x} ${y3}`,
    `L ${p8.x} ${y3}`,
  ].join(" ");
}

export function ProcessTrack() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [path, setPath] = useState("");

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const board = svg?.parentElement;
    if (!svg || !board) return;

    const measure = () => {
      const boardRect = board.getBoundingClientRect();
      const points = [...board.querySelectorAll<HTMLElement>(".process__dot")].map((dot) => {
        const rect = dot.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - boardRect.left,
          y: rect.top + rect.height / 2 - boardRect.top,
        };
      });
      setPath(snakePath(points, boardRect.width));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(board);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={svgRef} className="process__track" aria-hidden="true">
      {path ? <path d={path} /> : null}
    </svg>
  );
}
