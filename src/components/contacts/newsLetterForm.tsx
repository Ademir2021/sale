import * as Icon from 'phosphor-react';

import'./css/styles.css'

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
        <div id='form-newsLetter'>
            <span id='ico-email'>
                <Icon.Envelope size={32} />
                <> Informe-se em nossa Newsletter</>
            </span>
        <form >
            <input
                id='input-newsLetter'
                type="email"
                name="email"
                value={children.email || ''}
                placeholder="Registre aqui seu e-mail ..."
                required
                onChange={handleChange}
                />
            <button
                id='button-newsLetter'
                className='btn btn-primary mb-2'
                type="submit"
                onClick={handleSubmit}
                >Enviar</button>
        </form>
                </div>
        </>
    )
}