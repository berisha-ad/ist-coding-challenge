import allowedCountries from "../allowedCountries";
import { CountryCode, VATNumber } from "../controllers/vatController";

export type VatCheckResult =
  | { validated: true; details: string; meta?: Record<string, unknown> }
  | { validated: false; details: string; meta?: Record<string, unknown> };

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
