export type TCaixaMov = {
    id_caixa:number 
    fk_val:number
    name?:string
    venda?:string
    data_recebimento: Date | string | any
    debito:number  | any
    credito:number | any
    saldo:number | any
}