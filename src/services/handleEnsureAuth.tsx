import api from "../services/api/api";

import * as Icon from 'phosphor-react';

export async function handleEnsureAuth() {
    const user = { username: "", password: "" }
    const res = localStorage.getItem('u')
    const res_ = localStorage.getItem('xxx')
    if (res !== null && res_ !== null) {
        const user_ = JSON.parse(res)
        const password_ = JSON.parse(res_)
        user.username = user_[0].username
        user.password = password_
    }
    try {
        await api.post('auth', user)
            .then(response => {
                const resToken = response.data.refreshToken.user_id
                api.post("refresh_token", { "refresh_token": resToken })
                    .then(response => {
                        const token: string = response.data.token
                        localStorage.setItem("token", JSON.stringify(token));
                    })
            })
    } catch (err) {
        console.log("Err " + err)
    }
}

export function handleTokenMessage(link:string, tokenMessage:string){
    const msga =   <a className="m-5" href={link}>{<Icon.Lock size={32} />}</a>
    const msgb =   <a className="m-5" href={link}>{<Icon.LockKeyOpen size={32} />}</a>
    if (tokenMessage !== 'expired_token'){
        return msga
    }else{
        return msgb
    }
}