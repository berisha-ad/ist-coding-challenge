import VATController from "../../source/controllers/vatController.js";
import { ServiceFactory } from "../../source/services/ServiceFactory.js";
import { VatService } from "../../source/services/VatService.js";

function mkRes() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe("VATController.validate (unit)", () => {
  const controller = new VATController({} as any);

  it("400 when VAT format invalid (pre-call gate)", async () => {
    jest.spyOn(VatService, "validateVATFormat").mockResolvedValue(false);
    const req: any = { body: { countryCode: "DE", vat: "DE123" } };
    const res = mkRes();

    await controller.validate(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "This VAT format is invalid",
    });
  });

  it("returns downstream service status and payload (valid)", async () => {
    jest.spyOn(VatService, "validateVATFormat").mockResolvedValue(true);
    jest.spyOn(ServiceFactory, "getServiceFor").mockReturnValue({
      check: async () => ({ validated: true, details: "ok", status: 200 }),
    } as any);

    const req: any = { body: { countryCode: "DE", vat: "DE123456789" } };
    const res = mkRes();

    await controller.validate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      validated: true,
      details: "ok",
    });
  });

  it("returns 400 when downstream says invalid", async () => {
    jest.spyOn(VatService, "validateVATFormat").mockResolvedValue(true);
    jest.spyOn(ServiceFactory, "getServiceFor").mockReturnValue({
      check: async () => ({ validated: false, details: "nope", status: 400 }),
    } as any);

    const req: any = { body: { countryCode: "DE", vat: "DE000000000" } };
    const res = mkRes();

    await controller.validate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      validated: false,
      details: "nope",
      // kein status im Body – der Controller sendet ihn nicht zurück
    });
  });

  it("501 when downstream throws", async () => {
    jest.spyOn(VatService, "validateVATFormat").mockResolvedValue(true);
    jest.spyOn(ServiceFactory, "getServiceFor").mockReturnValue({
      check: async () => {
        throw new Error("boom");
      },
    } as any);

    const req: any = { body: { countryCode: "DE", vat: "DE123456789" } };
    const res = mkRes();

    await controller.validate(req, res);

    expect(res.status).toHaveBeenCalledWith(501);
    expect(res.json).toHaveBeenCalledWith({
      error: "Not implemented",
      details: expect.any(Error),
    });
  });
});
