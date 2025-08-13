import { VatService, VatCheckResult } from "./VatService.js";

const URL = "https://www.uid-wse.admin.ch/V5.0/PublicServices.svc";
const SOAP_ACTION =
  "http://www.uid.admin.ch/xmlns/uid-wse/IPublicServices/ValidateVatNumber";

export class VatServiceCH extends VatService {
  async check(_countryCode: string, vat: string): Promise<VatCheckResult> {
    const xmlBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:uid="http://www.uid.admin.ch/xmlns/uid-wse">
  <soap:Body>
    <uid:ValidateVatNumber>
      <uid:vatNumber>${vat}</uid:vatNumber>
    </uid:ValidateVatNumber>
  </soap:Body>
</soap:Envelope>`;

    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: `"${SOAP_ACTION}"`,
      },
      body: xmlBody,
    });

    const xml = await resp.text();
    if (!resp.ok) throw new Error("CH service call failed");

    const m = xml.match(
      /<[^:]*ValidateVatNumberResult[^>]*>(true|false)<\/[^:]*ValidateVatNumberResult>/i
    );
    if (!m) throw new Error("CH service call failed");

    console.log(m);

    const validated = m[1] === "true";
    return validated
      ? {
          validated: true,
          details: "VAT number is valid for the given country code.",
          status: 200,
        }
      : { validated: false, details: "VAT number is invalid.", status: 400 };
  }
}
