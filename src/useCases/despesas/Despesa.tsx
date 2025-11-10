import { useEffect, useState } from "react"
import { DespesaForm } from "../../components/despesas/DespesaForm"
import { TDespesa, TSetorDespesa } from "../contasAPagar/type/TContasAPagar"
import api from "../../services/api/api"
import { postRegister } from "../../services/handleService"

const Despesa = () => {
    const [msg, setMsg] = useState('Aguardando Descrição da Despesas')
    const [despesas, setDespesas] = useState<TDespesa[]>([])
    const [setorDespesas, setSetorDespesas] = useState<TSetorDespesa[]>([])
    const [iDSetorDespesa, setIDSetorDespesa] = useState(0)
    const [despesa, setDespesa] = useState<TDespesa>({
        id: 0,
        name: "",
        fk_setor: 0
    });

    useEffect(() => {
        despesa.fk_setor = iDSetorDespesa
    }, [iDSetorDespesa])

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setDespesa(values => ({ ...values, [name]: value }))
    }

    const getSetorDespesas = async () => {
        try {
            await api.get<TSetorDespesa[]>('setor_despesas')
                .then(response => {
                    setSetorDespesas(response.data)
                })
        } catch (err) { console.log("err: " + err) }
    };

    useEffect(() => {
        getSetorDespesas()
    }, [setorDespesas])

    const getDespesas = async () => {
        try {
            await api.get<TDespesa[]>('despesas')
                .then(response => {
                    setDespesas(response.data)
                })
        } catch (err) { console.log("err: " + err) }
    };
    useEffect(() => {
        getDespesas()
    }, [despesa, despesas])

    const findSetorDespesa = (Despesa: TDespesa) => {
        for (let s of setorDespesas)
            if (s.id === Despesa.fk_setor)
                return s
    };

    const despesaUpdate = (Despesa: TDespesa) => {
        setDespesa(Despesa)
    };

    const despesaClear: TDespesa = ({
        id: 0,
        name: '',
        fk_setor: 0
    })

    const handleDespesaUpdate = async () => {
        await api.put<TDespesa>('despesa', despesa)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))
        setDespesa(despesaClear)
        setMsg('Despesa Atualizada com sucesso')
    }
    const handleDespesaRegister = () => {
        postRegister(despesa, 'despesa')
        setDespesa(despesaClear)
        setMsg('Despesa Gravada com sucesso')
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        if (despesa.name != "" && despesa.fk_setor != 0) {
            despesa.id === 0 ? handleDespesaRegister() :
                handleDespesaUpdate()
        } else {
            setMsg("Insira à Descrição da Despesa e Selecione o Setor")
        }
    };

    return <>
        <DespesaForm
            despesas={despesas}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setDespesa={setDespesa}
            despesaUpdate={despesaUpdate}
            findSetorDespesa={findSetorDespesa}
            msg={msg}
            listSetorDespesas={<select
                onChange={e => setIDSetorDespesa(parseInt(e.target.value))} defaultValue=""
            >
                <option disabled value="">Selecione o Setor da Despesa...</option>
                {setorDespesas.map((despesa: TSetorDespesa) => (
                    <option
                        key={despesa.id}
                        value={despesa.id}
                    >
                        {despesa.id + " - " + despesa.name + " - " + despesa.tipo}
                    </option>
                ))}
            </select>}
        >
            {despesa}
        </DespesaForm>
    </>
}

export { Despesa }