import { useState } from "react";
import { postRegister } from "../../services/handleService";
import { HomeForm } from '../../components/home/HomeForm';

interface TContact {
    created_at?: Date | any;
    id?: number;
    name: string;
    email: string;
    phone?: string;
    comments: string | object
}

export function HomeProductHire() {

    const [sendHire, setSendHire] = useState<boolean>(false)
    const [sendMsg, setSendMsg] = useState<String>("")

    const [hire, setHire] = useState({
        fantasia: '',
        rsocial: '',
        cnpj: '',
        iestadual: '',
        phone: '',
        email: '',
        endereco: '',
        numero: '',
        cidade: '',
        uf: '',
        cep: ''
    })

    const [contacts, setContacts] = useState<TContact>({
        name: '',
        email: "",
        phone: "",
        comments: ""
    });

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setHire(values => ({ ...values, [name]: value }))
    };

    function handleSubmit(e: Event) {
        e.preventDefault()
        if (hire)
            contacts.name = JSON.stringify(hire.fantasia)
        contacts.email = JSON.stringify(hire.email)
        contacts.phone = JSON.stringify(hire.phone)
        contacts.comments = JSON.stringify(
            hire.rsocial + ' , '
            + hire.cnpj.replace(/[..-]/g, '') + ' , '
            + hire.iestadual + ' , '
            + hire.endereco + ' , '
            + hire.numero + ' , '
            + hire.cidade + ' , '
            + hire.uf + ' , '
            + hire.cep + ' , '
        );
        if (hire.cnpj !== '') {
            if (sendHire === false) {
                postRegister(contacts, "contact")
                setSendHire(true)
                setSendMsg("Dados enviado com sucesso")
            } else {
                setSendMsg("Dados já foram enviados")
            }
        } else {
            setSendMsg('Informe o CNPJ')
        }
    }

    return (
        <>
            <HomeForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                sendMsg={sendMsg}
            >
                {hire}
            </HomeForm>
        </>
    )
}