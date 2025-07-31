import { useContext, useEffect, useState } from "react"
import { TUserLogin } from "../../useCases/users/type/TLogin"

import { AuthContext } from "../../context/auth"

import "./css/styles.css"

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

    const { user }: any = useContext(AuthContext);

    const clearFieldsLogin = () => {
        if (Array.isArray(user) && user.length > 0) {
            setLoginRegister(true)
            setUser({
                id: user[0].id,
                name: user[0].name,
                username: user[0].username || "",
                password: "",
                repeatPass: "",
                role: "ADMIN",
                hash: ""
            });
        } else {
            setUser({
                id: 0,
                name: "",
                username: "",
                password: "",
                repeatPass: "",
                role: "ADMIN",
                hash: ""
            });
        }
    };

    const getLoginRegister = (login: boolean) => {
        setLoginRegister(login)
        clearFieldsLogin()
    }
    const getLoginRecover = (login: boolean) => {
        setLoginRecover(login)
        clearFieldsLogin()
    }

    useEffect(() => {
        clearFieldsLogin()
    }, [user])

    return <>
        <div className="login-wrapper">
            <div className="login-container">
                <a href="/">Home</a>
                <h2>{loginRegister ? "Seja bem vindo(a)" : "Bem vindo(a) de volta"}</h2>
                {children.id === 0 ? <>{!loginRecover ? <p>{loginRegister ? "Registrar a minha conta" :
                    "Entrar na minha conta"}</p> : <p>Digite um Email válido!</p>}</> : <p>Atualizar Conta</p>}
                <form onSubmit={handleSubmit}>
                    {loginRegister && <input
                        type="text"
                        placeholder="Nome do Usuário"
                        name="name"
                        value={children.name || ''}
                        required
                        onChange={handleChange}
                    />}
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
                    {msg && <p id="msg-red">{msg}</p>}

                    {children.id === 0 && <>{!loginRecover ? <a className="text-right" href="##"
                        onClick={() => { getLoginRecover(true) }}>
                        Esqueceu a senha?</a> :
                        <a className="text-right" href="##"
                            onClick={() => { getLoginRecover(false) }}>
                            Recuperar mais tarde? Sair.</a>}

                        <button type="submit">{!loginRecover ? <>{loginRegister === false ? "Entrar" :
                            "Registrar"}</> : "Recuperar sua senha"}</button>

                        {!loginRegister && <a className="text-center" href="##"
                            onClick={() => { getLoginRegister(true) }}>
                            Não tem Conta? Clique aqui</a>}
                        {loginRegister && <a className="text-center" href="##"
                            onClick={() => { getLoginRegister(false) }}>
                            Já possui Conta? Clique aqui</a>
                        }</>
                    }
                    {children.id !== 0 && <button>Atualizar Conta</button>}
                </form>
            </div>
        </div>
    </>
}

export default LoginComponent;