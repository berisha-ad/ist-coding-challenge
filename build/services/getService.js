import { VatServiceCH } from "./VatServiceCH.js";
import { VatServiceEU } from "./VatServiceEU.js";
export const getService = (countryCode) => {
    if (countryCode === "CH") {
        return new VatServiceCH();
    }
    return new VatServiceEU();
};
//# sourceMappingURL=getService.js.map