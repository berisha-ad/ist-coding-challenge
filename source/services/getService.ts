import { CountryCode, VATNumber } from "../routers/vatRouter";
import { VatService } from "./VatService.js";
import { VatServiceCH } from "./VatServiceCH.js";
import { VatServiceEU } from "./VatServiceEU.js";

export const getService = (countryCode: CountryCode): VatService => {
  if (countryCode === "CH") {
    return new VatServiceCH();
  }
  return new VatServiceEU();
};
