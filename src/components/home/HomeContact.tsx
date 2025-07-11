import '../../index'
import './css/styles.css'

export type PropsHomeContact = {
    children: React.ChangeEventHandler<HTMLInputElement> | undefined | any;
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined | any;
    handleSubmit: any
    msg: string
    msgFields: string
}

export function HomeContact({
    children,
    handleChange,
    handleSubmit,
    msg,
    msgFields }: PropsHomeContact) {

    return (
        <form id='form'>
            <b>Inscreva-se</b>
            <input
            id='main-input'
                type='text'
                name='name'
                value={children.name}
                onChange={handleChange}
                placeholder='Seu nome'
                ></input>
            <input
            id='main-input'
                type='email'
                name='email'
                value={children.email}
                onChange={handleChange}
                placeholder='Seu endereço de Email'
                ></input>
            <input
            id='main-input'
                type='text'
                name='phone'
                value={children.phone}
                onChange={handleChange}
                placeholder='Seu Telefone'
                ></input>
            {msgFields && <div id='msg-red'>{msgFields}</div>}
                {msg && <div id='msg-red'>{msg}</div>}
            <button
                className='btn btn-primary'
                id='m-2'
                type="submit"
                onClick={handleSubmit}
            >Enviar</button>
        </form>
    )
}