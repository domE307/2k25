import {useRef} from "react";
import {motion, useInView} from "framer-motion";

export const TimelineQuote = ({text}: { text: string }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, {margin: "-20% 0px", once: false});

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-center px-6 py-10 md:py-16"
        >
            {/* MASK: schneidet die Timeline-Linie hinter dem Text weg */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-full w-24 -translate-x-1/2 bg-black" />

            {/* Quote selbst */}
            <p className="relative z-10 max-w-4xl rounded-3xl bg-black px-6 py-6 text-center text-2xl font-bold leading-relaxed md:px-10 md:text-5xl">
                “{text}”
            </p>
        </motion.div>
    );
}