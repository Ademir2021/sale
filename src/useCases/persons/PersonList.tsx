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
    const [persons, setPersons] = useState<TPerson[]>([])
    const [ceps, setCeps] = useState<ICeps[]>([])
    const [cities, setCities] = useState<ICities[]>([])
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

    useEffect(() => {
       postAuthHandle('persons_user',setTokenMessage,setPersons, isLogged)
    }, [persons])

    useEffect(() => {
        getList('ceps',setCeps)
    }, [ceps])

    useEffect(() => {
    getList('cities',setCities)
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

    return (
        <>
            <Dashboard />
            <h1 className="text-center">Lista de Clientes</h1>
            {handleTokenMessage('person_list', tokenMessage)}
            {persons.length === 0 ? <p>Carregando...</p> : (
                persons.map((per: TPerson) => (
                    <PersonList
                        key={per.id_person}
                        id_person={per.id_person}
                        created_at={FormatDate(per.created_at)}
                        updated_at={(per.updated_at === null ?
                            "não houve atualização" : FormatDate(per.updated_at))}
                        name={per.name_pers}
                        phone={per.phone_pers}
                        address={per.address_pers}
                        num_address={per.num_address}
                        bairro={per.bairro_pers}
                        num_cep={per.num_cep = setCep(per.fk_cep)?.num_cep}
                        name_city={setCity(per.fk_cep)?.name_city}
                        uf={setCity(per.fk_cep)?.uf}
                        cpf={per.cpf_pers}
                        rg={per.rg}
                        cnpj={per.cnpj}
                        inscricao={per.inscricao}
                        id_user={per.fk_id_user}
                        filial={per.fk_name_filial}
                        fk_grupo={per.fk_grupo}
                        update={null}
                        dropdown=""
                    />
                )))}
        </>
    )
}