export class ChannelUpdateTimeRegistry {
  constructor() {
    this._storage = {};
  }

  get(key){
    return this._storage[key];
  }

  addOrUpdate(key, value){
    this._storage[key] = value;
  }
}