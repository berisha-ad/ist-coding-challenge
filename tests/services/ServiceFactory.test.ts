import { ServiceFactory } from "../../source/services/ServiceFactory.js";
import { VatServiceCH } from "../../source/services/VatServiceCH.js";
import { VatServiceEU } from "../../source/services/VatServiceEU.js";

describe("ServiceFactory.getServiceFor", () => {
  it("returns CH service for CH", () => {
    const svc = ServiceFactory.getServiceFor("CH" as any);
    expect(svc).toBeInstanceOf(VatServiceCH);
  });

  it("returns EU service for others", () => {
    const svc = ServiceFactory.getServiceFor("DE" as any);
    expect(svc).toBeInstanceOf(VatServiceEU);
  });
});
