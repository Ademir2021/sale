import { CloseX } from "../closeX/CloseX";
import "./styles/styles.css"
const NotAuthorized: React.FC = () => {
    return <>
        <div className="notAuth-container">
            <CloseX link="/" />
            <img src="img\error_401.jpeg" />
            <div>Usuário não Autorizado ...
            </div>
        </div>
    </>
}
export { NotAuthorized }