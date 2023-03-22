import { getWarnings } from "./amoc";

// fix: describe should describe the function being tested, in this case getWarnings
// fix: unit tests should use mocks rather than actually hitting the API
// fix: tests are not ending properly, probably due to logging
describe("getting data", () => {
  // fix: this statement should be more specific "x warnings should be received"
  it("should download data", async () => {
    const warnings = await getWarnings();

    // fix: we should mock the response and say exactly the response that should be received
    expect(Object.keys(warnings).length).toBeGreaterThan(1);
  });

  // fix: this test name is the same as above but we should be specific about what we test
  // i.e. warnings should contain "IDQ11307.amoc.xml"
  it("should download data", async () => {
    const warnings = await getWarnings();

    expect(Object.keys(warnings)).toContain("IDQ11307.amoc.xml");
  });
});
