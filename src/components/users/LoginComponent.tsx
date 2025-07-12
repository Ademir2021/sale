import { useState } from "react"
import { TUserLogin } from "../../useCases/users/type/TLogin"

import "./css/styles.css"
import { UserHome } from "./UserHome"

type Props = {
    children: TUserLogin
    handleSubmit: any
    handleChange: any
    msg: string
    setUser: Function
}

const LoginComponent: React.FC<Props> = ({
    children,
    handleChange,
    handleSubmit,
    msg,
    setUser
}: Props) => {

    const [loginRegister, setLoginRegister] = useState(false);
    const [loginRecover, setLoginRecover] = useState(false);
    const clearFieldsLogin = () => {
        setUser({
      name: "Usuário da Loja",
      username: "",
      password: "",
      repeatPass: "",
      role: "ADMIN",
      hash:""
    })
    }
    const getLoginRegister = (login: boolean) => {
        setLoginRegister(login)
        clearFieldsLogin()
    }
    const getLoginRecover = (login: boolean) => {
        setLoginRecover(login)
        clearFieldsLogin()
    }

    return <>
        <div className="login-wrapper">
            <div className="login-container">
                <span><UserHome /></span>
                <h2>{loginRegister ? "Seja bem vindo(a)" : "Seja bem vindo(a) de volta"}</h2>
                {!loginRecover ? <p>{loginRegister ? "Registrar a minha conta" : "Entrar na minha conta"}</p> : <p>Digite um Email válido!</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="username"
                        value={children.username || ''}
                        required
                        onChange={handleChange}
                    />
                    {!loginRecover && <> <input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        value={children.password || ''}
                        required
                        onChange={handleChange}
                    />
                        {loginRegister && <> <input
                            type="password"
                            placeholder="Confirme a senha"
                            name="repeatPass"
                            value={children.repeatPass || ''}
                            required
                            onChange={handleChange}
                        />
                            <input
                                hidden
                                type="text"
                                placeholder="Privilegio"
                                name="roles"
                                value={children.role || ''}
                                required
                                onChange={handleChange}
                            /></>} </>}
                    {msg && <p className="msg-red" >{msg}</p>}

                    {!loginRecover ? <a className="text-right" href="##"
                        onClick={() => { getLoginRecover(true) }}>
                        Esqueceu a senha?</a> :
                        <a className="text-right" href="##"
                            onClick={() => { getLoginRecover(false) }}>
                            Recuperar mais tarde? Sair.</a>}

                    <button type="submit">{!loginRecover ? <>{loginRegister === false ? "Entrar" :
                            "Registrar"}</> : "Recuperar sua senha"}</button>

                    {!loginRecover && <>{!loginRegister && <a className="text-center" href="##"
                        onClick={() => { getLoginRegister(true) }}>
                        Não tem Conta? Clique aqui</a>}
                        {loginRegister && <a className="text-center" href="##"
                            onClick={() => { getLoginRegister(false) }}>
                            Já possui Conta? Clique aqui</a>
                        }</>}
                </form>
            </div>
        </div>
    </>
}

export default LoginComponent;