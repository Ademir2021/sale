import { TFilial } from "./type/TFilial";

class HandleFilial {

    clearFieldFilial(Filial: TFilial) {
        const res: TFilial = {
            id_filial: 0,
            created_at: '',
            updated_at: '',
            name_filial: '',
            fantasia: '',
            address: '',
            cnpj: '',
            inscric: '',
            phone: '',
            email: '',
            fk_person: 0
        }
        return res
    }
}

export { HandleFilial }