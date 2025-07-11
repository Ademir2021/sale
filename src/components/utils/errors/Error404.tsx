import { BackHome } from "../backHome/BackHome";

export function Error404() {
    return (
        <div className="container text-center p-3">
            <BackHome />
            <hr />
            <b>Error 404 - </b> <label>O endereço URL informado é inválido !
            </label>
            <img className="p-3"
                src="img\error_404.jpeg"
                style={{ borderRadius: "67px" }}
            />
            <hr></hr>
            <a href="/store">Home</a>
        </div>
    )
}

