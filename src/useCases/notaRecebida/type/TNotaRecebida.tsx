import { TValPago } from "../../contasAPagar/type/TContasAPagar"
import { TContaAPagar } from "../../contasAPagar/type/TContasAPagar"

export type TNotaRecebida = {
    fk_fornecedor: number,
    data: Date | string
    emissao: Date | string
    numNota: number
    modelo: string
    vFrete: number | any
    vSeguro: number | any
    despAcessorias: number | any
    encargos: number | any
    acrescimo: number | any
    desconto: number | any
    tProdutos: number | any
    total: number
    items: TItems[]
    contaAPagar: TContaAPagar[]
    valsPago: TValPago[]
}

export type TItem = {
    id: number
    tipo: string
    item: number | any
    descric: string | number
    quantidade: number | any
    unitario: number | any
    total: number | any
}

export type TItems = {
    id: number
    tipo: string
    item: number
    descric: string | number
    quantidade: number
    unitario: number
    total: number | any
}

export type TTrib = {
    vIpi: number
    bcIcmsSt: number
    icmsSubst: number
    pisSubst: number
    cofinsSubst: number
    icmsSobreIpi: number
}

