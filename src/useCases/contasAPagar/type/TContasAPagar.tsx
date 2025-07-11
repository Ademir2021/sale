export type TContaAPagar = {
    id_conta: number 
    fk_filial: number
    tipo: string
    fk_compra: number 
    fk_user:number
    parcela: number | string
    valor: number | any
    multa: number | any
    juros: number | any
    desconto:number | any
    emissao:Date |  string | any 
    vencimento:Date | string | any
    saldo:number | any 
    pagamento:Date | any | null
    recebimento: number | any
    observacao:string | null
    fk_beneficiario:number
    fk_despesa:number
}

export type TValPago = {
    id_val: number
    fk_conta: number
    fk_compra: number
    fk_user: number
    valor: number
    data_recebimento: Date | any | null
    descricao:string | undefined
    fk_person:number
    fk_despesa:number
}

export type TDespesa = {
    id:number 
    name:string 
    fk_setor:number
}

export type TSetorDespesa = {
    id:number
    name:string 
    tipo:string
}
