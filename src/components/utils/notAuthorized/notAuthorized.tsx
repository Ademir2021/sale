import { BackHome } from "../backHome/BackHome";

export function NotAuthorized() {

    return <>
        <div className="container text-center p-3">
            <BackHome />
            <hr />
            <b>Error 401 - </b> <label>O Usuário não está Autorizado !
            </label>
            <img className="p-3"
                src="img\error_401.jpeg"
                style={{ borderRadius: "67px" }}
            />
            <hr></hr>
            <a href="/">Home</a>
        </div>
    </>
}