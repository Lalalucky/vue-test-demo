let axios = require('axios');
let MockAdapter = require('axios-mock-adapter');

import { Goods } from './goods.js';

export default {
  init() {
      var mock = new MockAdapter(axios)
      
      mock.onGet('/goods').reply(config => {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      goods: goods,
                      config: config.params
                  }])
              }, 500)
          })
      })
  }
}