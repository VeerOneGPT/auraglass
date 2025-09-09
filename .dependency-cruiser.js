/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment:
        "This dependency is part of a circular relationship. Please refactor to remove the circular dependency.",
      from: {},
      to: {
        circular: true,
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    exclude: {
      path: [
        "node_modules",
        "dist",
        "storybook-static",
        "coverage",
        "*.d.ts",
        "*.stories.tsx",
        "*.stories.ts",
      ],
    },
    includeOnly: ["src/**/*.{js,ts,tsx,jsx}"],
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.json",
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
    },
    reporterOptions: {
      dot: {
        theme: {
          graph: { splines: "ortho" },
          modules: [
            {
              criteria: { source: "\\.stories\\." },
              attributes: { fillcolor: "lightblue" },
            },
            {
              criteria: { source: "\\.test\\." },
              attributes: { fillcolor: "lightgreen" },
            },
            {
              criteria: { source: "\\.spec\\." },
              attributes: { fillcolor: "lightgreen" },
            },
          ],
          dependencies: [
            {
              criteria: { "rules[0].severity": "error" },
              attributes: { fontcolor: "red", color: "red" },
            },
            {
              criteria: { "rules[0].severity": "warn" },
              attributes: { fontcolor: "orange", color: "orange" },
            },
            {
              criteria: { "rules[0].severity": "info" },
              attributes: { fontcolor: "blue", color: "blue" },
            },
          ],
        },
      },
    },
  },
};
