import { useEffect, useState } from "react"
import { SetorDespesaForm } from "../../components/despesas/SetorDespesaForm"
import { TSetorDespesa, TTipoSetor } from "../contasAPagar/type/TContasAPagar"
import api from "../../services/api/api"
import { postRegister } from "../../services/handleService"

const SetorDespesa = () => {
    const [msg, setMsg] = useState('Insira um Setor para Despesa')
    const [setorDespesas, setSetorDespesas] = useState<TSetorDespesa[]>([])
    const [tipoSetorDespesa, setTipoSetorDespesa] = useState<TTipoSetor | any>('')
    const [setorDespesa, setSetorDespesa] = useState<TSetorDespesa>({
        id: 0,
        name: '',
        tipo: tipoSetorDespesa
    })

    useEffect(()=>{
        setTimeout(()=>{
            setorDespesa.id === 0 ?
            setMsg("Insira um Setor para Despesas") :
            setMsg('Atualize o Setor das Despesas')
        },3000)
    },[setorDespesa])

    useEffect(() => {
        setorDespesa.tipo = tipoSetorDespesa
    }, [tipoSetorDespesa])

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setSetorDespesa(values => ({ ...values, [name]: value }))
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

    const setorDespesaUpdate = (SetorDespesa: TSetorDespesa) => {
        setSetorDespesa(SetorDespesa)

    }

    const setorDespesaClear: TSetorDespesa = ({
        id: 0,
        name: '',
        tipo: ''
    })

    const handleSetorDespesaUpdate = async () => {
        await api.put<TSetorDespesa>('setor_despesa', setorDespesa)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))
        setSetorDespesa(setorDespesaClear)
        setMsg('Setor da Despesa Atualizada com sucesso')
    };

    const handleSetorDespesaRegister = async () => {
        postRegister(setorDespesa, 'setor_despesa')
        setSetorDespesa(setorDespesaClear)
        setMsg('Setor da Despesa Gravada com sucesso')
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        if (setorDespesa.name && setorDespesa.tipo !== '') {
            setorDespesa.id === 0 ?
                handleSetorDespesaRegister() :
                handleSetorDespesaUpdate()
        } else {
            setMsg('Insira um Descrição e Tipo para Despesa')
        }
    }

    return <>
        <SetorDespesaForm
            setorDespesas={setorDespesas}
            handleChange={handleChange}
            setSetorDespesa={setSetorDespesa}
            setorDespesaUpdate={setorDespesaUpdate}
            handleSubmit={handleSubmit}
            msg={msg}
            listSetorDespesas={<><select
                onChange={(e: any) => setTipoSetorDespesa(e.target.value)}
                defaultValue=""
            >
                <option disabled value="">Selecione o Tipo da Despesa...</option>
                <option value='Fixa'>Fixa</option>
                <option value='Variavel'>Variavel</option>
                <option value=''>Nenhum</option>
            </select>
                <p>Tipo selecionado: {tipoSetorDespesa !== '' ?
                    setorDespesa.tipo = tipoSetorDespesa :
                    tipoSetorDespesa || "nenhum"}</p> </>}
        >
            {setorDespesa}
        </SetorDespesaForm>
    </>
}

export { SetorDespesa }