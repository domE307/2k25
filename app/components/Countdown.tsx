const formatTime = (ms: number) => {
    const total = Math.max(0, Math.floor(ms / 1000));
    return {
        d: Math.floor(total / 86400),
        h: Math.floor((total % 86400) / 3600),
        m: Math.floor((total % 3600) / 60),
        s: total % 60,
    };
}

export const Countdown = ({ms}: { ms: number }) => {
    const t = formatTime(ms);

    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h1 className="mb-6 text-2xl font-semibold">2025 Recap</h1>
            <div className="grid grid-cols-4 gap-4">
                {[
                    ["Tage", t.d],
                    ["Std", t.h],
                    ["Min", t.m],
                    ["Sek", t.s],
                ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-black/30 p-4 text-center">
                        <div className="text-3xl font-bold tabular-nums">{value as number}</div>
                        <div className="text-xs text-white/60">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}