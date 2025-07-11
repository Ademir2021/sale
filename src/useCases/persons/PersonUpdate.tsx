import { useState, useEffect, useRef, useContext } from "react"
import { FormatDate } from "../../components/utils/formatDate"
import { PersonFormUpdate } from "../../components/persons/PersonFormUpdate"
import { PersonList } from "../../components/persons/PersonList"
import { Dashboard } from "../dashboard/Dashboard"
import { TPerson } from './type/TPerson'
import { ICeps, ICities } from "../ceps/type/TCeps"
import { PersonsValFields } from "./valsFields/ValFields"
import { postAuthHandle, getList } from "../../services/handleService"

import { AuthContext } from '../../context/auth'
import api from "../../services/api/api"

import "../../App.css"
import { handleTokenMessage } from "../../services/handleEnsureAuth"

export function PersonUpdate() {
    const { user: isLogged }: any = useContext(AuthContext)
    const [flagRegister, setFlagRegister] = useState<boolean>(false)
    const [alert_, setAlert_] = useState<string>('')
    const [persons, setPersons] = useState<TPerson[]>([])
    const [ceps, setCeps] = useState<ICeps[]>([])
    const [cities, setCities] = useState<ICities[]>([])
    const [person, setPerson] = useState<TPerson>({
        created_at: '', updated_at: '', name_pers: '',
        num_address: "", cpf_pers: "0", phone_pers: "", address_pers: "",
        bairro_pers: "", fk_cep: 0, name_city: "", uf: "",
        num_cep: "", fk_name_filial: 1, fk_id_user: 0, rg: '0',
        cnpj: '0', inscricao: '0', fantasia: '', limit_cred: 800, fk_grupo: 1
    })
    const isLoggedParams: number = isLogged[0].id
    const [dropdown, setDropdown] = useState<string>("");
    const modalRef = useRef<any>(null);
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

    function clearFields() {
        setPerson({
            id_person: 0, created_at: '', name_pers: '', cpf_pers: "0",
            phone_pers: "", address_pers: "", num_address: '', bairro_pers: "", fk_cep: 0,
            name_city: "", uf: "", num_cep: "", fk_name_filial: 1, fk_id_user: 0, rg: '0',
            cnpj: '0', inscricao: '0', fantasia: '', limit_cred: 800, fk_grupo: 1
        })
    }

    function listUpdate(pers: TPerson) {
        person.id_person = pers.id_person
        person.name_pers = pers.name_pers
        person.cpf_pers = pers.cpf_pers
        person.phone_pers = pers.phone_pers
        person.address_pers = pers.address_pers
        person.num_address = pers.num_address
        person.bairro_pers = pers.bairro_pers
        person.num_cep = pers.num_cep
        person.fk_cep = setNumCep(person.num_cep);
        person.name_city = pers.name_city
        person.uf = pers.uf
        person.rg = pers.rg
        person.cnpj = pers.cnpj
        person.inscricao = pers.inscricao
        person.fantasia = pers.fantasia
        person.limit_cred = pers.limit_cred
        person.fk_grupo = pers.fk_grupo
        toggleDropdown()
    };

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setPerson(values => ({ ...values, [name]: value }))
    };

    async function getPersons() {
        postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged)
        for (let res of persons) {
            if (person.id_person === res.id_person)
                person.name_pers = res.name_pers
            person.cpf_pers = res.cpf_pers
            person.phone_pers = res.phone_pers
            person.address_pers = res.address_pers
            person.num_address = res.num_address
            person.bairro_pers = res.bairro_pers
            person.fk_name_filial = res.fk_name_filial
            person.fk_id_user = res.fk_id_user
            person.rg = res.rg
            person.cnpj = res.cnpj
            person.inscricao = res.cnpj
            person.fantasia = res.fantasia
            person.limit_cred = res.limit_cred
            person.fk_grupo = res.fk_grupo
        }
    };

    if (person.fk_id_user === 0) { /** Busca Person somente 1 vez ! */
        getPersons()
        person.fk_id_user = isLoggedParams
    }

    useEffect(() => {
    }, [person.id_person])

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (PersonsValFields(person, setAlert_)) {
            listUpdate(person); // Atualiza o CEP do Cliente !!
            person.cpf_pers = person.cpf_pers.replace(/[..-]/g, '')
            person.phone_pers = person.phone_pers.replace(/[()-]/g, '')
            person.cnpj = person.cnpj.replace(/[../-]/g, '')
            person.rg = person.rg.replace(/[..-]/g, '')
            if (person.fk_cep === undefined) {
                setAlert_('Digite um CEP Válido')
            } else {
                await api.post<any[]>('person', person)
                    .then(response => {
                        const res = response.data
                        const msg = JSON.stringify(res)
                        alert(msg)
                    })
                    .catch(error => alert(error));
            }
        } else { setAlert_("Digite um novo Usuário") }
    }

    async function handleUpdate(e: Event) {
        e.preventDefault();
        if (PersonsValFields(person, setAlert_)) {
            listUpdate(person); //Atualiza o CEP do Cliente
            person.cpf_pers = person.cpf_pers.replace(/[..-]/g, '')
            person.phone_pers = person.phone_pers.replace(/[()-]/g, '')
            person.cnpj = person.cnpj.replace(/[../-]/g, '')
            person.rg = person.rg.replace(/[..-]/g, '')
            if (person.fk_cep === undefined) {
                setAlert_('Digite um CEP Válido')
            } else {
                await api.put<any[]>('person_update', person)
                    .then(response => {
                        alert(response.data)
                    })
                    .catch(error => alert(error));
            }
        }
    }

    async function handleDelete(e: Event) {
        e.preventDefault()
        setFlagRegister(true)
        clearFields()
        setAlert_("Insira um novo Cliente !!")
    }

    function toggleDropdown(): void {
        setDropdown("modal-show");
    };

    function closeDropdown(e: Event) {
        e.stopPropagation();
        const contain = modalRef.current.contains(e.target);
        if (contain) {
            setDropdown("");
            document.body.removeEventListener("click", closeDropdown);
        }
        if (person.name_pers !== null) {
            window.location.replace("/invoice_sales");
        }
    };

    useEffect(() => {
        getList('ceps', setCeps)
    }, [ceps])

    useEffect(() => {
        getList('cities', setCities)
    }, [cities])

    function setCep(idCep: number) {
        for (let cep of ceps) {
            if (cep.id_cep === idCep)
                return cep
        }
    }

    function setCity(idCep: number) {
        for (let city of cities) {
            if (city.id_city === idCep)
                return city
        }
    }

    const setNumCep = (numCep: string) => {
        for (let cep of ceps) {
            if (cep.num_cep === numCep)
                return cep.id_cep;
        }
        for (let cep of ceps) {
            if (cep.num_cep !== numCep)
                return undefined;
        }
    }

    return (
        <>
            <PersonFormUpdate
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleChange={handleChange}
                close={closeDropdown}
                className={dropdown}
                modalRef={modalRef}
                alert={alert_}
                message=""
                flagRegister={flagRegister}
            >
                {person}
            </PersonFormUpdate>
            <Dashboard />
               {handleTokenMessage('person_update', tokenMessage)}
                <h1 className="text-center">Lista de Clientes</h1>
            {persons.length === 0 ? <p>Carregando...</p> : (
                persons.map((per: TPerson) => (
                    <PersonList
                        key={per.id_person}
                        id_person={per.id_person}
                        created_at={FormatDate(per.created_at)}
                        updated_at={per.updated_at === null ?
                            "não houve atualização" : (FormatDate(per.updated_at))}
                        name={per.name_pers}
                        phone={per.phone_pers}
                        address={per.address_pers}
                        num_address={per.num_address}
                        bairro={per.bairro_pers}
                        num_cep={per.num_cep = setCep(per.fk_cep)?.num_cep}
                        name_city={per.name_city = setCity(per.fk_cep)?.name_city}
                        uf={per.uf = setCity(per.fk_cep)?.uf}
                        cpf={per.cpf_pers}
                        rg={per.rg}
                        cnpj={per.cnpj}
                        inscricao={per.inscricao}
                        id_user={per.fk_id_user}
                        filial={per.fk_name_filial}
                        fk_grupo={per.fk_grupo}
                        update={<button
                            className="btn btn-primary"
                            id='m-2'
                            onClick={() => listUpdate(per)}>Atualizar</button>}
                        dropdown={dropdown}
                    />
                )))}
        </>
    )
}

