export type TProduct = {
    id_product: number;
    created_at?: Date | any;
    updated_at?: Date | any | null;
    descric_product: string | number
    amount?: number | undefined | any;
    val_max_product: number;
    val_min_product: number;
    fk_brand: number | any;
    fk_sector: number | any;
    fk_un_med: number | any;
    bar_code: string;
    image?: | string;
    fk_classe: number | any;
    fk_grupo_fiscal: number | any
    fk_tipo_prod:number | any
    ncm:string
};

export type TItem = {
    descric: string;
};

export type TItens = {
    id: number;
    item: number;
    descric: string | number;
    amount: number;
    valor: number;
    tItem: number;
    image?: string;
};

export type TBrand = {
    id_brand: number;
    name_brand: string;
};

export type TSector = {
    id_sector: number;
    name_sector: string;
};

export type TUnMed = {
    id_un: number;
    un_med: string;
};

export type TClasseProd = {
    id_classe: number;
    name_classe: string;
};

export type TGrupoFiscal = {
    id_grupo_fiscal: number;
    name_grupo_fiscal: string;
    fk_tabela_trib: number;
};

export type TTipoProd = {
    id_tipo: number;
    name_tipo: string;
};

export type TNcm = {
    Codigo:string;
    Descricao:string
}
