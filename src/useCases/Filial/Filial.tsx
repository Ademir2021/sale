import { useState, useEffect, useContext } from "react";
import { getList, postAuthHandle } from "../../services/handleService";
import api from "../../services/api/api";
import { FilialForm } from "../../components/Filiais/FilialForm";
import { TPerson } from "../persons/type/TPerson";
import { TFilial } from "./type/TFilial";

import { AuthContext } from '../../context/auth'
import { handleTokenMessage } from "../../services/handleEnsureAuth";
import { FormatDate } from "../../components/utils/formatDate";


const Filial = () => {
    const { user: isLogged }: any = useContext(AuthContext);
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado!");
    const [msg, setMsg] = useState('');
    const [persons, setPersons] = useState<TPerson[]>([]);
    const [selectedIdPerson, setSelectedIdPerson] = useState<any>(1);
    const [filiais, setFiliais] = useState<TFilial[]>([]);
    const [filial, setFilial] = useState<TFilial>({
        id_filial: 0,
        created_at: '',
        updated_at: '',
        name_filial: '',
        fantasia: '',
        address: '',
        cnpj: '',
        inscric: '',
        phone: '',
        email: '',
        fk_person: 0
    });

    const findFilialOnPerson = (persons: TPerson[]) => {
        return persons.find(person => person.id_person === selectedIdPerson);
    };

    // Atualiza filial quando selectedIdPerson mudar
    useEffect(() => {
        if (selectedIdPerson !== 1) {
            const res = findFilialOnPerson(persons);
            if (res) {
                setFilial(prev => ({
                    ...prev,
                    fk_person: res.id_person,
                    name_filial: res.name_pers || '',
                    address: `${res.address_pers}, ${res.bairro_pers}, ${res.num_address || ''}`,
                    cnpj: res.cnpj || '',
                    inscric: res.inscricao || '',
                    phone: res.phone_pers || '',
                    created_at: FormatDate(res.created_at) || '',
                    updated_at: res.updated_at ? FormatDate(res.updated_at) : 'Não Houve Alterações',
                }));
            }
        }
    }, [selectedIdPerson, persons]);

    //     if (selectedIdPerson !== 1) {
    //     filial.fk_person = parseInt(selectedIdPerson);
    //     const res = findFilialOnPerson(persons)
    //     filial.name_filial = res?.name_pers || ''
    //     filial.address = res?.address_pers + ', ' +
    //     res?.bairro_pers + ', ' + res?.num_address || ''
    //     filial.cnpj = res?.cnpj || ''
    //     filial.inscric = res?.inscricao || ''
    //     filial.phone = res?.phone_pers || ''
    //     filial.created_at = FormatDate( res?.created_at) || ''
    //     res?.updated_at ?
    //     filial.updated_at = FormatDate( res?.updated_at) :
    //     filial.updated_at = 'Não Houve Alterações'
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilial(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        getList('filiais', setFiliais);
    }, [filiais]);

    useEffect(() => {
        postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged);
    }, [persons]);

    const updateFilial = (filial: TFilial) => {
       FormatDate(filial.created_at)
        FormatDate(filial.updated_at)
        setFilial(filial);
        setMsg('');
    };

    const findNamePerson = (filial: TFilial) => {
        const person = persons.find(p => p.id_person === filial.fk_person);
        return person ? person.name_pers : '';
    };

    const handleFilialRegister = async () => {
        try {
            const response = await api.post('/filial', filial);
            setMsg("Inserido com Sucesso");
        } catch (error) {
            setMsg("Erro ao inserir filial");
        }
    };

    const handleFilialUpdate = async () => {
        try {
            const response = await api.put('/filial', filial);
            setMsg("Atualizado com sucesso");
        } catch (error) {
            setMsg("Erro ao atualizar filial");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (filial.name_filial !== "") {
            filial.id_filial === 0
                ? handleFilialRegister()
                : handleFilialUpdate();
        } else {
            setMsg("Informe o nome da Filial");
        }
    };

    return (
        <>
            {handleTokenMessage('filial', tokenMessage)}
            <FilialForm
                filial={filial}
                filiais={filiais}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                msg={msg}
                updateFilial={updateFilial}
                setFilial={setFilial}
                listPerson={
                    <select onChange={e => setSelectedIdPerson(Number(e.target.value))}>
                        {persons.map((person: TPerson) => (
                            <option key={person.id_person} value={person.id_person}>
                                {person.name_pers}
                            </option>
                        ))}
                    </select>
                }
                selectedIdPerson={filial.fk_person}
                findNamePerson={findNamePerson}
            />
        </>
    );
};


export { Filial }

