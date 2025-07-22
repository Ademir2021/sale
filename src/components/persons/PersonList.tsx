import ListComponent from "../listComponent/ListComponent"

export type Props = {
    id_person: number
    created_at: Date | any
    updated_at: Date | any
    name: string
    date_of_birth: Date | "2000-01-01" | any
    age: number
    cpf: string
    rg: string
    cnpj: string
    inscricao: string
    phone: string
    address: string
    num_address: string | undefined;
    bairro: string
    num_cep: string | undefined
    name_city: string | undefined
    uf: string | undefined
    filial: number
    id_user: number
    fk_grupo: number
    update: any
    dropdown: string
}

export const PersonList = (props: Props) => {
    const list = <ListComponent
        list={<><div className="person-card">
            <div><b>ID:</b> {props.id_person}</div>
            <div><b>Cadastro:</b> {props.created_at}</div>
            <div><b>Alterado:</b> {props.updated_at}</div>
            <div><b>Nome:</b> {props.name}</div>
            <div><b>{props.cpf !== "0" ?
            "Data de nascimento" :
            "Data de abertura"} :</b> {props.date_of_birth}</div>
            {props.age && <div><b>Idade:</b> {props.age}</div>}
            {props.cpf !== '0' && props.cpf !== '' && (
                <div><b>CPF:</b> {props.cpf}</div>
            )}
            {props.rg !== '0' && props.rg !== '' && (
                <div><b>RG:</b> {props.rg}</div>
            )}
            {props.cnpj !== '0' && props.cnpj !== '' && (
                <div><b>CNPJ:</b> {props.cnpj}</div>
            )}
            {props.inscricao !== '0' && props.inscricao !== '' && (
                <div><b>I.EST:</b> {props.inscricao}</div>
            )}
            <div><b>Telefone:</b> {props.phone}</div>
            <div><b>Endereço:</b> {props.address}</div>
            <div><b>Número:</b> {props.num_address}</div>
            <div><b>Bairro:</b> {props.bairro}</div>
            <div><b>CEP:</b> {props.num_cep}</div>
            <div><b>Cidade:</b> {props.name_city}</div>
            <div><b>Estado:</b> {props.uf}</div>
            <div><b>Filial:</b> {props.filial}</div>
            <div><b>Usuário:</b> {props.id_user}</div>
            <div><b>Grupo:</b> {props.fk_grupo}</div>
        </div></>}
        update={props.update && <>{props.update}</>}
    />
    return <>
        {!props.dropdown && list}
    </>
}