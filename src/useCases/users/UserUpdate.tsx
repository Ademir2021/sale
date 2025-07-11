import { useState, useRef, useContext } from 'react';
import { UserFormUpdate } from "../../components/users/UserFormUpdate";
import { crypt } from '../../components/utils/crypt/Crypt'
import { AuthContext } from '../../context/auth'
import { ButtonOnClick } from '../../components/utils/btnOnClick/BtnOnClick';
import api from '../../services/api/api'

import '../../App.css'
import { Dashboard } from '../dashboard/Dashboard';
import { postAuthHandle } from '../../services/handleService';
import { handleTokenMessage } from '../../services/handleEnsureAuth';

type TUpdateUser = {
    id: number;
    created_at?: Date | any;
    name: string;
    username: string;
    password: string;
    psw_repeat: string;
}

export function UserUpdate() {

    const [msg, setAlert] = useState<string>("")
    const [message, setMessage] = useState<any>("")
    const [dropdown, setDropdown] = useState<string>("");
    const { user: isLogged }: any = useContext(AuthContext);
    const isLoggedParams: number = isLogged[0].id
    const modalRef = useRef<any>(null);
    const [users, setUsers] = useState<TUpdateUser[]>([])
    const [user, setUser] = useState<TUpdateUser>({
        id: 0, name: "", username: "", password: "", psw_repeat: ""
    })
    const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(values => ({ ...values, [name]: value }))
    }

    async function registerUser(): Promise<void> {
        await api.post<TUpdateUser[]>('/user', user)
            .then(response => {
                const res: any = response.data
                setMessage(res[0].msg)
            }).catch(error => console.log(error))
    }

    async function updateUser() {
        await api.put<TUpdateUser>('user_update', user)
            .then(response => {
                const res: any = response.data
                alert(JSON.stringify(res[0].msg))
                setAlert(res[0].msg)
            })
            .catch(error => alert(error))
    }
    async function getUsers() {
        postAuthHandle('users_list', setTokenMessage, setUsers, isLogged)
        for (let i = 0; users.length > i; i++) {
            if (users[i].id === isLoggedParams) {
                user.id = users[i].id
                user.name = users[i].name
                user.username = users[i].username
                setUsers(users)
            }
        }
    };

    function UsersValFields(user: any) {
        let msg = "Digite "
        if (user.name === "") { msg += "o seu nome completo!\n" };
        if (user.username === "") { msg += "um email válido!\n" };
        if (user.password === "") { msg += "sua senha!\n" };
        if (user.psw_repeat !== user.password) { msg += "Senha digitada está errada !\n" };
        if (msg !== "Digite ") {
            setAlert(msg)
            return false;
        };
        return true;
    };

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (UsersValFields(user)) {
            user.password = crypt(user.password)
            registerUser()
        } else {
            setMessage("Digite um novo usuário")
            setTimeout(() => {
                setMessage('')
                setAlert('')
            }, 2000);
        }
    }

    async function handleUpdate(e: Event) {
        e.preventDefault();
        if (UsersValFields(user)) {
            user.password = crypt(user.password)
            updateUser()
            user.password = ''
            user.psw_repeat = ''
        }
        setTimeout(() => {
            setAlert('')
        }, 2000);
    }

    async function handleDelete(e: Event) {
        e.preventDefault();
        setUser({
            id: 0, name: "", username: "",
            password: "", psw_repeat: ""
        })
        setAlert("Digite um novo usuário !")
        setTimeout(() => {
            setAlert('')
        }, 2000);
    }

    function toggleDropdown(): void {
        getUsers()
        setDropdown("modal-show");
    }

    function closeDropdown(e: Event) {
        e.stopPropagation();
        const contain = modalRef.current.contains(e.target);
        if (contain) {
            setDropdown("");
            document.body.removeEventListener("click", closeDropdown);
        }
    }

    return (
        <>
            <Dashboard />
            {handleTokenMessage('user_update', tokenMessage)}
            <ButtonOnClick
                onClickHandle={toggleDropdown}
                text={"Sua conta - Criar/Atualizar/Alterar senha."} />
            <UserFormUpdate
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleChange={handleChange}
                close={closeDropdown}
                className={dropdown}
                modalRef={modalRef}
                message={message}
                alert={msg}
            >
                {user}
            </UserFormUpdate>
        </>
    )
}
