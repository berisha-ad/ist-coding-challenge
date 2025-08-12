import { CountryCode, VATNumber } from "../controllers/vatController.js";
import { VatService, VatCheckResult } from "./VatService.js";

export class VatServiceEU extends VatService {
  async check(
    countryCode: CountryCode,
    vat: VATNumber
  ): Promise<VatCheckResult> {
    try {
      // fetch request

      const isValid = true;
      return isValid
        ? {
            validated: true,
            details: "VAT number is valid for the given country code.",
          }
        : { validated: false, details: "VAT number is invalid." };
    } catch (e) {
      throw new Error("EU service call failed");
    }
  }
}
