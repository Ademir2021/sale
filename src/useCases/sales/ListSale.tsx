import { useState, useContext } from "react";
import { ListSalesForm } from "../../components/sales/ListSalesForm";
import { AuthContext } from '../../context/auth'
import { postAuthHandle } from "../../services/handleService";
import { TSaleList } from "./type/TSale";

export function ListSales() {
  const [created_int, setInt] = useState("");
  const [created_end, setEnd] = useState("");
  const [sales, setSales] = useState<TSaleList[]>([]);
  const [filteredSales, setFilteredSales] = useState<TSaleList[]>([]);
  const [tokenMessage, setTokenMessage] = useState('');
  const [msg, setMsg] = useState('')
  const { user: isLogged }: any = useContext(AuthContext);

  const validateDates = () => {
    return created_int.trim() !== "" && created_end.trim() !== "";
  };

  const searchSales = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDates()) {
      setMsg("Preencha os Campos do Período Desejado");
      return;
    };
    await fetchSales();
    filterSales();
  };

  const fetchSales = async () => {
    await postAuthHandle('sale_user', setTokenMessage, setSales, isLogged);
  };

  const filterSales = () => {
    const filtered = sales.filter(sale =>
      sale.created_at >= created_int && sale.created_at <= created_end
    );
    setFilteredSales(filtered);

    if (!filtered.length) {
      setMsg("Nota(s) não localizada");
    }
  };

  return <> <ListSalesForm
    filteredSales={filteredSales}
    setFilteredSales={setFilteredSales}
    int={created_int}
    setInt={setInt}
    end={created_end}
    setEnd={setEnd}
    searchHandle={searchSales}
    msg={msg}
    sales={filteredSales}
    tokenMessage={tokenMessage} /></>
}
