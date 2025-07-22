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

    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

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

    function listUpdate(persUpdate: TPerson) {
        person.id_person = persUpdate.id_person
        person.name_pers = persUpdate.name_pers
        person.cpf_pers = persUpdate.cpf_pers
        person.phone_pers = persUpdate.phone_pers
        person.address_pers = persUpdate.address_pers
        person.num_address = persUpdate.num_address
        person.bairro_pers = persUpdate.bairro_pers
        person.num_cep = persUpdate.num_cep
        person.fk_cep = setNumCep(person.num_cep);
        person.name_city = persUpdate.name_city
        person.uf = persUpdate.uf
        person.rg = persUpdate.rg
        person.cnpj = persUpdate.cnpj
        person.inscricao = persUpdate.inscricao
        person.fantasia = persUpdate.fantasia
        person.limit_cred = persUpdate.limit_cred
        person.fk_grupo = persUpdate.fk_grupo
        person.date_of_birth = persUpdate.date_of_birth
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
            listUpdate(person); // Atualiza o CEP do Cliente !!
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
            listUpdate(person); //Atualiza o CEP do Cliente
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
        setMsg("Insira um novo Cliente !!")
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
            {handleTokenMessage('person_update', tokenMessage)}
            <h1 className="text-center">Escolha o cliente para atualizar</h1>
            {persons.length === 0 ? <p>Carregando...</p> : (
                persons.map((per: TPerson) => (
                    <PersonList
                        key={per.id_person}
                        id_person={per.id_person}
                        created_at={FormatDate(per.created_at)}
                        updated_at={per.updated_at === null ?
                            "não houve atualização" : (FormatDate(per.updated_at))}
                        name={per.name_pers}
                        date_of_birth={per.date_of_birth ? FormatDate(per.date_of_birth) : "Não informado"}
                        age={per.age && per.age}
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
                        update={<a
                            href="##"
                            onClick={() => listUpdate(per)}>Atualizar</a>}
                        dropdown={dropdown}
                    />
                )))}
        </>
    )
}

