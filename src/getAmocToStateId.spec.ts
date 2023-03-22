import { getAmocToStateId } from "./getAmocToStateId";

describe("getAmocToStateId", () => {
  test("it should return correct code for all states", () => {
    expect(getAmocToStateId("NT")).toEqual("IDD");
    expect(getAmocToStateId("NSW")).toEqual("IDN");
    expect(getAmocToStateId("QLD")).toEqual("IDQ");
    expect(getAmocToStateId("SA")).toEqual("IDS");
    expect(getAmocToStateId("TAS")).toEqual("IDT");
    expect(getAmocToStateId("VIC")).toEqual("IDV");
    expect(getAmocToStateId("WA")).toEqual("IDW");
    expect(getAmocToStateId("ACT")).toEqual("IDN");
  });

  test('it should return "unk" for a invalid state', () => {
    expect(getAmocToStateId('notastate')).toEqual('unk')
  })

  test('it should expect any capitalisation', () => {
    expect(getAmocToStateId("VIC")).toEqual("IDV");
    expect(getAmocToStateId("vic")).toEqual("IDV");
    expect(getAmocToStateId("ViC")).toEqual("IDV");
  })
});
