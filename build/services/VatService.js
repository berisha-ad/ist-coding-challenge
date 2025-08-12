import allowedCountries from "../allowedCountries.js";
export class VatService {
    static async validateVATFormat(countryCode, vatNumber) {
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
//# sourceMappingURL=VatService.js.map