import axios from 'axios'
import { ExternalPaymentRequestDTO, PaymentGateway } from '../types/paymentType.ts'
import env from '#start/env'

export class PaymentGatewayA implements PaymentGateway {
  name = 'GatewayA'

  private baseUrl = env.get('GATEWAY_A', 'http://localhost:3001')
  private token: string | null = null

  private async authenticate() {
    if (this.token) return this.token

    const response = await axios.post(`${this.baseUrl}/login`, {
      email: 'dev@betalent.tech',
      token: 'FEC9BB078BF338F464F96B48089EB498',
    })

    this.token = response.data.token
    return this.token
  }

  async processPayment(data: ExternalPaymentRequestDTO): Promise<any> {
    const token = await this.authenticate()

    const response = await axios.post(
      `${this.baseUrl}/transactions`,
      {
        amount: data.amount,
        name: data.name,
        email: data.email,
        cardNumber: data.cardNumber,
        cvv: data.cvv,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  }

  async refund(transactionId: string): Promise<any> {
    const token = await this.authenticate()

    const response = await axios.post(
      `${this.baseUrl}/transactions/${transactionId}/charge_back`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  }
}

export class PaymentGatewayB implements PaymentGateway {
  name = 'GatewayB'

  private baseUrl = env.get('GATEWAY_B', 'http://localhost:3002')

  private headers = {
    'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
    'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f',
  }

  async processPayment(data: ExternalPaymentRequestDTO): Promise<any> {
    const response = await axios.post(
      `${this.baseUrl}/transacoes`,
      {
        valor: data.amount,
        nome: data.name,
        email: data.email,
        numeroCartao: data.cardNumber,
        cvv: data.cvv,
      },
      {
        headers: this.headers,
      }
    )

    return response.data
  }

  async refund(transactionId: string) {
    const response = await axios.post(
      `${this.baseUrl}/transacoes/reembolso`,
      {
        id: transactionId,
      },
      {
        headers: this.headers,
      }
    )

    return response.data
  }
}

export const gatewayRegistry: Record<string, new () => PaymentGateway> = {
  gatewayA: PaymentGatewayA,
  gatewayB: PaymentGatewayB,
}
