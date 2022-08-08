module.exports = class FDDB {
  constructor(path, {autoWrite = false, debug = false, serialize = JSON.stringify}) {
    // require fs module
    try {
      this.fsw = require('fs').writeFileSync
    } catch (err) {
      console.error(`[FDDB] 'fs' - 'MODULE_NOT_FOUND'`)
      throw "'fs' - 'MODULE_NOT_FOUND'"
    }

    // register path of db
    this.path = `${__dirname}/${path}`;
    
    // importing db file
    try {
      this.db = require(this.path);
      debug && console.log(`[FDDB] Loaded - '${path}'`)
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        debug && console.error(`[FDDB] '${path}' - 'MODULE_NOT_FOUND' and create empty {}`)
        this.db = {}
      } else {
        debug && console.error('[FDDB] unexpected error',error)
      }
    }

    // register serialize method
    this.serialize = serialize
    // setup auto write mode
    this.AW = autoWrite
  }
  set(id, value) {
    this.db[id] = value;
    this.AWC()
  }
  get(id) {
    if (this.db[id]) {
      return this.db[id];
    } else {
      return false;
    }
  }
  del(id) {
    if (this.db[id]) {
      delete this.db[id];
      this.AWC()
      return true;
    } else {
      return false;
    }
  }
  has(id) {
    return this.db[id] ? true : false;
  }
  AWM(bool){
    if(bool === "get") {
      return this.AW;
    } else if (typeof(bool) === "boolean") {
      this.AW = bool
    } else this.AW = !this.AW;
    return this.AW
  }
  AWC() {
    this.AW && this.write();
  }
  write() {
    this.fsw(this.path, this.serialize(this.db));
  }
  keys() {
    return Object.keys(this.db);
  }
  find(callback) {
    return this.db.find(callback);
  }
}