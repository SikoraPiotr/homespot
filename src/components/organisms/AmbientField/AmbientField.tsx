"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function AmbientField() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yB = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__grid" />
      <div className="ambient__beam ambient__beam--1" />
      <div className="ambient__beam ambient__beam--2" />

      <motion.div
        className="ambient__orb ambient__orb--b"
        style={reduceMotion ? undefined : { y: yB, rotate }}
      />
      <motion.div
        className="ambient__orb ambient__orb--c"
        style={reduceMotion ? undefined : { y: yC }}
      />
    </div>
  );
}
