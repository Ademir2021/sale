import { handleEnsureAuth } from './handleEnsureAuth';

import api from './api/api';

export async function postAuthHandle(route: string, setTokenMessage: any, setHandle: any, isLogged: number) {
    const res: any | undefined = localStorage.getItem('token')
    const token: string = JSON.parse(res)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        await api.post<[]>(route, isLogged, { headers })
            .then(response => {
                setTokenMessage("token_valid")
                const resp: [] = response.data
                setHandle(resp)
            })
    }
    catch (err) {
        // console.log("error occurred !!" + err)
        setTokenMessage("expired_token")
        await handleEnsureAuth()
    }
};

export async function postRegister(object: any, route: string) {
    await api.post<any[]>(`${route}`, object)
        .then(response => {
            alert(JSON.stringify(response.data))
        })
        .catch(error => alert(error));
}

export async function putUpdate(object: any, route: string) {
    let resp: any[] = [] //retorno
    await api.put<any[]>(`${route}`, object)
        .then(response => { resp = response.data })
        .catch(error => resp = error);
    return resp
}

export async function postList(route: string, setHandle: any) {
    try {
        await api.post<[]>(route)
            .then(response => { setHandle(response.data) })
    } catch (err) { console.log("error occurred !!" + err) }
};

export async function getList(route: string, setHandle: any) {
    try {
        await api.get<[]>(route)
            .then(response => {
                setHandle(response.data)
            })
    } catch (err) { console.log("err: " + err) }
};

export async function getListQuery(route: string, setHandle: any, param: any) {
    try {
        await api.get<[]>(route, param)
            .then(response => {
                setHandle(response.data)
            })
    } catch (err) { console.log("err: " + err) }
};

