import { useState } from 'react';
import { crypt } from '../../components/utils/crypt/Crypt'
import { UserFormRecoverPass } from '../../components/users/UserFormRecoverPass';
import api from '../../services/api/api'

type TUserRecoverPass = {
  username: string
  password:string
  hash:string
}

export function UserRecoverPass() {
  const [user, setUsers] = useState<TUserRecoverPass>({
    username: "",
    password:"",
    hash:""
  })

  const hashData = new Date().getMilliseconds()
  user.hash = "7zx@mnLT" + hashData
  user.password = user.hash

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUsers(values => ({ ...values, [name]: value }))
  }

  const [msg, setAlert] = useState<string>("")
  const [message, setMessage] = useState<any>("")

  async function handleUser() {
    await api.post<TUserRecoverPass>('/user_recover_pass', user)
      .then(response => {
        const res:any = response.data
        setMessage(res[0].msg)
        if(!res[0].msg)
        setMessage("Acesse sua caixa de e-mail para recuperar a senha.")
      }).catch(error => console.log(error))
  }

  function UsersValFields(user:any) {
    let msg = ""
    if (user.username === "") { msg += "Digite um email válido !\n" };
    if (user.password === "") { msg += "Digite sua senha !\n" };
    if (msg !== "") {
      setAlert(msg)
      return false;
    };
    return true;
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (UsersValFields(user)) {
      user.password = crypt(user.password)
      handleUser()
      setUsers({
        username: "",
        password: "",
        hash:""
    })
      setMessage("")
    }
    setTimeout(() => {
      setAlert('')
  }, 2000);
  }

  return (
      <UserFormRecoverPass
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        message={message}
        alert={msg}
      >
        {user}
      </UserFormRecoverPass>
  )
}