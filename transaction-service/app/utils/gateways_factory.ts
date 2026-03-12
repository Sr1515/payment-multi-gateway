import Gateway from '#models/gateway'
import { gatewayRegistry } from './payment_gateways.ts'

export class GatewayFactory {
  static async getGateways() {
    const configs = await Gateway.query().where('is_activate', true).orderBy('priority', 'asc')

    const gateways = []

    for (const config of configs) {
      const GatewayClass = gatewayRegistry[config.name]

      if (GatewayClass) {
        gateways.push({
          instance: new GatewayClass(),
          config,
        })
      }
    }

    return gateways
  }
}
