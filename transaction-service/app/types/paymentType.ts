export interface PaymentGateway {
  name: string
  processPayment(data: any): Promise<any>
}
