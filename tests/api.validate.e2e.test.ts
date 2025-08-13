import request from "supertest";
import { VatService } from "../source/services/VatService.js";
import { ServiceFactory } from "../source/services/ServiceFactory.js";
import createApp from "../source/server.js";

const configuration: any = {
  port: 0,
  expressServerOptions: {
    keepAliveTimeout: 5000,
    maxHeadersCount: 2000,
    maxConnections: 100,
    headersTimeout: 60000,
    requestTimeout: 60000,
    timeout: 60000,
  },
};

describe("POST /validate (e2e)", () => {
  const { app } = createApp(configuration);

  it("200 for valid DE VAT via EU service", async () => {
    jest.spyOn(VatService, "validateVATFormat").mockResolvedValue(true);
    jest.spyOn(ServiceFactory, "getServiceFor").mockReturnValue({
      check: async () => ({ validated: true, details: "ok", status: 200 }),
    } as any);

    const res = await request(app)
      .post("/validate")
      .send({ countryCode: "DE", vat: "DE123456789" })
      .set("content-type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ validated: true, details: "ok" });
  });

  it("400 for invalid VAT format (pre-call gate)", async () => {
    jest.spyOn(VatService, "validateVATFormat").mockResolvedValue(false);

    const res = await request(app)
      .post("/validate")
      .send({ countryCode: "DE", vat: "DE123" })
      .set("content-type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "This VAT format is invalid" });
  });

  it("501 when downstream errors", async () => {
    jest.spyOn(VatService, "validateVATFormat").mockResolvedValue(true);
    jest.spyOn(ServiceFactory, "getServiceFor").mockReturnValue({
      check: async () => {
        throw new Error("boom");
      },
    } as any);

    const res = await request(app)
      .post("/validate")
      .send({ countryCode: "DE", vat: "DE123456789" })
      .set("content-type", "application/json");

    expect(res.status).toBe(501);
    expect(res.body).toEqual({
      error: "Not implemented",
      details: expect.any(Object),
    });
  });
});
