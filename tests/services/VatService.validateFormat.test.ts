import { VatService } from "../../source/services/VatService.js";

describe("VatService.validateVATFormat", () => {
  it("accepts correct DE format", async () => {
    await expect(
      VatService.validateVATFormat("DE" as any, "DE123456789" as any)
    ).resolves.toBe(true);
  });

  it("rejects invalid format", async () => {
    await expect(
      VatService.validateVATFormat("DE" as any, "DE123" as any)
    ).resolves.toBe(false);
  });

  it("throws on unknown country code", async () => {
    await expect(
      VatService.validateVATFormat("XX" as any, "XX123456789" as any)
    ).rejects.toThrow("Falscher Country Code");
  });
});
