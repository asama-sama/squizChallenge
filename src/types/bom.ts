export type ParsedWarning = {
  amoc: {
    source: {
      sender: string,
      region: string,
      office: string,
      copyright: string,
      disclaimer: string
    },
    identifier: string,
    'issue-time-utc': string,
    'issue-time-local': string,
    'sent-time': string,
    'expiry-time': string,
    'validity-bgn-time-local': string,
    'validity-end-time-local ': string,
    'next-routine-issue-time-utc': string,
    'next-routine-issue-time-local': string,
    'status': string,
    'service': string,
    'sub-service': string,
    'product-type': string,
    'phase': string,
  }
}