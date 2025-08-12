import { CountryCode, VATNumber } from "../controllers/vatController.js";
import { VatService, VatCheckResult } from "./VatService.js";

const URL = "https://www.uid-wse.admin.ch/V5.0/PublicServices.svc";

export class VatServiceCH extends VatService {
  async check(countryCode: string, vat: string): Promise<VatCheckResult> {
    const xmlBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:uid="http://www.uid.admin.ch/xmlns/uid-wse/5">
  <soap:Body>
    <uid:ValidateVatNumber>
      <uid:vatNumber>${vat}</uid:vatNumber>
    </uid:ValidateVatNumber>
  </soap:Body>
</soap:Envelope>`;

    const options = {
      method: "POST",
      headers: {
        "content-type": "text/xml; charset=utf-8",
        SOAPAction:
          '"http://www.uid.admin.ch/xmlns/uid-wse/5/IPublicServices/ValidateVatNumber"',
      },
      body: xmlBody,
    };
    try {
      const response = await fetch(URL, options);
      if (!response.ok) {
        throw new Error("CH service call failed");
      }
      const xml = await response.text();
      console.log(xml);

      const isValid = true;
      return isValid
        ? {
            validated: true,
            details: "VAT number is valid for the given country code.",
            status: 200,
          }
        : { validated: false, details: "VAT number is invalid.", status: 400 };
    } catch (e) {
      throw new Error("CH service call failed");
    }
  }
}
