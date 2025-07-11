import { TBrand, TSector, TUnMed, TClasseProd, TGrupoFiscal, TTipoProd } from "./type/TProducts";

class HandleProducts {
    public nameSector(idSector: number, sectors: TSector[]) {
        for (let sector of sectors) {
            if (sector.id_sector === idSector)
                return sector.name_sector
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