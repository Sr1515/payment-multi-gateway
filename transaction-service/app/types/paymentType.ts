export interface ExternalPaymentRequestDTO {
  amount: number
  name: string
  email: string
  cardNumber: string
  cvv: string
}

export interface PaymentGateway {
  name: string

  processPayment(data: ExternalPaymentRequestDTO): Promise<any>

  refund(transactionId: string): Promise<any>
}
