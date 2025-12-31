import {useRef} from "react";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {TimelineCard} from "@/app/components/TimelineCard";
import {TimelineItem} from "@/app/page";
import {TimelineQuote} from "@/app/components/TimelineQuote";

export const Timeline = ({setActiveImage, timeline}: {
    setActiveImage: (src: string) => void,
    timeline: TimelineItem[]
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {stiffness: 100, damping: 30});
    const line = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        <section className="relative mx-auto w-full max-w-6xl px-6 pb-24">
            {/* Items wrapper (line is inside, so it matches real height) */}
            <div ref={containerRef} className="relative">
                {/* Center line */}
                <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-px -translate-x-1/2 bg-white/10" />
                <motion.div
                    className="pointer-events-none absolute left-1/2 top-0 z-0 w-px -translate-x-1/2 bg-white"
                    style={{ height: line }}
                />

                <div className="relative space-y-24 pt-10">
                    {timeline.map((item, i) => {
                        if (item.type === "quote") {
                            return <TimelineQuote key={i} text={item.text}/>;
                        }

                        const side = i % 2 === 0 ? "left" : "right";

                        return (
                            <div key={i} className="relative md:grid md:grid-cols-2 md:gap-x-20">
                                <div
                                    className={[
                                        "md:w-full",
                                        side === "left"
                                            ? "md:col-start-1 md:pr-4"
                                            : "md:col-start-2 md:pl-4",
                                        "pl-6 md:pl-0",
                                    ].join(" ")}
                                >
                                    <TimelineCard
                                        item={item}
                                        onImageClick={setActiveImage}
                                        side={side}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
