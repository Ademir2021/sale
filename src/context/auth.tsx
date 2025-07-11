import { useState, createContext, useEffect } from "react";
import bcrypt from "bcryptjs-react"
import { useNavigate } from "react-router";
import { TUserLogin } from '../useCases/users/UserLogin'
import api from '../services/api/api'

type TAuthProvider = {
    authenticated: boolean
    user: boolean | null
    loading: boolean
    message: string
    login: Object
    logout: () => void
}

export const AuthContext = createContext<TAuthProvider | null>(null);
export const AuthProvider = ({ children }: any | undefined) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [message, setMessage] = useState<string>("")
    const [userLogin] = useState<TUserLogin>({
        username: '',
        password: ''
    })

    useEffect(() => {
        const getRecoverUser = () => {
            const recoverUser = localStorage.getItem('u')
            if (recoverUser)
                setUser(JSON.parse(recoverUser))
            setLoading(false)
        };
        getRecoverUser()
    }, [!user, userLogin]);

    const login = async (email: string, password: string) => {
        userLogin.username = email
        userLogin.password = password

        function compare(pass: string, username: string) {
            if (bcrypt.compareSync(password, pass) === true && email === username) {
                setUser(true)
                setMessage("Aguarde em breve você será logado ...");
                const res_uri = localStorage.getItem('uri')?.replace(/"/g, "")
                if (res_uri !== undefined) {
                    setTimeout(() => {
                        navigate(res_uri)
                    }, 1000);
                }
            }
        }

        try {
            await api.post('auth', userLogin)
                .then(response => {
                    const resToken: string = response.data.token
                    const user_id: string = response.data.refreshToken.user_id
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${resToken}`
                    }
                    const thisUserExists = { "username": userLogin.username, "password": "" }
                    api.post('login', thisUserExists, { headers })
                        .then(response => {
                            const res = response.data
                            if (res !== null) {
                                compare(res[0].password, res[0].username);
                                localStorage.setItem("u", JSON.stringify(res));
                                localStorage.setItem("xxx", JSON.stringify(password));
                                localStorage.setItem("user_id", JSON.stringify(user_id))
                                localStorage.setItem("token", JSON.stringify(resToken));
                            }
                        })
                })
        } catch (err) {
            console.log("error occurred !!: " + err);
            setMessage("Nome de Usuário ou senha inválido(a)");
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    const logout = () => {
        localStorage.removeItem('u');
        localStorage.removeItem('token');
        localStorage.removeItem('user_id')
        localStorage.removeItem('xxx')
        setUser(null)
        localStorage.setItem("uri", JSON.stringify("dashboardefault"));
        navigate("/store")
    }

    return (
        <AuthContext.Provider
            value={{ authenticated: !!user, user, loading, message, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}