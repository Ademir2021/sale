import { TDespesa } from "../contasAPagar/type/TContasAPagar"

class HandleDespesa {
    clearField(Despesa: TDespesa) {
        const res: TDespesa = {
            id: 0,
            name: '',
            fk_setor: 0
        }
        return res
    }
}

export { HandleDespesa }