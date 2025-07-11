import { useState } from "react";
import { NewsLetterForm } from "../../components/contacts/newsLetterForm";
import { postRegister } from "../../services/handleService";
import {TContact} from "./Contacts"
export function NewsLetter() {

    const [contacts, setContacts] = useState<TContact>({
        name: "",
        email: "",
        phone: "null",
        comments: "news Letter"
    });

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setContacts(values => ({ ...values, [name]: value }))
    };

    function handleSubmit(e: Event) {
        e.preventDefault();
        if(contacts.email !== ""){
        contacts.name = contacts.email;
        postRegister(contacts, "contact")
        contacts.email = ""
        }
    }

    return (
        <NewsLetterForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        >
            {contacts}
        </NewsLetterForm>
    )
}