import {useState} from "react";

const PASSWORD = "!2k25";

export const PasswordGate = ({onUnlock}: { onUnlock: () => void }) => {
    const [pw, setPw] = useState("");
    const [error, setError] = useState(false);

    function submit() {
        if (pw === PASSWORD) onUnlock();
        else setError(true);
    }

    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="mb-4 text-xl font-semibold">Passwort eingeben</h2>
            <input
                type="password"
                value={pw}
                onChange={(e) => {
                    setPw(e.target.value);
                    setError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
            />
            <button
                onClick={submit}
                className="mt-4 w-full rounded-xl bg-white py-3 font-semibold text-black"
            >
                Öffnen
            </button>
            {error && <p className="mt-3 text-sm text-red-300">Falsches Passwort</p>}
        </div>
    );
}