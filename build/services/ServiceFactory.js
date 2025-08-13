import { VatServiceCH } from "./VatServiceCH.js";
import { VatServiceEU } from "./VatServiceEU.js";
export class ServiceFactory {
    static getServiceFor(countryCode) {
        if (countryCode === "CH") {
            return new VatServiceCH();
        }
        return new VatServiceEU();
    }
}
//# sourceMappingURL=ServiceFactory.js.map