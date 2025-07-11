import { useContext, useEffect } from 'react';
import { AuthContext } from "../../../context/auth";

export const Logout = () => {
    const { logout }: any = useContext(AuthContext);
    const handleLogout = () => {
        logout()
    }
    useEffect(() => {
        handleLogout()
    },)
}