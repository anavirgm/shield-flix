/**
 * Conventional Commits, en el estilo del proyecto (docs/ROADMAP.md §1.2):
 *
 *   `<tipo>: <descripción corta> closes #N`
 *
 * - Sin scope entre paréntesis.
 * - Descripción corta, en imperativo, minúscula y sin punto final.
 * - `closes #N` al final de la misma línea.
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "style",
        "test",
        "revert",
      ],
    ],
    /** El proyecto no usa scope: `feat: ...`, nunca `feat(algo): ...`. */
    "scope-empty": [2, "always"],
    /** El punto final se rechaza: `feat: añade el hero.` ✗ */
    "subject-full-stop": [2, "never", "."],
    /** Cabecera completa (`tipo + descripción + closes #N`) en una línea. */
    "header-max-length": [2, "always", 100],
    /** Cuerpo y pie sin límite: hay URLs largas en notas y referencias. */
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
  },
};

export default config;
