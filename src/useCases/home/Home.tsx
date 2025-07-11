import { useState } from "react";
import { HomeNav } from "../../components/home/HomeNav"
import { HomeMain } from "../../components/home/HomeMain"
import { HomeFooter } from "../../components/home/HomeFooter"
import { postRegister } from "../../services/handleService";

interface TContact {
    created_at?: Date | any;
    id?: number;
    name: string;
    email: string;
    phone?: string;
    comments: string
}

export function Home() {

    const [contacts, setContacts] = useState<TContact>({
        name: "",
        email: "",
        phone: "",
        comments: "Solicitação de contato"
    });

    const [msg, setMsg] = useState<string>('');
    const [msgFileds, setMsgFields] = useState<string>('');

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setContacts(values => ({ ...values, [name]: value }))
    };

    setTimeout(()=>{
        setMsg('')
        setMsgFields('')
    },3000)

    function contactValFields(contact: TContact) {
        let msg = ""
        msg += 'Por favor digite seu '
        if (contact.name === "") { msg += "nome completo,\n" };
        if (contact.email === "") { msg += "email,\n" };
        if (contact.phone === "") { msg += "telefone\n" };
        if (msg !== "") {
             setMsgFields(msg)
            return false;
        };
        return true;
    };

    function contactClearFields() {
        contacts.name = ""
        contacts.email = ""
        contacts.phone = ""
        contacts.comments = ""
    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        if (contactValFields(contacts)) {
            postRegister(contacts, "contact")
            contactClearFields();
        }
    };

    return (
        <>
            <HomeNav />
            <HomeMain
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                msg={msg}
                msgFields={msgFileds}
                >
                {contacts}
            </HomeMain>
            <HomeFooter></HomeFooter>
        </>
    )
};