import { configure } from '@japa/runner'
import { plugins, runnerHooks, configureSuite } from './bootstrap.js'

configure({
  files: ['tests/**/*.spec.ts'],
  plugins,
  ...runnerHooks,
  configureSuite,
})
