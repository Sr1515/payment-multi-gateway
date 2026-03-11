import { assert } from '@japa/assert'
import { apiClient } from '@japa/api-client'
import app from '@adonisjs/core/services/app'
import type { Config } from '@japa/runner/types'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import testUtils from '@adonisjs/core/services/test_utils'
import { authApiClient } from '@adonisjs/auth/plugins/api_client'
import { sessionApiClient } from '@adonisjs/session/plugins/api_client'

export const plugins: Config['plugins'] = [
  assert(),
  pluginAdonisJS(app),
  apiClient(),
  sessionApiClient(app),
  authApiClient(app),
]

export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [],
  teardown: [],
}

export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['functional', 'e2e', 'unit'].includes(suite.name)) {
    // Inicia o servidor HTTP para testes
    suite.setup(() => testUtils.httpServer().start())

    suite.setup(async () => {
      console.log(
        `\x1b[34m[Test Setup]\x1b[0m Usando Banco: ${process.env.DB_DATABASE} na porta ${process.env.DB_PORT}`
      )
      await testUtils.db().migrate()
    })

    suite.onGroup((group) => {
      group.each.setup(() => testUtils.db().withGlobalTransaction())
    })
  }
}
