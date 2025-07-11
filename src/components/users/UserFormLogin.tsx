import { LogoIn } from '../utils/logoIn/LogoIn';
import { UserHome } from './UserHome';

import './css/styles.css'

type PropsUserFormLogin = {
    children: string | number | readonly string[] | undefined | any;
    handleChange: any
    handleSubmit: any
    message: string;
    alert: string;
}

export function UserFormLogin({
    children,
    handleChange,
    handleSubmit,
    message,
    alert
}: PropsUserFormLogin) {
    return (
        <div className='container-user-login'>
            <fieldset className='main-user'>
                <form className='main-user-login'>
                    <LogoIn />
                    <h1 className='text-welcome'>Seja bem vindo{'(a)'} de volta</h1>
                    <div className='text-title'>Entrar na minha conta</div>

                    <div className='text-label'>Email</div>
                    <input
                        type="email"
                        name="username"
                        placeholder='Email'
                        value={children.username || ""}
                        onChange={handleChange}
                    />
                    <div className='text-label' id='text-label-email'>Senha</div>
                    <input
                        type="password"
                        name="password"
                        placeholder='Senha'
                        value={children.password || ""}
                        onChange={handleChange}
                    />
                    <div><a id='text-recover' href='/user_recover_pass'>Esqueceu a senha?</a></div>
                    {alert && <label>{alert}</label>}
                    {message && <label>{message}</label>}
                    <button onClick={handleSubmit} >Entrar</button>
                    <a href='/register'>{'Não tem Login'}</a>
                    <UserHome />
                </form>
            </fieldset>
        </div>
    )
}