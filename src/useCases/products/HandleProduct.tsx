import { TBrand, TSector, TSubSector, TUnMed, TClasseProd, TGrupoFiscal, TTipoProd, TProduct } from "./type/TProducts";

class HandleProducts {

   findSectorNameBySubSector(
        products: TProduct[],
        subSectors: TSubSector[],
        sectors: TSector[],
        fk_sub_sector: number
    ): string | undefined {
        // 1. Verifica se há um produto com esse fk_sub_sector
      const product = products.find(p => p.fk_sub_sector === fk_sub_sector);
        if (!product) return undefined;

        // 2. Busca o subsetor correspondente
        const subSector = subSectors.find(ss => ss.id_sub_sector === fk_sub_sector);
        if (!subSector) return undefined;

        // 3. Busca o setor correspondente ao fk_sector do subsetor
        const sector = sectors.find(s => s.id_sector === subSector.fk_sector);
        return sector?.name_sector;
    }

    nameSubSector(idSubSector: number, subSectors: TSubSector[]) {
        for (let subSector of subSectors) {
            if (subSector.id_sub_sector === idSubSector)
                return subSector.name_sub_sector
        }
    };
    nameBrands(idBrand: number, brands: TBrand[]) {
        for (let brand of brands) {
            if (brand.id_brand === idBrand)
                return brand.name_brand
        }
    };
    nameUnMeds(idUnMed: number, unMeds: TUnMed[]) {
        for (let unMed of unMeds) {
            if (unMed.id_un === idUnMed)
                return unMed.un_med
        }
    };
    nameClasseProd(idClasseProd: number, classesProds: TClasseProd[]) {
        for (let classeProd of classesProds) {
            if (classeProd.id_classe === idClasseProd)
                return classeProd.name_classe
        }
    };
    nameGruposFiscais(idGrupoFiscal: number, gruposFiscais: TGrupoFiscal[]) {
        for (let grupoFiscal of gruposFiscais) {
            if (grupoFiscal.id_grupo_fiscal === idGrupoFiscal)
                return grupoFiscal.name_grupo_fiscal
        }
    };
    nameTiposProds(idTipoProd: number, tiposProds: TTipoProd[]) {
        for (let tipoProd of tiposProds) {
            if (tipoProd.id_tipo === idTipoProd)
                return tipoProd.name_tipo
        }
    };
};

export { HandleProducts }