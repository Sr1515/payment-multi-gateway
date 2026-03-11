import { PaymentGateway } from '../types/paymentType.ts'

export class PaymentGatewayA implements PaymentGateway {
  name = 'GatewayA'

  async processPayment(data: any) {
    console.log(`Pagamento realizado ${data}`)
  }
}

export class PaymentGatewayB implements PaymentGateway {
  name = 'GatewayB'

  async processPayment(data: any) {
    console.log(`Pagamento realizado ${data}`)
  }
}

export const gatewayRegistry: Record<string, new () => PaymentGateway> = {
  gatewayA: PaymentGatewayA,
  gatewayB: PaymentGatewayB,
}
