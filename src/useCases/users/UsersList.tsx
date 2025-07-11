import { useState, useEffect, useContext } from "react"
import { ListUSers, PropsUsers } from "../../components/users/UserList"
import { FormatDate } from "../../components/utils/formatDate";
import { Dashboard } from "../dashboard/Dashboard";
import { AuthContext } from '../../context/auth'
import { postAuthHandle } from "../../services/handleService";
import { handleTokenMessage } from "../../services/handleEnsureAuth";

export function UsersList() {
  
  const { user: isLogged }: any = useContext(AuthContext);
  const [users, setUsers] = useState<PropsUsers[]>([])
  const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

  useEffect(() => {
    postAuthHandle('users_list',setTokenMessage,setUsers,isLogged)
  }, [users, ]);

  return (
    <>
     <Dashboard />
     <h1 className="text-center">Lista de Usuários</h1>
        {handleTokenMessage('users_list',tokenMessage)}
      {users.length === 0 ? <p>Carregando...</p> : (
        users.map((user) => (
          <ListUSers
            key={user.id}
            id={user.id}
            created_at={FormatDate(user.created_at)}
            updated_at={user.updated_at === null ?
              "não houve atualização" : FormatDate(user.updated_at)}
            name={user.name}
            username={user.username}
          />
        )))}
    </>
  )
}
