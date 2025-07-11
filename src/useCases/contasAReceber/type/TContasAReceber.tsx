export type TContaAreceber = {
    id_conta: number
    fk_filial: number
    tipo: string
    fk_venda: number
    fk_user: number
    parcela: number | string
    valor: number | any
    multa: number | any
    juros: number | any
    desconto: number | any
    emissao: Date | string | any
    vencimento: Date | string | any
    saldo: number | any
    pagamento: Date | any | null
    recebimento: number | any
    observacao: string | null
    fk_pagador: number
}

export type TValsRecebidos = {
    id_val: number
    fk_conta: number
    fk_venda: number
    fk_user: number
    valor: number
    data_recebimento: Date | any | null
    descricao: string
    fk_person: number
}

type TContaBancaria = {
    id_banco?: number
    carteira?: number
    aceite?: string //char
    banco?: number
    agencia?: string
    conta_corrente?: string
    cheque?: number
    documento?: string
    emitente?: number
    filial_emitente?: number

}

type TCartao = {
    id_cartao?: 1
    lote?: 1
    convenio?: 1
    observacao?: string
    data__?: Date // TimeStamp
    prev_recebimento?: Date
    nome_portador?: string
    nome_banco?: string
    nome_emitente?: string
    nome_cartao?: string
    nf?: number
    caixa_origem?: string //char
    sinal?: string //char
    conciliado?: string //char
    a_vista?: string //char
}

type TTitulo = {
    id_titulo?: number
    multas?: number //numeric 13, 3
    situacao?: string //char
    cancelada?: string //char
    estorno?: string //char
    parceiro?: string //char
    filial_parceiro?: number
    nome_parceiro?: string
    nome_operador?: string
    tipos_descontos_antecipacao?: number
    dias_para_juros?: number
    titulos_descontados?: string //char
    titulos_protestados?: string //char
    titulos_registrados?: string //char
    data_inc?: Date //TimeStamp
    camara?: number
    cheque_devolvido?: string //char
    forma_reg_inadiplencia?: string //char
}

type TOthers = {
    legado: number
    fatura: number
    fat_legada: number

    ordem_servico: number
    venc_original: Date | string
    cod_anterior: number
    dias_multa: number
    dias_protesto: number
    data_desconto: Date | string
    comissao_vendedor: number //numeric 13, 3
    comissao_representante: number //numeric 13, 3
    portador: number
}

export type TReciboValRec = {
    id: number
    conta: number
    venda: number
    user: number
    valor: number
    data_rec: string
    descricao: string
    id_cliente:number
    nome_cliente: string
    cpf: string
}