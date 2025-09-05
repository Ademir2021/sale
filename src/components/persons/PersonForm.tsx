import { useState } from "react";
import InputMask from "react-input-mask";
import { checkAdminPrivilege } from "../utils/checksUserLogged/ChecksUserLogged";
import { TPerson } from "../../useCases/persons/type/TPerson";
import { CloseX } from "../utils/closeX/CloseX";

type Props = {
    children: TPerson
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    handleSubmit: any
    msg: string
}

export const  PersonForm:React.FC<Props> = ({
    children, handleChange,
    handleSubmit, msg
}: Props)=> {

    const [tpPerson, setTpPerson] = useState('Pessoa-Fisica')

    const naturalPerson = <>
        <label>CPF</label>
        <InputMask
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
        />
        <label>Inscrição estadual</label>
        <InputMask
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
        <hr />
        <>1 Cliente | 2 Fornecedor | 3 Transportadora | 4 Geral</>
        <label>Grupo cliente</label>
        <input
            type="number"
            name="fk_grupo"
            placeholder='Informe número do grupo'
            value={children.fk_grupo || ''}
            onChange={handleChange}
        />
    </>

    return (

        <form className="form" onSubmit={handleSubmit}>
            <CloseX/>
            <b>Cadastrar Cliente</b>
            <p><a href='/invoice_sales'>
                Já possui cadastro?
                <b> finalizar</b></a>
            </p>
            <select onChange={(e) => setTpPerson(e.target.value)}>
                <option>{'Pessoa-Fisica'}</option>
                <option>{'Pessoa-Juridica'}</option>
            </select>
            <label>Nome</label>
            <input
                type="text"
                name="name_pers"
                placeholder='Nome'
                value={children.name_pers || ""}
                onChange={handleChange}
            />
            <label>{tpPerson === "Pessoa-Fisica" ? "Data de nascimento" : "Data de abertura"}</label>
            <input
                type="Date"
                name="date_of_birth"
                value={ children.date_of_birth}
                onChange={handleChange}
            />
            {tpPerson === 'Pessoa-Fisica' ? naturalPerson : legalPerson}
            <label>Telefone</label>
            <InputMask
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
                type="text"
                name="address_pers"
                placeholder={'Endereço'}
                value={children.address_pers || ""}
                onChange={handleChange}
            />
            <label>Número</label>
            <input
                type="text"
                name="num_address"
                placeholder="Número"
                value={children.num_address || ''}
                onChange={handleChange}
            />
            <label>Bairro</label>
            <input
                type="text"
                name="bairro_pers"
                placeholder={'Bairro'}
                value={children.bairro_pers || ""}
                onChange={handleChange}
            />
            <label><a href="ceps">Consultar</a></label>
            <label>CEP</label>
            <InputMask
                mask={"99.999-999"}
                type="text"
                name="num_cep"
                value={children.num_cep || ""}
                placeholder="CEP"
                onChange={handleChange}
            />
            <input
                type="hidden"
                name="fk_name_filial"
                placeholder='Filial do cliente'
                disabled
                value={children.fk_name_filial || ""}
                onChange={handleChange}
            />
            {checkAdminPrivilege() === "2" && limiteCredito}
            {checkAdminPrivilege() === "2" && grupo}
            {msg && <dd id="msg-red">{msg}</dd>}
            <button>Inserir Dados</button>
        </form>
    )
}