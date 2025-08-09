import { TContaAreceber } from "../../contasAReceber/type/TContasAReceber"
import { TItens } from "../../products/type/TProducts"

export type TSale = {
    filial: number
    user: {
        user_id: number 
        user_name: string
    }
    person: {
        fk_name_pers: number
        name_pers: string
        cpf_pers: string
        phone_pers: string
        address: {
            address_pers: string
            num_address:string
            bairro_pers: string
            fk_cep: number
            name_city: string
            uf: string
            num_cep: string
        }
    }
    disc_sale: number | any
    installments: number | any
    paySale: any
    dinheiro: any
    tItens: number
    tNote: number
    itens: TItens[]
    duplicatas: TContaAreceber[]
}

export type TSaleList = {
    id_sale: number;
    created_at: Date | any;
    fk_name_pers: number;
    fk_name_filial?: number
    fk_name_user?: number
    val_rec: number;
    disc_sale: number;
    total_sale: number
    id_nfe?: string
    doc_nfe?: string
    situacao_nfe?: string
    chave_nfe?: string
    protocolo_nfe?: string
};
