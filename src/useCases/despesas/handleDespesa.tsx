import { TDespesa, TSetorDespesa } from "../contasAPagar/type/TContasAPagar"

class HandleDespesa {
    clearField(Despesa: TDespesa) {
        const res: TDespesa = {
            id: 0,
            name: '',
            fk_setor: 0
        }
        return res
    }

    clearFieldSetorDespesa(SetorDespesa: TSetorDespesa) {
        const res: TSetorDespesa = {
            id: 0,
            name: '',
            tipo: ''
        }
        return res
    }
}

export { HandleDespesa }