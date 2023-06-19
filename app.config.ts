interface AppConfig {
  stand: {
    insideFolder: string | null;
  };
}
export default defineAppConfig({
  stand: {
    contentRoot: '/docs',
    defaultLayout: null,
  },
});
