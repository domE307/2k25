"use client";

import Image from "next/image";
import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {Countdown} from "@/app/components/Countdown";
import {PasswordGate} from "@/app/components/PasswordGate";
import {Timeline} from "@/app/components/Timeline";
import {IntroHero} from "@/app/components/IntroHero";

/* ---------------------------------------------
   CONFIG
--------------------------------------------- */

// 31.12.2025 23:59 Europe/Berlin → 22:59 UTC
const UNLOCK_AT = new Date("2025-12-31T22:59:00.000Z");

/* ---------------------------------------------
   TYPES
--------------------------------------------- */
export type TimelineEvent = {
    type: "event";
    title: string;
    text: string;
    image: string;
};

export type TimelineQuote = {
    type: "quote";
    text: string;
};
export type TimelineItem = TimelineEvent | TimelineQuote;

const TIMELINE: TimelineItem[] = [
    {
        type: "event",
        title: "Der Anfang",
        text: "Mit einem Lächeln ins neue Jahr starten und den ersten Schnee in meinem Leben genießen. " +
            "Es wird spannend, denn dieses Jahr wird sich so viel ändern. Ich werde große Schwester. ",
        image: "/images/1.jpeg",
    },
    {
        type: "event",
        title: "Mal wo anders sein",
        text: "Noch einmal wir drei, ganz für uns." +
            "Sonne, Lachen, gemeinsame Zeit." +
            "Bald sind wir mehr – das Herz wächst schon mit.",
        image: "/images/9.jpeg",
    },
    {
        type: "event",
        title: "Düsseldorf oder eher der Anfang von was Neuem?",
        text: "2025 hat vieles verändert.\n" +
            "Nicht alles war leicht, doch genau dadurch wurde klar,\n" +
            "wer wirklich wichtig ist im Leben,\n" +
            "wen wir an unserer Seite haben wollen\n" +
            "und auf wen wir uns jederzeit verlassen können.\n" +
            "\n" +
            "Dieses Bild zeigt genau diese Menschen.\n" +
            "Menschen, bei denen man sich fallen lassen kann.\n" +
            "Bei denen Ehrlichkeit zählt, Freundschaft echt ist\n" +
            "und Lachen genauso seinen Platz hat wie Ruhe.\n" +
            "\n" +
            "Wir haben gelernt, was uns guttut –\n" +
            "Geborgenheit, Wohlfühlen, kein Stress,\n" +
            "bedingungslose Nähe und Vertrauen.\n" +
            "Und dafür bin ich heute mehr als dankbar. Bekommen wir 2026 bitte mehr Gruppenbilder hin ? :)",
        image: "/images/2.jpeg",
    },
    {
        type: "quote",
        text: "Freunde sind die Familie, die wir uns selbst aussuchen.",
    },
    {
        type: "event",
        title: "Wir feiern dich jetzt schon Baby",
        text: "",
        image: "/images/16.jpeg",
    },
    {
        type: "event",
        title: "Ein dickes 'Thank You' an alle die da waren!",
        text: "",
        image: "/images/14.jpeg",
    },
    {
        type: "event",
        title: "Small teaser...",
        text: "",
        image: "/images/11.jpeg",
    },
    {
        type: "event",
        title: "Ich halte meine Schwester im Arm",
        text: "Nun ist es endlich so weit!\n" +
            "Ich halte meine kleine Schwester Elena zum allerersten Mal in meinen Armen.\n" +
            "Am 23.04.2025 ist sie geboren – und seitdem fühlt sich mein Herz irgendwie größer an.\n" +
            "So klein, so warm, so perfekt.\n" +
            "Ich kann es kaum erwarten, ihr alles zu zeigen, was ich liebe,\n" +
            "mit ihr zu lachen, sie zu beschützen\n" +
            "und die große Schwester zu sein, die immer für sie da ist. ♥️",
        image: "/images/6.jpeg",
    },


    {
        type: "event",
        title: "Mama und Papa sind ganz stolz!",
        text: "Ich liebe dich Aileen ♥️\nDu hast das weltklasse gemeistert, obwohl es komplizierter wurde als geplant!",
        image: "/images/20.jpeg",
    },
    {
        type: "quote",
        text: "Neues Leben, neues Glück –\n" +
            "und eine Liebe, die größer ist als alles zuvor.",
    },

    //timo chaneh
    {
        type: "event",
        title: "Tante Chaneh und Onkel Timo",
        text: "Ihr wart von Tag eins an unserer Seite.\n" +
            "Dieses Jahr habt ihr so ziemlich alles mit uns gemeinsam erlebt –\n" +
            "vor allem die Geburt von Elena,\n" +
            "einen der bedeutendsten Momente unseres Lebens.\n" +
            "\n" +
            "Ihr wart da, habt mitgefühlt, unterstützt\n" +
            "und diesen neuen Anfang mit uns geteilt.\n" +
            "Für all die schönen Momente, die Nähe\n" +
            "und alles, was ihr für uns getan habt,\n" +
            "sind wir unendlich dankbar.\n" +
            "\n" +
            "Wir freuen uns auf all das, was das nächste Jahr für uns bereithält –\n" +
            "gemeinsam mit euch. 🤍",
        image: "/images/33.jpeg",
    },
    {
        type: "event",
        title: "Verlobung Chaneh & Timo",
        text: "Wow – ihr beide werdet heiraten.\n" +
            "Nach so langer Zeit, so vielen gemeinsamen Momenten\n" +
            "und all dem, was ihr zusammen erlebt habt,\n" +
            "habt ihr euch im September dieses Jahres verlobt.\n" +
            "Und es fühlt sich einfach richtig an.\n" +
            "\n" +
            "Timo, du bist einer meiner beiden besten Freunde,\n" +
            "und deshalb macht es mich umso glücklicher,\n" +
            "dich an der Seite einer Frau zu sehen,\n" +
            "mit der du nicht nur lachst,\n" +
            "sondern mit der du dein Leben teilen willst.\n" +
            "\n" +
            "Ich wünsche euch von Herzen alles Glück der Welt,\n" +
            "Geduld in schwierigen Momenten,\n" +
            "unendlich viele schöne Erinnerungen\n" +
            "und eine Liebe, die jeden Tag ein bisschen wächst.\n" +
            "Ihr habt euch gefunden – und das ist etwas ganz Besonderes. 💍🤍",
        image: "/images/17.jpeg",
    },
    {
        type: "quote",
        text: "Dankbar für das, was war.\n" +
            "        Glücklich über das, was ist.\n" +
            "        Voller Hoffnung für das, was kommt.",
    },


    {
        type: "event",
        title: "Im Wald Spazieren",
        text: "Der Herbst zeigt sich von seiner schönsten Seite –\n" +
            "bunte Blätter, frische Luft und dieser besondere Moment.\n" +
            "Wir gehen durch den Wald, jetzt zu viert,\n" +
            "lernen unser neues Familiengefühl kennen\n" +
            "und merken, wie gut sich genau das anfühlt.\n" +
            "Gemeinsam unterwegs, ohne Eile,\n" +
            "mit viel Liebe, Nähe und Dankbarkeit im Herzen. 🍂🤍",
        image: "/images/8.jpeg",
    },


    {
        type: "event",
        title: "Onkel Dario",
        text: "Wenn sich Freundschaft wie Familie anfühlt. Dario du bist mehr als ein Freund von mir – du bist Onkel und Beschützer im Herzen.",
        image: "/images/4.jpeg",
    },
    {
        type: "event",
        title: "",
        text: "Nicht jeder, der Familie ist, teilt Blut.\n" +
            "Manche teilen Zeit, Vertrauen und Herz.\n" +
            "Danke, dass du da bist.",
        image: "/images/d.jpg",
    },
    {
        type: "event",
        title: "",
        text: "Meine Töchter fühlen sich sicher bei dir.\n" +
            "Und genau das sagt alles.",
        image: "/images/dd.jpg",
    },


    {
        type: "event",
        title: "Ende",
        text: "Und nun geht das Jahr 2025 zu Ende.\n" +
            "Es bleibt nur eines zu sagen: Danke für alles.\n" +
            "\n" +
            "Danke für jeden einzelnen Tag,\n" +
            "für deine Stärke, deine Geduld\n" +
            "und für die Liebe, die du unserer Familie schenkst.\n" +
            "Du hältst alles zusammen, oft ganz leise,\n" +
            "und doch so kraftvoll.\n" +
            "\n" +
            "Aileen, ich sage es viel zu selten,\n" +
            "aber ich liebe dich –\n" +
            "für das, was du bist,\n" +
            "für das, was du gibst\n" +
            "und für den Weg, den wir gemeinsam gehen.\n" +
            "Mit dir an meiner Seite fühlt sich selbst das Chaos nach Zuhause an. 🤍",
        image: "/images/99.JPG",
    },
    {
        type: "quote",
        text: "Gemeinsam ist kein Versprechen –\n" +
            "es ist eine Entscheidung, jeden Tag.",
    },
];

export default function Page() {
    const [now, setNow] = useState(new Date());
    const [activeImage, setActiveImage] = useState<string | null>(null);

    // Fürs Testen: true lassen. In Prod: false + remaining-check aktiv.
    const [unlocked, setUnlocked] = useState(true);
    const [authed, setAuthed] = useState(false);

    const remaining = useMemo(() => UNLOCK_AT.getTime() - now.getTime(), [now]);

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 500);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (remaining <= 0) setUnlocked(true);
    }, [remaining]);

    // ESC closes overlay
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setActiveImage(null);
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <main className="min-h-screen bg-black text-white">
            {!unlocked ? (
                <div className="flex min-h-screen items-center justify-center px-6">
                    <Countdown ms={remaining}/>
                </div>
            ) : !authed ? (
                <div className="flex min-h-screen items-center justify-center px-6">
                    <PasswordGate onUnlock={() => setAuthed(true)}/>
                </div>
            ) : (
                <>
                    <main className="min-h-screen bg-black text-white">
                        <IntroHero/>
                        <Timeline timeline={TIMELINE} setActiveImage={setActiveImage}/>
                    </main>

                    {/* Fullscreen image overlay */}
                    {activeImage && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={() => setActiveImage(null)}
                        >
                            <motion.div
                                initial={{scale: 0.98, opacity: 0}}
                                animate={{scale: 1, opacity: 1}}
                                transition={{duration: 0.22, ease: "easeOut"}}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-[95vw]"
                            >
                                <Image
                                    src={activeImage}
                                    alt="Vergrößertes Bild"
                                    width={2400}
                                    height={1800}
                                    className="h-auto max-h-[95vh] w-full rounded-2xl object-contain"
                                    priority
                                />

                                <button
                                    onClick={() => setActiveImage(null)}
                                    aria-label="Schließen"
                                    className="
                    group absolute right-3 top-3
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    bg-white/80
                    text-black
                    transition
                    duration-200
                    ease-out
                    hover:scale-105
                    hover:bg-white
                    hover:shadow-[0_0_0_6px_rgba(255,255,255,0.15)]
                    focus:outline-none
                  "
                                >
                  <span
                      className="
                      text-sm font-bold
                      transition-transform
                      duration-200
                      group-hover:rotate-90
                    "
                  >
                    ✕
                  </span>
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </>
            )}
        </main>
    );
}
