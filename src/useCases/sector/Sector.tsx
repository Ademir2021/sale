import { useState, useEffect } from "react";
import { SectorForm } from "../../components/sectors/SectorForm"
import { TSector } from "../products/type/TProducts";
import { getList } from "../../services/handleService";
import api from "../../services/api/api";

const Sector = () => {

    const [msg, setMsg] = useState('')
    const [sectors, setSectors] = useState<TSector[]>([])
    const [sector, setSector] = useState<TSector>({
        id_sector: 0,
        name_sector: ''
    })

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setSector(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        getList('sectors', setSectors)
    }, [sectors])

    const updateSector = (Sector:TSector)=>{
        setSector(Sector)
        setMsg('')
    }

    const handleSectorRegister = async () => {
        await api.post('/sector', sector)
            .then(response => {
                const res: any = response.data
                // setMsg(res[0].msg)
                if(!res)
                setMsg('Inserido com sucesso')
            }).catch(error => setMsg(error))
    }

    const handleSectorUpdate = async () => {
        await api.put('/sector', sector)
            .then(response => {
                const res: any = response.data
                // setMsg(res[0].msg)
                if(!res)
                    setMsg("Atualizado com sucesso")
            }).catch(error => setMsg(error))
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        if (sector.name_sector !== "") {
            sector.id_sector == 0 ?
                handleSectorRegister() :
                handleSectorUpdate()
        } else {
            setMsg("Informe o nome do Setor")
        }
        setSector({id_sector:0,name_sector:''})
    }

    return <>
        <SectorForm
            sectors={sectors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            msg={msg}
            updateSector={updateSector}
            setSector={setSector}
        >
            {sector}
        </SectorForm>
    </>
}

export { Sector }

