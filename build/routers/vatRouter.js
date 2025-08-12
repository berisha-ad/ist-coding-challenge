import { Router } from "express";
import { z } from "zod";
import VATController from "../controllers/vatController.js"; // TO_CHANGE: naming
import allowedCountries from "../allowedCountries.js";
let vatController; // TO_CHANGE: naming
const allowedCountryCodes = allowedCountries.map((country) => country.code);
const countryCodeSchema = z.enum(allowedCountryCodes);
const vatNumberSchema = z.string().min(2).max(100); // here we can define the min and max length for the vat number
const bodySchema = z.object({
    countryCode: countryCodeSchema,
    vat: vatNumberSchema,
});
const router = (configuration) => {
    // TO_CHANGE: if you don't need your configuration here or in the controller, you can remove the function and just export the router itself
    const expressRouter = Router({
        caseSensitive: true,
        strict: true,
    });
    vatController = new VATController(configuration); // You can make the controller a const if it doesn't need the configuration
    expressRouter.post("/validate", vatController.validate);
    return expressRouter;
};
export default router;
//# sourceMappingURL=vatRouter.js.map