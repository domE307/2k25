import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const IntroHero = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // Hero verschwindet KOMPLETT vor Ende
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.4, 0.7, 0.9],
        [1, 1, 0, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [0, 0.4, 0.7, 0.9],
        [0, 0, -100, -140]
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 0.4, 0.9],
        [1, 1, 0.96]
    );

    return (
        // Wichtig: mehr als 200vh → genug Scroll-Strecke
        <section ref={ref} className="relative h-[260vh]">
            {/* Sticky Bereich */}
            <div className="sticky top-0 flex h-screen items-center justify-center px-6">
                <motion.div
                    style={{ opacity, y, scale }}
                    className="mx-auto max-w-3xl text-center will-change-transform"
                >
                    <div className="text-md text-white/60">dear friend, </div>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
                        this was 2k25
                    </h1>

                    <div className="mt-10 flex items-center justify-center">
                        <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70">
                            thx & enjoy ✨
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
