import { CountryCode, VATNumber } from "../controllers/vatController.js";
import { VatService, VatCheckResult } from "./VatService.js";

type EUVatResponse = {
  valid: boolean;
  countryCode: CountryCode;
  vatNumber: VATNumber;
};

const EU_VALIDATE_VAT_URL =
  "https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number";

export class VatServiceEU extends VatService {
  async check(
    countryCode: CountryCode,
    vat: VATNumber
  ): Promise<VatCheckResult> {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        countryCode,
        vatNumber: vat,
      }),
    };

    try {
      const response = await fetch(EU_VALIDATE_VAT_URL, options);
      if (!response.ok) {
        throw new Error("EU service call failed");
      }
      const data = (await response.json()) as EUVatResponse;
      console.log("EU VAT validation response:", data);
      return data.valid
        ? {
            validated: true,
            details: "VAT number is valid for the given country code.",
            status: 200,
          }
        : { validated: false, details: "VAT number is invalid.", status: 400 };
    } catch (e) {
      throw new Error("EU service call failed");
    }
  }
}
