import { BackHome } from "../backHome/BackHome";

export function NotAuthorized() {

    return <>
            <BackHome />
        <div className="text-center">
            <a href="/">Home</a>
            <hr />
            <img className="p-3"
                src="img\error_401.jpeg"
                style={{ borderRadius: "67px" }}
                />
                 <div><b>Error 401 - </b>O Usuário não está Autorizado !
                </div>
            <hr></hr>
        </div>
    </>
}