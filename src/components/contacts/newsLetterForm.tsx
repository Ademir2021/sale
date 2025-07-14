import * as Icon from 'phosphor-react';

import'./css/newsLetter.css';

type Props = {
    children: React.ChangeEventHandler<HTMLInputElement> | undefined | any;
    handleSubmit: React.FormEventHandler<HTMLButtonElement> | undefined | any
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined | any;
}

export function NewsLetterForm({
    children,
    handleSubmit,
    handleChange }: Props) {

    return (
        <>
       <div className="newsletter-container">
    <span className="newsletter-header">
        <Icon.Envelope size={32} />
        <span className="newsletter-text">Informe-se em nossa Newsletter</span>
    </span>
    <form onSubmit={handleSubmit} className="newsletter-form">
        <input
            type="email"
            name="email"
            value={children.email || ''}
            placeholder="Registre aqui seu e-mail ..."
            required
            onChange={handleChange}
            className="newsletter-input"
        />
        <button
            className="newsletter-button"
            type="submit"
        >
            Enviar
        </button>
    </form>
</div>

        </>
    )
}