import { useEffect, useState } from "react";
import { CookieAlertComponet } from "../../components/home/CookieAlertComponet"

export function CookiesAlert() {

    const [cookieStatus, setCookieStatus] = useState<boolean>(false);

    function setCookie() {
        const res = localStorage.getItem("cookie_status");
        if (res !== null) {
            setCookieStatus(true);
        }
    }

    useEffect(() => {
        setCookie()
    }, [cookieStatus])

    function handleSubmit() {
        localStorage.setItem("cookie_status", JSON.stringify(true))
        setCookie()
    }
  
    return (
        <>
        <CookieAlertComponet
            handleSubmit={handleSubmit}
            cookieStatus={cookieStatus}
        />
        </>
    )

}