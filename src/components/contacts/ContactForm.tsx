import { Globais } from '../globais/Globais';
import InputMask from "react-input-mask";

import './css/styles.css'

type Props = {
    children: React.ChangeEventHandler<HTMLInputElement> | undefined | any;
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined | any;
    handleSubmit: any
    msg: string;
}
export function ContactForm({
    children,
    handleChange,
    handleSubmit,
    msg
}: Props) {
    return <>
        <div className="contact-container">
    <form onSubmit={handleSubmit} className="contact-form">
            <label>Fale conosco</label>
        <input
            id="name"
            type="text"
            name="name"
            placeholder="Seu nome"
            required
            value={children.name || ""}
            onChange={handleChange}
            className="contact-input"
        />
        <input
            id="email"
            type="email"
            name="email"
            placeholder="Seu email"
            required
            value={children.email || ""}
            onChange={handleChange}
            className="contact-input"
        />
        <InputMask
            id="phone"
            mask="(99)99999-9999"
            type="text"
            className="contact-input"
            name="phone"
            placeholder="Seu telefone"
            required
            value={children.phone || ""}
            onChange={handleChange}
        />
        <label htmlFor="comments">Digite aqui ...</label>
        <textarea
            id="comments"
            name="comments"
            placeholder="Deixe aqui seus comentários ..."
            required
            value={children.comments || ""}
            onChange={handleChange}
            className="contact-textarea"
        />
        {msg && <div className="contact-msg">{msg}</div>}
        <button
            type="submit"
            className="contact-button"
        >Enviar</button>
    <label>Telefone: {Globais.phone}</label>
    </form>
</div>
    </>
}