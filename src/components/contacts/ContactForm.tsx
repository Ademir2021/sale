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
        <div className="contact-header">
            <h1>Fale conosco</h1>
            {/* <dd><b>Telefone:</b> {Globais.phone}</dd> */}
            {/* <p className="contact-subtitle">Suporte, Garantia, Frete, Dúvidas?</p> */}
        </div>
        {/* <label htmlFor="name">Nome</label> */}
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
        {/* <label htmlFor="email">Email</label> */}
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
        {/* <label htmlFor="phone">Telefone</label> */}
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
    </form>
</div>

        
    </>
}