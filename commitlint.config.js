module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    name: "conventional-changelog-conventionalcommits",
    path: require.resolve("conventional-changelog-conventionalcommits"),
  },
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "docs",
        "test",
        "chore",
        "style",
        "delete",
        "move",
        "update",
      ],
    ],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "header-max-length": [2, "always", 100],
    "scope-case": [0], // scope 사용 안 함
  },
};
