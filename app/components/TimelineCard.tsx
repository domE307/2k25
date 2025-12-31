import {useRef} from "react";
import {motion, useInView} from "framer-motion";
import Image from "next/image";
import {TimelineEvent} from "@/app/page";

export const TimelineCard = ({
                                 item,
                                 onImageClick,
                                 side,
                             }: {
    item: TimelineEvent;
    onImageClick: (src: string) => void;
    side: "left" | "right";
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    // inView triggers the "enter" animation when the card is approaching the viewport
    const inView = useInView(ref, {margin: "-15% 0px -25% 0px", once: false});

    const enterX = side === "left" ? -60 : 60;
    const exitX = side === "left" ? -120 : 120;

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, x: enterX, y: 16, scale: 0.985}}
            animate={
                inView
                    ? {opacity: 1, x: 0, y: 0, scale: 1}
                    : {opacity: 0, x: exitX, y: -10, scale: 0.985}
            }
            transition={{duration: 0.55, ease: "easeOut"}}
            className="relative will-change-transform"
        >
            {/* Connector (Card -> Line) */}
            <div
                className={[
                    "pointer-events-none absolute top-8 hidden h-px w-10 bg-white/25 md:block",
                    side === "left" ? "right-[-40px]" : "left-[-40px]",
                ].join(" ")}
            />

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
                <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-white/80">{item.text}</p>

                <div
                    className="group relative mt-4 cursor-zoom-in overflow-hidden rounded-2xl"
                    onClick={() => onImageClick(item.image)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") onImageClick(item.image);
                    }}
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={400}
                        className="w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </div>
        </motion.div>
    );
}