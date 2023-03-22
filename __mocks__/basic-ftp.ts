import listData from './ClientListData.json'

export const Client = class {
  constructor() {}
  ftp = {
    verbose: false
  }
  list() {
    return listData
  }
  access() { }
  cd() { }
  close() { }
  downloadTo() {}
}
