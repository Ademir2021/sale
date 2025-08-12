import { TPagSeguroItems } from "./TPagSeguroCard"

export type TPagSeguroBoleto = {
  reference_id: string
  description:string
  customer: {
    name: string
    email: string
    tax_id: string
    phones: [
      {
        country: string
        area: string
        number: string
        type: string
      }
    ]
  },
  items:TPagSeguroItems []
  shipping: {
    address: {
      street: string
      number: string
      complement: string | null
      locality: string
      city: string
      region_code: string
      country: string
      postal_code: string
    }
  }
  notification_urls: [
    string],
  charges: [
    {
      reference_id: string
      description: string
      amount: {
        value: number | string,
        currency: string
      },
      payment_method: {
        type: string
        boleto: {
          due_date: string
          instruction_lines: {
            lines_1:string,
            lines_2:string
          },
          holder: {
            name: string
            tax_id: string
            email: string
            address: {
              country: string
              region: string
              region_code: string
              city: string
              postal_code: string
              street: string
              number: string
              locality: string
            }
          }
        }
      }
    }
  ]
}
