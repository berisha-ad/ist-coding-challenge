import allowedCountries from "../allowedCountries.js";
import { CountryCode, VATNumber } from "../controllers/vatController";

export type VatCheckResult =
  | { valid: true; details: string; status: number }
  | { valid: false; details: string; status: number };

export abstract class VatService {
  abstract check(countryCode: string, vat: string): Promise<VatCheckResult>;

  static async validateVATFormat(
    countryCode: CountryCode,
    vatNumber: VATNumber
  ): Promise<boolean> {
    const country = allowedCountries.find((c) => c.code === countryCode);
    if (!country) {
      throw new Error("Falscher Country Code");
    }
    if (!country.regex.test(vatNumber)) {
      return false;
    }
    return true;
  }
}
