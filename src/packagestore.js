var PackageStore = function () {
  'use strict';

  var _storageKey = null,
    _encrypt = null,
    _decrypt = null,
    _store = function (key, value) {
      var storage_contents = {};
      if (localStorage.getItem(_storageKey)) {
        storage_contents = JSON.parse(_decrypt(localStorage.getItem(_storageKey)));
      }
      storage_contents[key] = value;
      return localStorage.setItem(_storageKey, _encrypt(JSON.stringify(storage_contents)));
    },
    _retrieve = function (key) {
      var storage_contents = {};
      if (localStorage.getItem(_storageKey)) {
        storage_contents = JSON.parse(_decrypt(localStorage.getItem(_storageKey)));
      }
      return typeof (storage_contents[key]) === 'undefined' ? '' : storage_contents[key];
    };

  return {
    settings : {
      storageKey : 'I_Highly_Recommend_Changing_This',
      encrypt : function (str) { return str;  },
      decrypt : function (str) { return str; }
    },

    setItem : function (key, value) {
      return _store(key, value);
    },

    getItem : function (key) {
      return _retrieve(key);
    },

    init : function () {
      _storageKey = this.settings.storageKey;
      _encrypt = this.settings.encrypt;
      _decrypt = this.settings.decrypt;
    }
  };
};