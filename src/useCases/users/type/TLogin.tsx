type RoleLogin = 'ADMIN' | 'USER'

export type TUserLogin = {
    name:string
    username:string
    password:string
    repeatPass:string
    role:RoleLogin
    hash:string
}