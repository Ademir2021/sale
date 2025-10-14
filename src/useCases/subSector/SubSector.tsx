import { useState, useEffect } from "react";
import { TSector, TSubSector } from "../products/type/TProducts";
import { getList } from "../../services/handleService";
import api from "../../services/api/api";
import { SubSectorForm } from "../../components/SubSector/SubSectorForm";
import { HandleSubSector } from "./handleSubSector";

const SubSector = () => {

    const handleSubSector = new HandleSubSector()

    const [msg, setMsg] = useState('')
    const [sectors, setSectors] = useState<TSector[]>([])
    const [selectedIdSector, setSelectedIdSector] = useState<any>(1)
    const [subSectors, setSubSectors] = useState<TSubSector[]>([])
    const [subSector, setSubSector] = useState<TSubSector>({
        id_sub_sector: 0,
        name_sub_sector: '',
        description_sub_sector: '',
        fk_sector: 0
    })

    // Atualiza  somente se selecionar
    if (selectedIdSector !== 1) {
        subSector.fk_sector = parseInt(selectedIdSector);
    }

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setSubSector(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        getList('sub_sectors', setSubSectors)
    }, [subSectors])

    useEffect(() => {
        getList('sectors', setSectors)
    }, [sectors])

    const updateSubSector = (SubSector: TSubSector) => {
        setSubSector(SubSector)
        setMsg('')
    }

    const findNameSector = (SubSetor: TSubSector) => {
        for (let sector of sectors)
            if (sector.id_sector == SubSetor.fk_sector)
                return sector.name_sector
    }

    const handleSubSectorRegister = async () => {
        await api.post('/sub_sector', subSector)
            .then(response => {
                const res: any = response.data
                // setMsg(res[0].msg)
                if (!res)
                    setMsg("Inserido com Sucesso")
            }).catch(error => setMsg(error))
    }

    const handleSubSectorUpdate = async () => {
        await api.put('/sub_sector', subSector)
            .then(response => {
                const res: any = response.data
                // setMsg(res[0].msg)
                if (!res)
                    setMsg("Atualizado com sucesso")
            }).catch(error => setMsg(error))
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        if (subSector.name_sub_sector !== "") {
            subSector.id_sub_sector == 0 ?
                handleSubSectorRegister() :
                handleSubSectorUpdate()
        } else {
            setMsg("Informe o nome do Sub Setor")
        }
        setSubSector(handleSubSector.clearFieldSubSector(subSector))
    }

    return <>
        <SubSectorForm
            subSectors={subSectors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            msg={msg}
            updateSubSector={updateSubSector}
            setSubSector={setSubSector}
            listSector={<select
                onChange={e => setSelectedIdSector(e.target.value)}
            >
                {sectors.map((sector: TSector) => (
                    <option
                        key={sector.id_sector}
                        value={sector.id_sector}
                    >
                        {sector.name_sector}
                    </option>))}</select>}
            selectedIdSector={subSector.fk_sector}
            findNameSector={findNameSector}
        >
            {subSector}
        </SubSectorForm>
    </>
}

export { SubSector }

