let localStorageService = {
  set: function (key, dataUser) {
    let dataJson = JSON.stringify(dataUser);
    localStorage.setItem(key, dataJson);
  },
  remove: function (key) {
    localStorage.removeItem(key);
  },
  get: function (key) {
    return localStorage.getItem(key);
  },
};

export default localStorageService;
