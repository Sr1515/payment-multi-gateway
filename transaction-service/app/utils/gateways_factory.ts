import Gateway from '#models/gateway'
import { gatewayRegistry } from './payment_gateways.ts'

export class GatewayFactory {
  static async getGateways() {
    const configs = await Gateway.query().where('active', true).orderBy('priority', 'asc')

    const gateways = []

    for (const config of configs) {
      const GatewayClass = gatewayRegistry[config.name]

      if (GatewayClass) {
        gateways.push(new GatewayClass())
      }
    }

    return gateways
  }
}
