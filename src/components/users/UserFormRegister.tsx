import { LogoIn } from "../utils/logoIn/LogoIn";
import { UserHome } from "./UserHome";

import './css/styles.css'

type PropsUserFormRegister = {
    children: string | number | readonly string[] | undefined | any;
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    handleSubmit: any
    message: string;
    alert: string;
}

export function UserFormRegister({
    children,
    handleChange,
    handleSubmit,
    message,
    alert
}: PropsUserFormRegister) {

    return (
        <div className='container-user-login' >
            <fieldset className='main-user'>
                <form className='main-user-login'>
                    <LogoIn />
                    <div className='text-register'>Cadastre-se para
                        poder realizar suas compras e poder ter acessos privilegiados.</div>
                    <div className="text-title">Crie sua conta</div>
                    <div className='text-label'>Nome</div>
                    <input
                        type="text"
                        name="name"
                        placeholder='Usuário'
                        value={children.name || ""}
                        onChange={handleChange}
                    />
                    <div className='text-label'>Email</div>
                    < input
                        type="email"
                        name="username"
                        placeholder='Email'
                        value={children.username || ""}
                        onChange={handleChange}
                    />
                    <div className='text-label'>Senha</div>
                    <input
                        type="password"
                        name="password"
                        placeholder='Senha'
                        value={children.password || ""}
                        onChange={handleChange}
                    />
                    <div className='psw-repeat'>Confirmar senha</div>
                    <input
                        type="password"
                        name="psw_repeat"
                        placeholder='Repita senha'
                        value={children.psw_repeat || ""}
                        onChange={handleChange}
                    />
                    {alert && <label>{alert}</label>}
                    {message && <label>{message}</label>}
                    <button onClick={handleSubmit}>Registrar</button>
                    <a href='/login'>{'Logar_se'}</a>
                    <UserHome />
                </form>
            </fieldset>
        </div>
    )
}