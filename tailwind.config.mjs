/** Палитра и типографика «живой аптеки» (итерация 4: фирменный зелёный Phytotab #207D44,
 *  вторичный текст не светлее #5C6B5C, основной текст — #22301F без opacity). */
const colors = {
  paper: "#F7F3EA",
  cream: "#FBF8F1",
  parch: "#EFE7D6",
  line: "#E2D8C0",
  ink: "#22301F",
  leaf: "#207D44",
  leafDark: "#1B6838",
  leafFresh: "#78AA36",
  sage: "#8FA98A",
  sageSoft: "#D5DECB",
  honey: "#E8963A",
  honeyDark: "#D18734",
  khaki: "#5F6A4C",
  secondary: "#5C6B5C",
  night: "#11160D",
  nightLine: "#28321B",
  nightText: "#DCE7C8",
  terminal: "#A9C47A",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(34,48,31,.05), 0 18px 40px -24px rgba(34,48,31,.28)",
        lift: "0 2px 4px rgba(34,48,31,.06), 0 30px 60px -24px rgba(34,48,31,.32)",
        halo: "0 0 0 1px rgba(255,255,255,.4), 0 24px 70px -24px rgba(62,107,53,.35)",
      },
      maxWidth: { wrap: "72rem" },
    },
  },
  plugins: [],
};