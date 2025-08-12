import { CountryCode, VATNumber } from "../routers/vatRouter";
import { VatService } from "./VatService";
import { VatServiceCH } from "./VatServiceCH";
import { VatServiceEU } from "./VatServiceEU";

export const getService = (countryCode: CountryCode): VatService => {
  if (countryCode == "CH") {
    return new VatServiceCH();
  }

  return new VatServiceEU();
};
