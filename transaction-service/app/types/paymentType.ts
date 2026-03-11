export interface CreateTransactionDTO {
  amount: number
  name: string
  email: string
  cardNumber: string
  cvv: string
}

export interface PaymentGateway {
  name: string

  processPayment(data: CreateTransactionDTO): Promise<any>

  refund(transactionId: string): Promise<any>
}
