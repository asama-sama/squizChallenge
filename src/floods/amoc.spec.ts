import { getWarnings } from "./amoc";
jest.mock('basic-ftp')

describe("getWarnings", () => {
  it("should return all warnings from the api", async () => {
    const warnings = await getWarnings();
    expect(Object.keys(warnings).length).toBe(394);
  });

  it("should return the correct warning keys", async () => {
    const warnings = await getWarnings();

    expect(Object.keys(warnings)).toContain("IDQ11307.amoc.xml");
  });
});
