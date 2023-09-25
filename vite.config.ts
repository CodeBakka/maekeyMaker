/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteSvgr from 'vite-plugin-svgr'
import { InlineConfig } from 'vitest'

const plugins = [react(), viteSvgr()]

const testConfig: InlineConfig = {
  environment: 'jsdom',
  setupFiles: ['test-setup.js'],
  globals: true,
  include: ['./src/**/*.test.{tsx,ts}'],
}


export default defineConfig({
  plugins,
  test: testConfig,
})


