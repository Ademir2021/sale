import { useEffect } from "react";
import { BackHome } from "../backHome/BackHome";

export function Error404() {
    useEffect(() => {
        const uri = window.location.pathname
        if (uri === "/store")
            return window.location.replace('/')
    }, [])
    return <>
            <BackHome />
        <div className="text-center">
            <a href="/">Home</a>
            <hr />
            <img className="p-3"
                src="img\error_404.jpeg"
                style={{ borderRadius: "67px" }}
                />
                <div><b>Error 404 - </b>  O endereço URL informado é inválido !
            <hr></hr>
                </div>
        </div>
    </>
}
