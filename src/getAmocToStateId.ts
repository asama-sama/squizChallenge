// fix: document the intention of this function
// fix: update input and output types to use enums rather than strings since the output is well known
export function getAmocToStateId(state: string): string {
  // fix: call to uppercase on state to ensure input is in caps
  switch (state) {
    case "NT":
      return "IDD";
    case "NSW":
      return "IDN";
    case "Qld": // fix: make all caps to be consistent with rest
      return "IDQ";
    case "SA":
      return "IDS";
    case "Tas":
      return "IDT";
    case "Vic": // fix: make all caps to be consistent with rest
      return "IDV";
    case "WA":
      return "IDW";
    case "ACT":
      return "IDN";
  }

  return "unk";
}
