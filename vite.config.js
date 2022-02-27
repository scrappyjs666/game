const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  root: 'src',
  base: '/game/dist/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        'index': resolve(__dirname, 'src/index.html'),
      }
    }
  }
})