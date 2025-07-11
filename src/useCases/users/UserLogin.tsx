import { useState, useContext } from 'react'
import { UserFormLogin } from '../../components/users/UserFormLogin'
import { AuthContext } from '../../context/auth'

export type TUserLogin = {
  username: string;
  password: string;
}

export function UserLogin() {

  const { login, message }: any  = useContext(AuthContext);
  const [alert, setAlert] = useState<string>('')
  const [user, setUsers] = useState<TUserLogin>(
    {
      username: "",
      password: ""
    })

  const handleChange = (e:any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUsers(values => ({ ...values, [name]: value }))
  }

  function valFields(user: TUserLogin) {
    let msg = "Digite"
    if (user.username === "") { msg += " um email válido !" };
    if (user.password === "") { msg += " uma senha válida !" };
    if (msg !== "Digite") {
      setAlert(msg);
      return false;
    };
    return true;
  };

 async function handleSubmit(e: Event) {
    e.preventDefault();
    if (valFields(user)) {
      await login(user.username, user.password)
    }
    setTimeout(() => {
      setAlert('')
    }, 3000);
  }

  return (
      <UserFormLogin
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        message={String(message)}
        alert={alert}
      >
        {user}
      </UserFormLogin>
  )
}