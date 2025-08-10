const base = "inline-flex items-center gap-2 rounded-xl px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-accent/40";

export const ButtonPrimary = (p: JSX.IntrinsicElements["button"]) =>
  <button {...p} className={`${base} bg-accent text-bg hover:bg-accent-600`} />;

export const ButtonGhost = (p: JSX.IntrinsicElements["button"]) =>
  <button {...p} className={`${base} border border-line hover:border-accent/60`} />;