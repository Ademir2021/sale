export function checkAdminPrivilege() {
    const res = localStorage.getItem('u');
    if (res !== null) {
        const userLogged = JSON.parse(res);
        return userLogged[0].privilege;
    }
};

export function checksUserLogged() {
    const res = localStorage.getItem('u');
    if (res !== null) {
        const userLogged = JSON.parse(res);
        return userLogged[0].id
    }
};
