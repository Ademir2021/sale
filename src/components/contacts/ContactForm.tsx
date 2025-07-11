import { Globais } from '../globais/Globais';
import InputMask from "react-input-mask";

import '../../index'

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
    return (
        <>
            <hr></hr>
            <div id='container'>
                <form id='main'>
                    <div id="text-center">
                        <h1>Fale conosco</h1>
                        <dd><b>Telefone</b> {Globais.phone}</dd>
                        <>Suporte, Garantia, Frete, Dúvidas ?</>
                    </div>
                    <label>Nome</label>
                    <input
                    id='main-input'
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Seu nome"
                        required
                        value={children.name || ""}
                        onChange={handleChange}
                    />
                    <label>Email </label>
                    <input
                    id='main-input'
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Seu email"
                        required
                        value={children.email || ""}
                        onChange={handleChange}
                    />
                    <label>Telefone</label>
                    <InputMask
                    id='main-input'
                        mask="(99)99999-9999"
                        type="text"
                        className="form-control"
                        name="phone"
                        placeholder="Seu telefone"
                        required
                        value={children.phone || ""}
                        onChange={handleChange}
                    />
                    <div className="mb-3">
                        <label>Digite aqui ...</label>
                        <textarea
                        id='text-area'
                            name="comments"
                            placeholder="Deixe aqui seus comentários ..."
                            required
                            value={children.comments || ""}
                            onChange={handleChange}
                            />
                    </div>
                    {msg && <div id='msg-red'>{msg}</div>}
                    <button
                    id='m-2'
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-primary"
                    >Enviar</button>
                </form>
            </div>
        </>
    )
}