import { useState, useEffect, useContext } from "react";
import { getList, postAuthHandle } from "../../services/handleService";
import api from "../../services/api/api";
import { FilialForm } from "../../components/filiais/FilialForm";
import { TPerson } from "../persons/type/TPerson";
import { TFilial } from "./type/TFilial";
import { AuthContext } from '../../context/auth'
import { handleTokenMessage } from "../../services/handleEnsureAuth";
import { FormatDate } from "../../components/utils/formatDate";
import { HandleFilial } from "./HandleFilial";

const Filial = () => {

  const handleFilial = new HandleFilial()

  const { user: isLogged }: any = useContext(AuthContext);
  const [tokenMessage, setTokenMessage] = useState("Usuário Autenticado!");
  const [msg, setMsg] = useState('');
  const [persons, setPersons] = useState<TPerson[]>([]);
  const [filiais, setFiliais] = useState<TFilial[]>([]);
  const [selectedIdPerson, setSelectedIdPerson] = useState<number>(1);
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

  // Carrega a lista de filiais apenas uma vez
  useEffect(() => {
    getList('filiais', setFiliais);
  }, [filiais]);

  // Carrega a lista de pessoas uma vez
  useEffect(() => {
    postAuthHandle('persons_user', setTokenMessage, setPersons, isLogged);
  }, [persons]);

  // Atualiza filial automaticamente ao selecionar uma pessoa
  useEffect(() => {
    const person = persons.find(p => p.id_person === selectedIdPerson);
    if (person) {
      setFilial(prev => ({
        ...prev,
        fk_person: person.id_person,
        name_filial: person.name_pers || '',
        address: `${person.address_pers}, ${person.bairro_pers}, ${person.num_address || ''}`,
        cnpj: person.cnpj || '',
        inscric: person.inscricao || '',
        phone: person.phone_pers || '',
        created_at: FormatDate(person.created_at) || '',
        updated_at: person.updated_at ? FormatDate(person.updated_at) : 'Não Houve Alterações',
      }));
    }
  }, [selectedIdPerson, persons]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilial(prev => ({ ...prev, [name]: value }));
  };

  const handleFilialRegister = async () => {
    try {
      const response = await api.post('/filial', filial);
      if (!response.data)
        setMsg("Inserido com Sucesso");
    } catch (error) {
      console.error(error);
      setMsg("Erro ao inserir filial");
    }
  };

  const handleFilialUpdate = async () => {
    try {
      const response = await api.put('/filial', filial);
      if (!response.data)
        setMsg("Atualizado com Sucesso");
    } catch (error) {
      console.error(error);
      setMsg("Erro ao atualizar filial");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filial.name_filial.trim() === "") {
      setMsg("Informe o nome da Filial");
      return;
    }

    if (filial.id_filial === 0) {
      handleFilialRegister();
    } else {
      handleFilialUpdate();
    }

    setFilial(handleFilial.clearFieldFilial(filial))
  };

  const updateFilial = (filial: TFilial) => {
    setFilial(filial);
    setMsg('');
  };

  const findNamePerson = (filial: TFilial) => {
    const person = persons.find(p => p.id_person === filial.fk_person);
    return person?.name_pers || '';
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
          <select
            value={selectedIdPerson}
            onChange={e => setSelectedIdPerson(parseInt(e.target.value))}
          >
            {persons.map((person) => (
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

