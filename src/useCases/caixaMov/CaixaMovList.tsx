import { useState, useEffect, useContext } from "react";
import { CaixaMovListComp } from "../../components/caixaMov/CaixaMovList";
import { TCaixaMov } from "./type/TCaixaMov";
import { TDespesa, TValPago } from "../contasAPagar/type/TContasAPagar";
import { TValsRecebidos } from "../contasAReceber/type/TContasAReceber";
import { getList, postAuthHandle, postList } from "../../services/handleService";

import { AuthContext } from "../../context/auth";
import { handleTokenMessage } from "../../services/handleEnsureAuth";

export function CaixaMovList() {

    const { user: isLogged }: any = useContext(AuthContext);
    const [tokenMessage, setTokenMessage] = useState('')

    const [caixaMov, setCaixaMov] = useState<TCaixaMov[]>([])
    const [despesas, setDespesas] = useState<TDespesa[]>([])
    const [valsPagos, setValsPagos] = useState<TValPago[]>([])
    const [valsRecebidos, setValsRecebidos] = useState<TValsRecebidos[]>([])

    useEffect(() => {
        postList('caixa_movs', setCaixaMov)
    }, []);

    useEffect(() => {
        getList('despesas', setDespesas)
    }, [])

    useEffect(() => {
        async function getValsPagos() {
            await postAuthHandle('vals_pagos_list', setTokenMessage, setValsPagos, isLogged)
        }
        getValsPagos()
    }, [])

    useEffect(() => {
        async function getValsRecebidos() {
            await postAuthHandle('vals_recebidos_list', setTokenMessage, setValsRecebidos, isLogged)
        }
        getValsRecebidos()
    }, [])

    function findNameMovCaixaDebito(id: number) {
        for (let val of valsPagos)
            if (val.id_val === id)
                for (let despesa of despesas)
                    if (val.fk_despesa === despesa.id)
                        if (despesa.name)
                            return despesa.name
    }

    function findNameMovCaixaCredito(id: number) {
        for (let valRecebido of valsRecebidos)
            if (valRecebido.id_val === id)
                if (valRecebido.descricao)
                    return valRecebido.descricao
    }

    function findVendaMovCaixaCredito(id: number) {
        for (let caixa of caixaMov)
            if (caixa.fk_val === id)
                for (let val of valsRecebidos)
                    if (val.id_val === caixa.fk_val)
                        if (val.fk_venda)
                            return val.fk_venda
    }

    return <> <CaixaMovListComp
        token={handleTokenMessage('caixa_mov', tokenMessage)}
        caixaMov={caixaMov}
        findNameMovCaixaDebito={findNameMovCaixaDebito}
        findNameMovCaixaCredito={findNameMovCaixaCredito}
        findVendaMovCaixaCredito={findVendaMovCaixaCredito}
    /> </>
}