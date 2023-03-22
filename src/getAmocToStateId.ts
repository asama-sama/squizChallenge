enum Amoc {
  "IDD" = "IDD",
  "IDN" = "IDN",
  "IDQ" = "IDQ",
  "IDS" = "IDS",
  "IDT" = "IDT",
  "IDV" = "IDV",
  "IDW" = "IDW",
  "unk" = "unk"
}
export function getAmocToStateId(state: string): Amoc {
  state = state.toUpperCase()
  switch (state) {
    case "NT":
      return Amoc.IDD;
    case "NSW":
      return Amoc.IDN;
    case "QLD":
      return Amoc.IDQ;
    case "SA":
      return Amoc.IDS;
    case "TAS":
      return Amoc.IDT;
    case "VIC":
      return Amoc.IDV;
    case "WA":
      return Amoc.IDW;
    case "ACT":
      return Amoc.IDN;
  }

  return Amoc.unk;
}
