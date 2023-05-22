/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    unstable_dev: true,
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  serverModuleFormat: "cjs",
};
