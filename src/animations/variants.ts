/**
 * Shared Framer Motion variants — one motion language across the site.
 * GSAP/Lenis/Three enter in later milestones behind lazy imports so the
 * base bundle stays light (Lighthouse budget).
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
