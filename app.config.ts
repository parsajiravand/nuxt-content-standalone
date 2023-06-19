interface AppConfig {
  stand: {
    insideFolder: string | null;
  };
}
export default defineAppConfig({
  stand: {
    contentRoot: null,
    defaultLayout: null,
  },
});
