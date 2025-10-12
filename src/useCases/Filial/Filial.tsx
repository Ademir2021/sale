import { useState, useEffect } from "react";
import { getList } from "../../services/handleService";
import api from "../../services/api/api";
import { FilialForm } from "../../components/Filiais/FilialForm";
import { TPerson } from "../persons/type/TPerson";
import { TFilial } from "./type/TFilial";

const Filial = () => {

    const [msg, setMsg] = useState('')
    const [persons, setPersons] = useState<TPerson[]>([])
    const[selectedIdPerson, setSelectedIdPerson] = useState<any>(1)
    const [filiais, setFiliais] = useState<TFilial[]>([])
    const [filial, setFilial] = useState<TFilial>({
        id_filial: 0,
        created_at: new Date(),
        updated_at: new Date(),
        name_filial:'',
        fantasia:'',
        address:'',
        cnpj:'',
        inscric:'',
        phone:'',
        email:'',
        fk_person:0
    })

     // Atualiza  somente se selecionar
    if (selectedIdPerson !== 1) {
        filial.fk_person = parseInt(selectedIdPerson);
    }

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setFilial(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        getList('filiais', setFiliais)
    }, [filiais])

     useEffect(() => {
        getList('persons', setPersons)
    }, [persons])

    const updateFilial = (Filial:TFilial)=>{
        setFilial(Filial)
        setMsg('')
    }

    const findNamePerson = (filial:TFilial) =>{
        for(let person of persons)
            if(person.id_person == filial.fk_person)
                return person
    }

    const handleFilialRegister = async () => {
        await api.post('/filial', filial)
            .then(response => {
                const res: any = response.data
                // setMsg(res[0].msg)
                if(!res)
                    setMsg("Inserido com Sucesso")
            }).catch(error => setMsg(error))
    }

    const handleFilialUpdate = async () => {
        await api.put('/filial', filial)
            .then(response => {
                const res: any = response.data
                // setMsg(res[0].msg)
                if(!res)
                    setMsg("Atualizado com sucesso")
            }).catch(error => setMsg(error))
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        if (filial.name_filial !== "") {
            filial.id_filial == 0 ?
                handleFilialRegister() :
                handleFilialUpdate()
        } else {
            setMsg("Informe o nome da Filial")
        }
    }

    return <>
    <p>{JSON.stringify(filial)}</p>
        <FilialForm
            filiais={filiais}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            msg={msg}
            updateFilial={updateFilial}
            setFilial={setFilial}
             listFilial={<select
                    onChange={e => setSelectedIdPerson(e.target.value)}
                >
                    {persons.map((person:TPerson) => (
                        <option
                            key={person.id_person}
                            value={person.id_person}
                        >
                            {person.name_pers}
                        </option>))}</select>}
                        selectedIdPerson={filial.fk_person}
                        findNamePerson={findNamePerson}
        >
            {filial}
        </FilialForm>
    </>
}

export { Filial }

