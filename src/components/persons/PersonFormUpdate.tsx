import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { checkAdminPrivilege } from "../utils/checksUserLogged/ChecksUserLogged";
import { TPerson } from "../../useCases/persons/type/TPerson";


type Props = {
    children: TPerson
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    handleSubmit: any
    handleUpdate: any
    handleNewPerson: any
    modalRef?: any
    className?: string
    close?: any
    msg: string
    flagRegister: boolean
}

export function PersonFormUpdate({
    handleChange,
    handleSubmit,
    children,
    handleUpdate,
    handleNewPerson,
    modalRef,
    className,
    close,
    msg,
    flagRegister,
}: Props) {

    const [tpPerson, setTpPerson] = useState('Pessoa-Fisica')

    useEffect(() => {
        if (children.cpf_pers !== "0") {
            setTpPerson('Pessoa-Fisica')
        }
        else if (children.cnpj !== "0") {
            setTpPerson('Pessoa-Juridica')
        }
    }, [close])

    const naturalPerson = <>
        <label>CPF</label>
        <InputMask
            type="text"
            name="cpf_pers"
            placeholder="Seu CPF"
            mask="999.999.999-99"
            mask-selectonfocus="true"
            maxLength={14}
            autoComplete="off"
            maskChar={null}
            value={children.cpf_pers || ""}
            onChange={handleChange}
        // disabled
        />
        <label>RG</label>
        <InputMask
            type="text"
            name="rg"
            placeholder="Seu RG"
            mask="999.999.999-9"
            mask-selectonfocus="true"
            maxLength={14}
            autoComplete="off"
            maskChar={null}
            value={children.rg || ""}
            onChange={handleChange}
        />
    </>

    const legalPerson = <>
        <label>Nome Fantasia</label>
        <input
            type="text"
            name="fantasia"
            placeholder="Nome fantasia"
            value={children.fantasia || ""}
            onChange={handleChange}
        />
        <label>CNPJ</label>
        <InputMask
            type="text"
            name="cnpj"
            placeholder="CNPJ da empresa"
            mask="99.999.999/9999-99"
            mask-selectonfocus="true"
            maxLength={18}
            autoComplete="off"
            maskChar={null}
            value={children.cnpj || ""}
            onChange={handleChange}
        // disabled
        />
        <label>Inscr. estadual</label>
        <InputMask
            type="text"
            name="inscricao"
            placeholder="Inscrição estadual"
            mask=""
            mask-selectonfocus="true"
            maxLength={11}
            autoComplete="off"
            maskChar={null}
            value={children.inscricao || ""}
            onChange={handleChange}
        />
    </>

    const limiteCredito = <>
        <label>Limite crédito</label>
        <InputMask
            type="number"
            name="limit_cred"
            placeholder='Informe o limite para crédito'
            mask=""
            max-selectfucus='true'
            maxLength={9}
            autoComplete="off"
            maskChar={null}
            value={children.limit_cred || ""}
            onChange={handleChange}
        />
    </>

    const grupo = <>
        <dd>{"1-Cliente 2-Fornecedor 3-Transportadora 4-Geral"}</dd>
        <label>Grupo cliente</label>
        <input
            type="number"
            min={1}
            max={4}
            name="fk_grupo"
            placeholder='Informe número do grupo'
            value={children.fk_grupo || ''}
            onChange={handleChange}

        />
    </>
    return <>
        <div ref={modalRef} className={`${className} modal`}>
            <form className="form">
                <b>{children.cnpj != "0" || children.cpf_pers != "0" ?
                    "Atualizar Cliente" : "Novo Cliente"}</b>
                <select onChange={(e) => setTpPerson(e.target.value)}>
                    <option>{'Pessoa-Fisica'}</option>
                    <option>{'Pessoa-Juridica'}</option>
                </select>
                <input
                    type="hidden"
                    name="id_person"
                    value={children.id_person || ""}
                    placeholder="ID do cliente"
                    disabled
                    onChange={handleChange}
                />
                <label>Nome</label>
                <input
                    type="text"
                    name="name_pers"
                    value={children.name_pers || ""}
                    placeholder="Seu nome"
                    onChange={handleChange}
                />
                <label>{tpPerson === 'Pessoa-Fisica' ? "Data de nascimento" : "Data de abertura"}</label>
                <input
                    type="Date"
                    name="date_of_birth"
                    value={children.date_of_birth}
                    onChange={handleChange}
                />
                {tpPerson === 'Pessoa-Fisica' ? naturalPerson : legalPerson}
                <label>Telefone</label>
                <InputMask
                    type="text"
                    name="phone_pers"
                    placeholder="Seu telefone"
                    mask="(99)99999-9999"
                    mask-selectonfocus="true"
                    maxLength={14}
                    autoComplete="off"
                    maskChar={null}
                    value={children.phone_pers || ''}
                    onChange={handleChange}
                />
                <label>Endereço</label>
                <input
                    type="text"
                    name="address_pers"
                    value={children.address_pers || ''}
                    placeholder="Seu endereço"
                    onChange={handleChange}
                />
                <label>Número</label>
                <input
                    type="text"
                    name="num_address"
                    value={children.num_address || ''}
                    placeholder="Número do endereço"
                    onChange={handleChange}
                />
                <label>Bairro</label>
                <input
                    type="text"
                    name="bairro_pers"
                    value={children.bairro_pers || ''}
                    placeholder="Seu bairro"
                    onChange={handleChange}
                />
                <label>CEP</label>
                <InputMask
                    mask={"99.999-999"}
                    type="text"
                    name="num_cep"
                    value={children.num_cep || ''}
                    placeholder="CEP de sua cidade"
                    onChange={handleChange}
                />
                <label>Cidade</label>
                <input
                    type="text"
                    name="name_city"
                    value={children.name_city || ''}
                    placeholder="Cidade"
                    disabled
                    onChange={handleChange}
                />
                <label>Estado</label>
                <input
                    type="text"
                    name="uf"
                    value={children.uf || ''}
                    placeholder="Estado"
                    disabled
                    onChange={handleChange}
                />
                <input
                    type="hidden"
                    name="fk_name_filial"
                    value={children.fk_name_filial || ''}
                    placeholder="Filial do cliente"
                    disabled
                    onChange={handleChange}
                />
                <input
                    type="hidden"
                    name="fk_id_user"
                    value={children.fk_id_user || ''}
                    placeholder="Usuário do cliente"
                    disabled
                    onChange={handleChange}
                />
                {checkAdminPrivilege() === "2" ? limiteCredito : null}
                {checkAdminPrivilege() === "2" ? grupo : null}
                {msg && <div id='msg-red'>{msg}</div>}
                {!flagRegister && <button id='m-2' onClick={handleUpdate} >Atualizar Dados</button>}
                {!flagRegister && <button id='m-2' onClick={handleNewPerson}>Novo Cadastro</button>}
                {flagRegister && <button id='m-2' onClick={handleSubmit}>Inserir Dados</button>}
                {<button id='m-2' onClick={close}>Sair</button>}
            </form>
        </div>
    </>
}