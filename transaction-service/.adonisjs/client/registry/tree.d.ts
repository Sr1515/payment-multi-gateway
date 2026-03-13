/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  newAccount: {
    store: typeof routes['new_account.store']
  }
  accessToken: {
    store: typeof routes['access_token.store']
    destroy: typeof routes['access_token.destroy']
  }
  products: {
    index: typeof routes['products.index']
    store: typeof routes['products.store']
    show: typeof routes['products.show']
    update: typeof routes['products.update']
    destroy: typeof routes['products.destroy']
  }
  users: {
    index: typeof routes['users.index']
    store: typeof routes['users.store']
    show: typeof routes['users.show']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
  gateways: {
    index: typeof routes['gateways.index']
    store: typeof routes['gateways.store']
    show: typeof routes['gateways.show']
    update: typeof routes['gateways.update']
    destroy: typeof routes['gateways.destroy']
    activate: typeof routes['gateways.activate']
    deactivate: typeof routes['gateways.deactivate']
    changePriority: typeof routes['gateways.change_priority']
  }
  clients: {
    index: typeof routes['clients.index']
    store: typeof routes['clients.store']
    show: typeof routes['clients.show']
    update: typeof routes['clients.update']
    destroy: typeof routes['clients.destroy']
  }
  transaction: {
    store: typeof routes['transaction.store']
    reembolso: typeof routes['transaction.reembolso']
  }
  transactions: {
    index: typeof routes['transactions.index']
    show: typeof routes['transactions.show']
    update: typeof routes['transactions.update']
    destroy: typeof routes['transactions.destroy']
  }
}
