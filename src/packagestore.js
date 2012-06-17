var PackageStore = function (args) {
  'use strict';
  var _encrypt = function (str) { return str; },
    _decrypt = function (str) { return str },
    _storageKey = 'PackageStore';
  
  // Initialize params
  if (typeof (args) !== 'undefined') {
    if (typeof (args['storageKey']) !== 'undefined') {
      _storageKey = args['storageKey'];
    }

    if (typeof (args['encrypt']) === 'function') {
      _encrypt = args['encrypt'];
    }

    if (typeof (args['decrypt']) === 'function') {
      _decrypt = args['decrypt'];
    }
  }

  return {
    setItem : function (key, value) {
      var storage_contents = {};
      if (localStorage.getItem(_storageKey)) {
        storage_contents = JSON.parse(_decrypt(localStorage.getItem(_storageKey)));
      }
      storage_contents[key] = value;
      return localStorage.setItem(_storageKey, _encrypt(JSON.stringify(storage_contents)));
    },

    getItem : function (key) {
      var storage_contents = {};
      if (localStorage.getItem(_storageKey)) {
        storage_contents = JSON.parse(_decrypt(localStorage.getItem(_storageKey)));
      }
      return typeof (storage_contents[key]) === 'undefined' ? '' : storage_contents[key];
    },

    removeItem : function (key) {
      if (localStorage.getItem(_storageKey)) {
        var storage_contents = JSON.parse(_decrypt(localStorage.getItem(_storageKey)));
        delete(storage_contents[key]);
        return localStorage.setItem(_storageKey, _encrypt(JSON.stringify(storage_contents)));
      }
    },
    
    clear : function () {
      return localStorage.remove(_storageKey);
    },
    
    length : function () {
      var storage_contents = {},
        cnt = 0;
      if (localStorage.getItem(_storageKey)) {
        storage_contents = JSON.parse(_decrypt(localStorage.getItem(_storageKey)));
      }
      for (var key in storage_contents) {
        if (storage_contents.hasOwnProperty(key)) {
          cnt += 1;
        }
      }
      return cnt;
    }
  }
};