import { useEffect, useState } from "react"
import { DespesaForm } from "../../components/despesas/DespesaForm"
import { TDespesa } from "../contasAPagar/type/TContasAPagar"
import api from "../../services/api/api"



const Despesa = () => {
    const [despesas, setDespesas] = useState<TDespesa[]>([])
    const [despesa, setDespesa] = useState<TDespesa>({
        id: 0,
        name: "",
        fk_setor: 0
    });

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setDespesa(values => ({ ...values, [name]: value }))
    }

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
    }, [despesas])

    const despesaUpdate = (Despesa:TDespesa) =>{
        setDespesa(Despesa)
    }

    const handleSubmit = (e:Event)=>{
        e.preventDefault()
        alert('ok')
    }

    return <>
        <p>{JSON.stringify(despesa)}</p>
        <DespesaForm
            despesas={despesas}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setDespesa={setDespesa}
            despesaUpdate={despesaUpdate}
        >
            {despesa}
        </DespesaForm>
    </>
}

export { Despesa }