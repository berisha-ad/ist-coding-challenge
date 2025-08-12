import allowedCountries from "../allowedCountries.js";
import { z } from "zod";
import { getService } from "../services/getService.js";
import { VatService } from "../services/VatService.js";
const allowedCountryCodes = allowedCountries.map((country) => country.code);
const countryCodeSchema = z.enum(allowedCountryCodes);
const vatNumberSchema = z.string().min(2).max(100); // here we can define the min and max length for the vat number
const bodySchema = z.object({
    countryCode: countryCodeSchema,
    vat: vatNumberSchema,
});
export default class VATController {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async validate(req, res) {
        const { countryCode, vat } = bodySchema.parse(req.body);
        const isValid = await VatService.validateVATFormat(countryCode, vat);
        if (!isValid) {
            console.error("400 Bad Request --> The VAT format is invalid");
            return res.status(400).json({ error: "This VAT format is invalid" });
        }
        try {
            const vatService = getService(countryCode);
            if (!vatService) {
                console.error("501 Not implemented --> wrong CountryCode or VAT format");
                return res.status(501).json({ error: "Not implemented" });
            }
            const response = await vatService.check(countryCode, vat);
            res.status(response.status).json({ ...response });
        }
        catch (error) {
            console.error("501 Not implemented --> wrong CountryCode or VAT format");
            res.status(501).json({ error: "Not implemented", details: error });
        }
    }
}
//# sourceMappingURL=vatController.js.map