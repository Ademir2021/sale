// import { useEffect } from "react";
import { CloseX } from '../closeX/CloseX';
import './styles/styles.css'
export function Error404() {
    // useEffect(() => {
    //     const uri = window.location.pathname
    //     if (uri === "/store")
    //         return window.location.replace('/')
    // }, [])
    return <>
        <div className="error-container">
            <CloseX link={'/'} />
            <img src="img\error_404.jpeg" />
            <div>Endereço URL Inválido ...</div>
        </div>
    </>
}
