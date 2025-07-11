import { useState, useEffect } from "react";
import { CaixaMovListComp } from "../../components/caixaMov/CaixaMovList";
import { TCaixaMov } from "./type/TCaixaMov";
import { TDespesa, TValPago } from "../contasAPagar/type/TContasAPagar";
import { TValsRecebidos } from "../contasAReceber/type/TContasAReceber";
import { getList, postList } from "../../services/handleService";
import { currencyFormat } from '../../components/utils/currentFormat/CurrentFormat';

export function CaixaMovList() {
    const [caixaMov, setCaixaMov] = useState<TCaixaMov[]>([])
    const [despesas, setDespesas] = useState<TDespesa[]>([])
    const [valsPagos, setValsPagos] = useState<TValPago[]>([])
    const [valsRecebidos, setValsRecebidos] = useState<TValsRecebidos[]>([])

    useEffect(() => {
        postList('caixa_movs', setCaixaMov)
    }, [caixaMov]);

    useEffect(() => {
        getList('despesas', setDespesas)
    }, [despesas])

    useEffect(() => {
        getList('vals_pagos', setValsPagos)
    }, [valsPagos])

    useEffect(() => {
        getList('vals_recebidos', setValsRecebidos)
    }, [valsRecebidos])

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

    return (
        <>
            <CaixaMovListComp
                caixaMov={caixaMov}
                findNameMovCaixaDebito={findNameMovCaixaDebito}
                findNameMovCaixaCredito={findNameMovCaixaCredito}
                findVendaMovCaixaCredito={findVendaMovCaixaCredito}
            />
            <p className="container"><b>Saldo atual = </b>
            R${caixaMov.length > 0 ? currencyFormat(caixaMov[0].saldo) : 0}</p>
        </>
    )
}