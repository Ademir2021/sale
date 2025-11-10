import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from 'react'
import { Home } from "./useCases/home/Home";
import { DashboardDefault } from "./useCases/dashboard/DashboardDefault";
import { ItenStore } from "./useCases/dashboard/iItenStore";
import { Contacts } from "./useCases/contacts/Contacts";
import { UsersList } from './useCases/users/UsersList';
import { RegisterSale } from "./useCases/sales/RegisterSale";
import { InvoiceSales } from './useCases/sales/InvoiceSales';
import { PagSeguro } from "./useCases/sales/PagSeguro";
import { PagSeguroCard } from "./useCases/sales/PagSeguroCard";
import { ListSales } from './useCases/sales/ListSale';
import { FormProduct } from "./useCases/products/ProductRegister";
import { ProductsList } from './useCases/products/ProductList';
import { ProductUpdate } from "./useCases/products/ProductUpdate";
import { FormPerson } from "./useCases/persons/PersonRegister";
import { PersonUpdate } from "./useCases/persons/PersonUpdate";
import { PersonsList } from './useCases/persons/PersonList';
import { AuthProvider, AuthContext } from "./context/auth";
import { Logout } from "./components/utils/logout/Logout";
import { Ceps } from "./useCases/ceps/Ceps";
import { ContactsList } from "./useCases/contacts/ContactsList";
import { CookieWarnings } from "./useCases/home/CookieWarnings";
import { ContasAReceber } from "./useCases/contasAReceber/ContasAReceber";
import { PagCredLoja } from "./useCases/sales/PagCredLoja";
import { ContasAReceberRegister } from "./useCases/contasAReceber/ContasAReceberRegister";
import { ReceberValor } from "./useCases/contasAReceber/ReceberValor";
import { CaixaMovList } from "./useCases/caixaMov/CaixaMovList";
import { NotaRecebida } from "./useCases/notaRecebida/NotaRecebida";
import { ContasAPagar } from "./useCases/contasAPagar/ContasAPagar";
import { ContasAPagarRegister } from "./useCases/contasAPagar/ContasAPagarRegister";
import { PagarValor } from "./useCases/contasAPagar/PagarValor";
import { Error404 } from "./components/utils/errors/Error404";
import { ReciboValRc } from "./useCases/contasAReceber/ReciboValRec";
import { HandleNFe } from "./useCases/nfe/HandleNFe";
import { Login } from "./useCases/users/Login";
import { Sector } from "./useCases/sector/Sector";
import { SubSector } from "./useCases/subSector/SubSector";
import { Brand } from "./useCases/Brand/Brand";
import { Filial } from "./useCases/filial/Filial";
import { HandleNotAuthorized } from "./components/utils/notAuthorized/HandleNotAuthorized";
import { ClasseProd } from "./useCases/classeProd/ClasseProd";
import { Despesa } from "./useCases/despesas/Despesa";
import { SetorDespesa } from "./useCases/despesas/SetorDespesa";

export function AppRoutes() {

    const handleNotAuthorized = new HandleNotAuthorized()

    const Private = ({ children }: any) => {
        const { authenticated, loading }: any = useContext(AuthContext)
        if (loading) {
            return <div className="loading">Carregando...</div>
        }
        if (!authenticated) {
            let res_uri = window.location.pathname;
            let parts = res_uri.split('/');
            let urlParts = parts.pop() || parts.pop();
            localStorage.setItem("uri", JSON.stringify(urlParts));
            return <Navigate to="/login" />
        }
        return children
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/login" Component={Login} />
                    <Route path="/logout" Component={Logout} />
                    <Route path="/contact" Component={Contacts} />
                    <Route path="/cookies" Component={CookieWarnings} />
                    <Route path="/pe" Component={ItenStore} />
                    <Route path="/dashboardefault" element={<Private><DashboardDefault /></Private>} />
                    <Route path="/users_list" element={<Private><UsersList /></Private>} />
                    <Route path="/invoice_sales" element={<Private><InvoiceSales /></Private>} />
                    <Route path="/pagseguro" element={<Private><PagSeguro /></Private>} />
                    <Route path="/pagsegurocard" element={<Private><PagSeguroCard /></Private>} />
                    <Route path="/sale" element={<Private><RegisterSale /></Private>} />
                    <Route path="/list_sale" element={<Private><ListSales /></Private>} />
                    <Route path="/form_product" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<FormProduct />)}</Private>} />
                    <Route path="/product_list" element={<Private><ProductsList /></Private>} />
                    <Route path="product_update" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<ProductUpdate />)}</Private>} />
                    <Route path="/form_person" element={<Private><FormPerson /></Private>} />
                    <Route path="/person_list" element={<Private><PersonsList /></Private>} />
                    <Route path="/person_update" element={<Private><PersonUpdate /></Private>} />
                    <Route path="/ceps" element={<Private><Ceps /></Private>} />
                    <Route path="/contacts_list" element={<Private><ContactsList /></Private>} />
                    <Route path="/cookies" Component={CookieWarnings} />
                    <Route path="/contas_receber" element={<Private><ContasAReceber /></Private>} />
                    <Route path="/pagcredloja" element={<Private><PagCredLoja /></Private>} />
                    <Route path="/contas_receber_register" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<ContasAReceberRegister />)}</Private>} />
                    <Route path="/receber_valor" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<ReceberValor />)}</Private>} />
                    <Route path="/caixa_mov" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<CaixaMovList />)}</Private>} />
                    <Route path="/nota_recebida" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<NotaRecebida />)}</Private>} />
                    <Route path="/contas_pagar" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<ContasAPagar />)}</Private>} />
                    <Route path="/contas_pagar_register" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<ContasAPagarRegister />)}</Private>} />
                    <Route path="/pagar_valor" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<PagarValor />)}a</Private>} />
                    <Route path="/recibo_val_rec" element={<Private><ReciboValRc /></Private>} />
                    <Route path="nfe" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<HandleNFe />)}</Private>} />
                    <Route path="sector" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<Sector />)}</Private>} />
                    <Route path="sub_sector" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<SubSector />)}</Private>} />
                    <Route path="brand" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<Brand />)}</Private>} />
                    <Route path="filial" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<Filial />)}</Private>} />
                    <Route path="classe_prod" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<ClasseProd />)}</Private>} />
                    <Route path="despesa" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<Despesa />)}</Private>} />
                    <Route path="setor_despesa" element={<Private>{handleNotAuthorized.checkAdminAuthorization(<SetorDespesa />)}</Private>} />
                    <Route path="*" Component={Error404} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}