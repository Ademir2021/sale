import { checkAdminPrivilege } from "../../utils/checksUserLogged/ChecksUserLogged";
import { Globais } from "../../globais/Globais";
import { NotAuthorized } from "./notAuthorized";

class HandleNotAuthorized {
checkAdminAuthorization(route: JSX.Element) {
        const privilAdmin = Globais.privilAdmin;
        const res = checkAdminPrivilege() === privilAdmin ? route : <NotAuthorized />
        return res;
    }
}

export { HandleNotAuthorized }