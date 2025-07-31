import { useState, useContext } from 'react'
import LoginComponent from '../../components/users/LoginComponent'
import { TUserLogin } from './type/TLogin';
import { crypt } from '../../components/utils/crypt/Crypt';
import { AuthContext } from '../../context/auth'
import api from '../../services/api/api';

export function Login() {

  const { login, message }: any = useContext(AuthContext);

  const [msg, setMsg] = useState('')
  const [user, setUser] = useState<TUserLogin>({
    id: 0,
    name: "",
    username: "",
    password: "",
    repeatPass: "",
    role: "ADMIN",
    hash: ''
  })

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser(values => ({ ...values, [name]: value }))
  }

  function valFields(user: TUserLogin) {
    let msg = "Digite"
    if (user.username === "") { msg += " um email válido !" };
    if (user.password === "") { msg += " uma senha válida !" };
    if (msg !== "Digite") {
      setMsg(msg);
      return false;
    };
    return true;
  };

  setTimeout(() => {
    setMsg('')
  }, 9000);

  const handleLogin = async () => {
    if (valFields(user)) {
      await login(user.username, user.password)
    }
  }
  const handleLoginRegister = async () => {
    await api.post('/user', user)
      .then(response => {
        const res: any = response.data
        setMsg(res[0].msg)
      }).catch(error => setMsg(error))
  }

  const handleLoginUpdate = async () => {
    await api.put('/user_update', user)
      .then(response => {
        const res: any = response.data
        setMsg(res[0].msg)
        user.password = ''
      }).catch(error => setMsg(error))
  }

  const handleLoginRecover = async () => {
    await api.post('/user_recover_pass', user)
      .then(response => {
        const res: any = response.data
        setMsg(res[0].msg)
        if (!res[0].msg)
          setMsg("Acesse sua caixa de e-mail para recuperar a senha.")
      }).catch(error => console.log(error))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.username && user.password !== "" && user.repeatPass === "") {
      handleLogin()
    }
    else if (user.username && user.password && user.repeatPass) {
      if (user.password === user.repeatPass) {
        user.password = crypt(user.password)
        user.id === 0 ? handleLoginRegister() : handleLoginUpdate()
      } else { setMsg("As senhas não confere tente novamente") }
    }
    else if (user.username) {
      const hashData = new Date().getMilliseconds()
      user.hash = "7zx@mnLT" + hashData
      user.password = user.hash
      user.password = crypt(user.password)
      handleLoginRecover()
    }
  }
  return <>
    <LoginComponent
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      msg={String(message) || msg}
      setUser={setUser}
    >
      {user}
    </LoginComponent>
  </>
}