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
    const isLoggedParams: number = isLogged[0].id
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado")
    const [dropdown, setDropdown] = useState<string>("");
    const modalRef = useRef<any>(null);
    const [flagRegister, setFlagRegister] = useState<boolean>(false)
    const [msg, setMsg] = useState('')
    const [persons, setPersons] = useState<TPerson[]>([])
    const [ceps, setCeps] = useState<ICeps[]>([])
    const [cities, setCities] = useState<ICities[]>([])
    const [person, setPerson] = useState<TPerson>({
        created_at: '',
        updated_at: '',
        name_pers: '',
        date_of_birth: "",
        age: 0,
        num_address: "",
        cpf_pers: "0",
        phone_pers: "",
        address_pers: "",
        bairro_pers: "",
        fk_cep: 0,
        name_city: "",
        uf: "",
        num_cep: "",
        fk_name_filial: 1,
        fk_id_user: isLoggedParams,
        rg: '0',
        cnpj: '0',
        inscricao: '0',
        fantasia: '',
        limit_cred: 800,
        fk_grupo: 1
    })

    const clearFields = () => {
        const cleared: TPerson = Object.keys(person).reduce((acc: any, key) => {
            acc[key] = ''; // ou null, ou 0 dependendo do tipo
            return acc;
        }, {} as typeof person);
        cleared.id_person = 0
        cleared.age = 0
        cleared.cpf_pers = '0'
        cleared.cnpj = '0'
        cleared.fk_name_filial = 1
        cleared.fk_cep = 0
        cleared.fk_grupo = 0
        cleared.fk_id_user = isLoggedParams
        cleared.limit_cred = 800
        cleared.fk_grupo = 1
        setPerson(cleared);
    };

    const updatePerson = (Person: TPerson) => {
        person.fk_cep = setNumCep(person.num_cep);
        setPerson(Person)
        toggleDropdown()
    };

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setPerson(values => ({ ...values, [name]: value }))
    };

    async function getPersons() {
        postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged)
    };

    useEffect(() => {
        getPersons()
    }, [])

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (PersonsValFields(person, setMsg)) {
            updatePerson(person); // Atualiza o CEP do Cliente !!
            person.cpf_pers = person.cpf_pers.replace(/[..-]/g, '')
            person.phone_pers = person.phone_pers.replace(/[()-]/g, '')
            person.cnpj = person.cnpj.replace(/[../-]/g, '')
            person.rg = person.rg.replace(/[..-]/g, '')
            if (person.fk_cep === undefined) {
                setMsg('Digite um CEP Válido')
            } else {
                await api.post<any[]>('person', person)
                    .then(response => {
                        const res = response.data
                        const msg = JSON.stringify(res)
                        setMsg(msg)
                    })
                    .catch(error => setMsg(error));
            }
        } else { setMsg("Digite um novo Usuário") }
    }

    async function handleUpdate(e: Event) {
        e.preventDefault();
        if (PersonsValFields(person, setMsg)) {
            updatePerson(person); //Atualiza o CEP do Cliente
            person.cpf_pers = person.cpf_pers.replace(/[..-]/g, '')
            person.phone_pers = person.phone_pers.replace(/[()-]/g, '')
            person.cnpj = person.cnpj.replace(/[../-]/g, '')
            person.rg = person.rg.replace(/[..-]/g, '')
            if (person.fk_cep === undefined) {
                setMsg('Digite um CEP Válido')
            } else {
                await api.put('person_update', person)
                    .then(response => {
                        setMsg(response.data)
                    })
                    .catch(error => setMsg(error));
            }
        }
    }

    async function handleNewPerson(e: Event) {
        e.preventDefault()
        setFlagRegister(true)
        clearFields()
        setMsg("Insira um Novo Cliente")
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
                handleNewPerson={handleNewPerson}
                handleChange={handleChange}
                close={closeDropdown}
                className={dropdown}
                modalRef={modalRef}
                msg={msg}
                flagRegister={flagRegister}
            >
                {person}
            </PersonFormUpdate>
            <Dashboard />
            <p className="text-center">{handleTokenMessage('person_update', tokenMessage)}</p>
            <h1 className="text-center">Listar e Atualização de Clientes</h1>
            {persons.length === 0 ? <p className="text-center">Carregando ...</p> : (
                persons.map((Person: TPerson) => (
                    <PersonList
                        key={Person.id_person}
                        id_person={Person.id_person}
                        created_at={FormatDate(Person.created_at)}
                        updated_at={Person.updated_at === null ?
                            "Não Houve Atualização" : (FormatDate(Person.updated_at))}
                        name={Person.name_pers}
                        date_of_birth={Person.date_of_birth ? FormatDate(Person.date_of_birth) : "Não Informado"}
                        age={Person.age && Person.age}
                        phone={Person.phone_pers}
                        address={Person.address_pers}
                        num_address={Person.num_address}
                        bairro={Person.bairro_pers}
                        num_cep={Person.num_cep = setCep(Person.fk_cep)?.num_cep}
                        name_city={Person.name_city = setCity(Person.fk_cep)?.name_city}
                        uf={Person.uf = setCity(Person.fk_cep)?.uf}
                        cpf={Person.cpf_pers}
                        rg={Person.rg}
                        cnpj={Person.cnpj}
                        inscricao={Person.inscricao}
                        id_user={Person.fk_id_user}
                        filial={Person.fk_name_filial}
                        fk_grupo={Person.fk_grupo}
                        update={<button className="container" onClick={() => updatePerson(Person)}>Atualizar</button>}
                        dropdown={dropdown}
                    />
                )))}
        </>
    )
}

