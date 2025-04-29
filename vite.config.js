export default defineConfig({
  base: '/stockAlpha/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
      }
    }
  }
});
