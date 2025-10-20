import { useState, useEffect } from "react";
import { ClasseProdForm } from "../../components/classeProd/ClasseProd";
import { TClasseProd } from "../products/type/TProducts";
import { getList } from "../../services/handleService";
import api from "../../services/api/api";

const ClasseProd = () => {

    const [msg, setMsg] = useState('')
    const [classes, setClasseProds] = useState<TClasseProd[]>([])
    const [classe, setClasseProd] = useState<TClasseProd>({
        id_classe: 0,
        name_classe: ''
    })

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setClasseProd(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        getList('classes_prods', setClasseProds)
    }, [classes])

    const updateClasse = (Classe:TClasseProd)=>{
        setClasseProd(Classe)
        setMsg('')
    }

    const handleClasseRegister = async () => {
        await api.post('/classe_prod', classe)
            .then(response => {
                const res: any = response.data
                // setMsg(res[0].msg)
                if(!res)
                setMsg('Inserido com sucesso')
            }).catch(error => setMsg(error))
    }

    const handleClasseUpdate = async () => {
        await api.put('/classe_prod', classe)
            .then(response => {
                const res: any = response.data
                // setMsg(res[0].msg)
                if(!res)
                    setMsg("Atualizado com sucesso")
            }).catch(error => setMsg(error))
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        if (classe.name_classe !== "") {
            classe.id_classe == 0 ?
                handleClasseRegister() :
                handleClasseUpdate()
        } else {
            setMsg("Informe o nome da Classe")
        }

        setClasseProd({
            id_classe:0,
            name_classe:''
        })
    }

    return <>
        <ClasseProdForm
            classes={classes}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            msg={msg}
            updateClasse={updateClasse}
            seTClasseProd={setClasseProd}
        >
            {classe}
        </ClasseProdForm>
    </>
}

export { ClasseProd }

