import { useEffect } from "react";
import { BackHome } from "../backHome/BackHome";

export function Error404() {
    useEffect(() => {
        const uri = window.location.pathname
        if (uri === "/store")
            return window.location.replace('/')
    }, [])
    return <>
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
            <a href="/">Home</a>
        </div>
    </>
}
