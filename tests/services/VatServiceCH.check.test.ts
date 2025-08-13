import { VatServiceCH } from "../../source/services/VatServiceCH.js";

describe("VatServiceCH.check", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  const ok = (xml: string) => ({ ok: true, text: async () => xml });
  const notOk = () => ({ ok: false, text: async () => "" });

  it("returns validated=true on SOAP true", async () => {
    const xml = `<?xml version="1.0"?><Envelope><Body><ValidateVatNumberResponse><ValidateVatNumberResult>true</ValidateVatNumberResult></ValidateVatNumberResponse></Body></Envelope>`;
    (global.fetch as jest.Mock).mockResolvedValue(ok(xml));

    const svc = new VatServiceCH();
    const res = await svc.check("CH", "CHE-123.456.789");
    expect(res).toEqual({
      validated: true,
      details: expect.any(String),
      status: 200,
    });
  });

  it("returns validated=false on SOAP false", async () => {
    const xml = `<?xml version="1.0"?><Envelope><Body><ValidateVatNumberResponse><ValidateVatNumberResult>false</ValidateVatNumberResult></ValidateVatNumberResponse></Body></Envelope>`;
    (global.fetch as jest.Mock).mockResolvedValue(ok(xml));

    const svc = new VatServiceCH();
    const res = await svc.check("CH", "CHE-123.456.789");
    expect(res).toEqual({
      validated: false,
      details: expect.any(String),
      status: 400,
    });
  });

  it("throws if response not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValue(notOk());
    const svc = new VatServiceCH();
    await expect(svc.check("CH", "CHE-123.456.789")).rejects.toThrow(
      "CH service call failed"
    );
  });

  it("throws if SOAP result not found", async () => {
    const xml = `<?xml version="1.0"?><Envelope><Body><Nope/></Body></Envelope>`;
    (global.fetch as jest.Mock).mockResolvedValue(ok(xml));
    const svc = new VatServiceCH();
    await expect(svc.check("CH", "CHE-123.456.789")).rejects.toThrow(
      "CH service call failed"
    );
  });
});
