import { useState, useEffect, useContext } from "react";
import { ContactList } from "../../components/contacts/ContactList"
import { BackHome } from "../../components/utils/backHome/BackHome"
import { AuthContext } from '../../context/auth'
import { TContact } from "./Contacts"
import { getList } from "../../services/handleService";

export function ContactsList() {

    const { user: isLogged }: any = useContext(AuthContext);
    const [contacts_, setContacts_] = useState<TContact[]>([])
    const [contacts, setContacts] = useState<TContact[]>([])
    const [notAuthorized, setNotAuthorized] = useState<string>('')

    const isLoggedParams: number = isLogged[0].id

    useEffect(() => {
        getList(`/contacts/${isLoggedParams}`, setContacts_)
        if (contacts_ !== null) {
            setContacts(contacts_)
        } else {
            setNotAuthorized("Acesso não permitido !")
        }
    }, [contacts_, isLoggedParams])

    return (
        <>
            <BackHome />
            <p>{notAuthorized}</p>
            {contacts.length === 0 ? <p>Carregando...</p> : (
                contacts.map((contact: TContact) => (
                    <ContactList
                        key={contact.id}
                        id={contact.id}
                        created_at={contact.created_at}
                        name={contact.name}
                        email={contact.email}
                        phone={contact.phone}
                        comments={contact.comments}
                    />
                )))}
        </>
    )
}