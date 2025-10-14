import { TSubSector } from "../products/type/TProducts";

class HandleSubSector {

    clearFieldSubSector(SubSector: TSubSector) {
        const res: TSubSector = {
            id_sub_sector: 0,
            name_sub_sector: '',
            description_sub_sector: '',
            fk_sector: 0
        }
        return res
    }
}

export { HandleSubSector }