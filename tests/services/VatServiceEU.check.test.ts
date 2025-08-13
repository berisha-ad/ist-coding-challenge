import { VatServiceEU } from "../../source/services/VatServiceEU.js";

const EU_URL =
  "https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number";

describe("VatServiceEU.check", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("returns validated=true when EU responds valid:true", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        valid: true,
        countryCode: "DE",
        vatNumber: "DE123456789",
      }),
    });

    const svc = new VatServiceEU();
    const res = await svc.check("DE" as any, "DE123456789" as any);

    expect(global.fetch).toHaveBeenCalledWith(
      EU_URL,
      expect.objectContaining({ method: "POST" })
    );
    expect(res).toEqual({
      validated: true,
      details: expect.any(String),
      status: 200,
    });
  });

  it("returns validated=false when EU responds valid:false", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        valid: false,
        countryCode: "DE",
        vatNumber: "DE123456789",
      }),
    });

    const svc = new VatServiceEU();
    const res = await svc.check("DE" as any, "DE123456789" as any);
    expect(res).toEqual({
      validated: false,
      details: expect.any(String),
      status: 400,
    });
  });

  it("throws if EU service not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    const svc = new VatServiceEU();
    await expect(svc.check("DE" as any, "DE123456789" as any)).rejects.toThrow(
      "EU service call failed"
    );
  });

  it("throws on network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("boom"));
    const svc = new VatServiceEU();
    await expect(svc.check("DE" as any, "DE123456789" as any)).rejects.toThrow(
      "EU service call failed"
    );
  });
});
