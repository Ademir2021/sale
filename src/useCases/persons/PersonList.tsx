import { useState, useEffect, useContext } from "react";
import { FormatDate } from "../../components/utils/formatDate";
import { PersonList } from "../../components/persons/PersonList";
import { Dashboard } from "../dashboard/Dashboard";
import { TPerson } from './type/TPerson'
import { ICeps, ICities } from "../ceps/type/TCeps";
import { postAuthHandle, getList } from "../../services/handleService";

import { AuthContext } from '../../context/auth'
import { handleTokenMessage } from "../../services/handleEnsureAuth";

export function PersonsList() {

    const { user: isLogged }: any = useContext(AuthContext);
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

    const [persons, setPersons] = useState<TPerson[]>([])
    const [cities, setCities] = useState<ICities[]>([])
    const [ceps, setCeps] = useState<ICeps[]>([])

    useEffect(() => {
        postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged)
    }, [persons])

    useEffect(() => {
        getList('ceps', setCeps)
    }, [ceps])

    useEffect(() => {
        getList('cities', setCities)
    }, [cities])

    function setCep(idCep: number) {
        for (let cep of ceps) {
            if (cep.id_cep === idCep)
                return cep;
        }
    }

    function setCity(idCep: number) {
        for (let city of cities) {
            if (city.id_city === idCep)
                return city
        }
    }

    return <>
            <Dashboard />
            <h1 className="text-center">Lista de Clientes</h1>
            {handleTokenMessage('person_list', tokenMessage)}
            {persons.length === 0 ? <p>Carregando...</p> : (
                persons.map((person) => (
                    <PersonList
                        key={person.id_person}
                        id_person={person.id_person}
                        created_at={FormatDate(person.created_at)}
                        updated_at={person.updated_at ?
                            FormatDate(person.updated_at) :
                            "Não houve atualização"
                        }
                        name={person.name_pers}
                        date_of_birth={person.date_of_birth ?
                            FormatDate(person.date_of_birth) :
                            "Não informado"}
                        age={person.age}
                        phone={person.phone_pers}
                        address={person.address_pers}
                        num_address={person.num_address}
                        bairro={person.bairro_pers}
                        num_cep={person.num_cep = setCep(person.fk_cep)?.num_cep}
                        name_city={setCity(person.fk_cep)?.name_city}
                        uf={setCity(person.fk_cep)?.uf}
                        cpf={person.cpf_pers}
                        rg={person.rg}
                        cnpj={person.cnpj}
                        inscricao={person.inscricao}
                        id_user={person.fk_id_user}
                        filial={person.fk_name_filial}
                        fk_grupo={person.fk_grupo}
                        update={null}
                        dropdown=""
                    />
                )))}
        </>
}