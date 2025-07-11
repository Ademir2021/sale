import { Dashboard } from "./Dashboard"
import { FooterHome } from "../../components/storeHome/FooterHome"
import { useContext } from 'react';
import { AuthContext } from "../../context/auth";
import { HeaderDashboard } from '../../components/dashboard/HeaderDashboard';

export function DashboardDefault() {

    const {user, logout }: any = useContext(AuthContext);
    
    const handleLogout = async () => {
        await logout()
        window.location.replace("/");
    }

    return (
        <>
        <div className="container">
            <Dashboard />
            <HeaderDashboard
                privilege={user[0].privilege}
                name={user[0].name}
                username={user[0].username}
                handleLogout={handleLogout}
            />
            <FooterHome />
        </div>
        </>
    )
}