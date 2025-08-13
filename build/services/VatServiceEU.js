import { VatService } from "./VatService.js";
const EU_VALIDATE_VAT_URL = "https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number";
export class VatServiceEU extends VatService {
    async check(countryCode, vat) {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({ countryCode, vatNumber: vat.slice(2) }),
        };
        const response = await fetch(EU_VALIDATE_VAT_URL, options);
        if (!response.ok)
            throw new Error(`EU service call failed: ${response.status}`);
        const data = (await response.json());
        console.log("EU VAT validation response:", data);
        if (data.valid === true) {
            return {
                validated: true,
                details: "VAT number is valid for the given country code.",
                status: 200,
            };
        }
        const detail = data.userError
            ? `Invalid (${data.userError}).`
            : data.formatError
                ? `Format error (${data.formatError}).`
                : "VAT number is invalid.";
        return { validated: false, details: detail, status: 400 };
    }
}
//# sourceMappingURL=VatServiceEU.js.map