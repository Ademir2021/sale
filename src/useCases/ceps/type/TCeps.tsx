export interface ICountries {
    id_country: number;
    name_country: string;
    acronym: number; //abreviação
    ddi: number;
    code_country: number //float code do País
    code_revenue: number;
    created_at?: Date;
};
export interface ICities {
    id_city: number;
    name_city: string | undefined | any;
    uf: string;
    code_ibge: string;
    code_state_revenue: number;
    code_country: ICountries;
    created_at: Date;
    code_federal_revenue: number //float 
};
export interface ICeps {
    id_cep?: number;
    num_cep: string;
    code_city: number;
    type_cep: string;
    public_place: string; //logradouro
    num_initial: Number
    num_final: number
    complement: string
    created_at?: Date
    city: string | undefined | any;
    uf: string;
};