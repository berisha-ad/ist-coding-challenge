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
            const data = (await response.json());
            console.log("EU VAT validation response:", data);
            return data.valid
                ? {
                    valid: true,
                    details: "VAT number is valid for the given country code.",
                    status: 200,
                }
                : { valid: false, details: "VAT number is invalid.", status: 400 };
        }
        catch (e) {
            throw new Error("EU service call failed");
        }
    }
}
//# sourceMappingURL=VatServiceEU.js.map