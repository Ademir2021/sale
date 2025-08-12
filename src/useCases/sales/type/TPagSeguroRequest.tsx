export type TPagSeguroRequest = {
    charges: [
        {
            id: string
            reference_id: string
            status: string
            created_at: string
            paid_at: string
            description: string
            amount: {
                value: number
                currency: string
                summary: {
                    total: number
                    paid: number
                    refunded: number
                }
            },
            payment_response: {
                code: string,
                message: string,
                reference: string
            },
        }
    ]
}

