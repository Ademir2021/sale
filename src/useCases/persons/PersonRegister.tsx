import { useState, useEffect } from "react";
import { PersonForm } from '../../components/persons/PersonForm';
import { Dashboard } from "../dashboard/Dashboard";
import { TPerson} from "./type/TPerson";
import { ICeps } from "../ceps/type/TCeps";
import { PersonsValFields } from "./valsFields/ValFields";
import { getList } from "../../services/handleService";

import api from "../../services/api/api";

export function FormPerson() {
    const [person, setPerson] = useState<TPerson>({
        name_pers: "", cpf_pers: "", phone_pers: "", address_pers: "",
        num_address: "", bairro_pers: "", fk_cep: 0, name_city: "", uf: "",
        num_cep: "", fk_name_filial: 1, fk_id_user: 0, rg:'',
        cnpj:'',inscricao:'',fantasia:'',limit_cred:800,fk_grupo:1
    })

    const [alert_, setAlert_] = useState<string>('')
    const [ceps, setCeps] = useState<ICeps[]>([])
    const res: any = localStorage.getItem('u')
    const [userIdLogged] = useState(JSON.parse(res))
    person.fk_id_user = userIdLogged[0].id

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setPerson(values => ({ ...values, [name]: value }))
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (PersonsValFields(person, setAlert_)) {
            if(person.cpf_pers == ''){
                person.cpf_pers = '0'
            }
            if(person.cnpj == ''){
                person.cnpj = '0'
            }
            person.cpf_pers = person.cpf_pers.replace(/[..-]/g, '')
            person.phone_pers = person.phone_pers.replace(/[()-]/g, '')
            person.cnpj = person.cnpj.replace(/[../-]/g, '')
            person.rg = person.rg.replace(/[..-]/g, '')
            new setNumCeps().setNumCep()
            if (person.fk_cep === undefined) {
                alert("Digite um CEP válido")
            } else {
                await api.post<any[]>('person', person)
                    .then(response => {
                        const res = response.data
                        const msg = JSON.stringify(res)
                        alert(msg)
                    })
                    .catch(error => alert(error));
            }
        }
    }

    useEffect(() => {
        getList('ceps',setCeps)
    }, [ceps])

    class setNumCeps {
        setNumCep() {
            for (let cep of ceps) {
                if (cep.num_cep !== person.num_cep)
                    person.fk_cep = undefined
                setPerson(person)
            }
            for (let cep of ceps) {
                if (cep.num_cep === person.num_cep)
                    person.fk_cep = cep.id_cep;
                setPerson(person)
            }
        }
    }

    return (
        <>
            <Dashboard />
            <PersonForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                alert={alert_}
                message=""
            >
                {person}
            </PersonForm>
        </>
    )
}
