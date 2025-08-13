import { VatServiceCH } from "./VatServiceCH.js";
import { VatServiceEU } from "./VatServiceEU.js";
import { CountryCode } from "../controllers/vatController.js";

export class ServiceFactory {
  static getServiceFor(countryCode: CountryCode) {
    if (countryCode === "CH") {
      return new VatServiceCH();
    }
    return new VatServiceEU();
  }
}
