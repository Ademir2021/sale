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
            }

        }
    ],
    error_messages: [
        {
            code: string
            description: string
            parameter_name: string
        }
    ]
}

export type TError = {
    error_messages: [
        {
            code: string
            error: string
            description: string
            parameter_name: string
        }
    ]
}