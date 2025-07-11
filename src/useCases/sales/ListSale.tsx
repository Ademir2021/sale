import { useState, useContext } from "react";
import { SalesList } from "../../components/sales/SaleList";
import { Dashboard } from "../dashboard/Dashboard";
import { InputSearch } from "../../components/inputSearch/InputSearch";
import { AuthContext } from '../../context/auth'
import { postAuthHandle } from "../../services/handleService";
import { TSaleList } from "./type/TSale";
import { handleTokenMessage } from "../../services/handleEnsureAuth";

export function ListSales() {
  const { user: isLogged }: any = useContext(AuthContext);
  const [sales, setSales] = useState<TSaleList[]>([]);
  const [sales_, setSales_] = useState<TSaleList[]>([]);
  const [created_int, setInt] = useState<Date | any>('')
  const [created_end, setEnd] = useState<Date | any>('')
  const [tokenMessage, setTokenMessage] = useState<string>("Usuário Autenticado !")

  function searchSales(e: Event) {
    e.preventDefault()
    if (created_int.length &&
      created_end.length !== '') {
      getSales()
    } else {
      alert("Preencha os 2 campos das Datas !")
    }
  };

  const getSales = async () => {
    postAuthHandle('sale_user', setTokenMessage, setSales, isLogged)
    let sale_: TSaleList[] = []
    for (let sale of sales) {
      if (sale.created_at >= created_int
        && sale.created_at <= created_end)
        sale_.push(sale)
    }
    setSales_(sale_)
    if (!sales[0].id_sale)
      alert("Cliente sem Nota")
  };

  return (
    <>
      <Dashboard />
      <h1 className="text-center">Lista de notas por período</h1>
     {handleTokenMessage('list_sale',  tokenMessage)}
      <InputSearch
        int={created_int}
        end={created_end}
        setInt={setInt}
        setEnd={setEnd}
        searchHandle={searchSales}
      />
      <SalesList
      sales={sales_}
      />
    </>
  )
}