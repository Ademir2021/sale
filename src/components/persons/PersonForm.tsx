import { useState } from "react";
import InputMask from "react-input-mask";
import { checkAdminPrivilege } from "../utils/checksUserLogged/ChecksUserLogged";

import '../../index'

type Props = {
    children: string | number | readonly string[] | undefined | any
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    handleSubmit: any
    message: string
    alert: string
}

export function PersonForm({
    children,
    handleChange,
    handleSubmit,
    message,
    alert,
}: Props) {

    const [tpPerson, setTpPerson] = useState('Pessoa-Fisica')

    const naturalPerson = <>
        <label>CPF</label>
        <InputMask
         id="main-input"
            type="text"
            name="cpf_pers"
            placeholder="CPF"
            mask="999.999.999-99"
            mask-selectonfocus="true"
            maxLength={14}
            autoComplete="off"
            maskChar={null}
            value={children.cpf_pers || ""}
            onChange={handleChange}
        />
        <label>RG</label>
        <InputMask
         id="main-input"
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
         id="main-input"
            type="text"
            name="fantasia"
            placeholder="Nome fantasia"
            value={children.fantasia || ""}
            onChange={handleChange}
        />
        <label>CNPJ</label>
        <InputMask
         id="main-input"
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
        />
        <label>Inscrição estadual</label>
        <InputMask
         id="main-input"
            type="text"
            name="inscricao"
            placeholder="Inscrição estadual"
            mask=""
            mask-selectonfocus="true"
            maxLength={9}
            autoComplete="off"
            maskChar={null}
            value={children.inscricao || ""}
            onChange={handleChange}
        />
    </>

    const limiteCredito = <>
        <label>Limite crédito</label>
        <InputMask
             id="main-input-number"
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
        <hr/>
        <>1 Cliente | 2 Fornecedor | 3 Transportadora | 4 Geral</>
        <label>Grupo cliente</label>
        <input
         id="main-input-number"
         type="number"
         name="fk_grupo"
         placeholder='Informe número do grupo'
         value={children.fk_grupo || ''}
         onChange={handleChange}
         />
    </>

    return (
        <div id='container'>
            <form id='main'>
                <b className="text-center p-1">Cadastrar Cliente</b>
                <a href='/invoice_sales'>Se você já possui cadastro <b>clique aqui.</b></a>
                <select id='main-input' onChange={(e) => setTpPerson(e.target.value)}>
                    <option>{'Pessoa-Fisica'}</option>
                    <option>{'Pessoa-Juridica'}</option>
                </select>
                <label>Nome</label>
                <input
                id="main-input"
                    type="text"
                    name="name_pers"
                    placeholder='Nome'
                    value={children.name_pers || ""}
                    onChange={handleChange}
                />
                {tpPerson === 'Pessoa-Fisica' ? naturalPerson : legalPerson}
                <label>Telefone</label>
                <InputMask
                 id="main-input"
                    type="text"
                    name="phone_pers"
                    placeholder="Telefone"
                    mask="(99)99999-9999"
                    mask-selectonfocus="true"
                    maxLength={14}
                    autoComplete="off"
                    maskChar={null}
                    value={children.phone_pers || ""}
                    onChange={handleChange}
                />
                <label>Endereço</label>
                <input
                 id="main-input"
                    type="text"
                    name="address_pers"
                    placeholder={'Endereço'}
                    value={children.address_pers || ""}
                    onChange={handleChange}
                />
                <label>Número</label>
                <input
                 id="main-input-number"
                    type="text"
                    name="num_address"
                    placeholder="Número"
                    value={children.num_address || ''}
                    onChange={handleChange}
                />
                <label>Bairro</label>
                <input
                 id="main-input"
                    type="text"
                    name="bairro_pers"
                    placeholder={'Bairro'}
                    value={children.bairro_pers || ""}
                    onChange={handleChange}
                />
                <label><a href="ceps">Consultar</a></label>
                <label>CEP</label>
                <InputMask
                 id="main-input"
                    mask={"99.999-999"}
                    type="text"
                    name="num_cep"
                    value={children.num_cep || ""}
                    placeholder="CEP"
                    onChange={handleChange}
                />
                <input
                 id="main-input"
                    type="hidden"
                    name="fk_name_filial"
                    placeholder='Filial do cliente'
                    disabled
                    value={children.fk_name_filial || ""}
                    onChange={handleChange}
                />
                {checkAdminPrivilege() === "2" && limiteCredito}
                {checkAdminPrivilege() === "2" && grupo}
                {alert && <dd id="msg-red">{alert}</dd>}
                {message && <dd id="msg-red">{message}</dd>}
                <button
                className="btn btn-primary mt-3"
                    onClick={handleSubmit}>
                    Registrar</button>
            </form>
        </div>
    )
}