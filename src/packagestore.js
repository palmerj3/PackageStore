var PackageStore = function (args) {
  'use strict';

  var _encrypt = function (str) { return str; },
    _decrypt = function (str) { return str },
    _storageKey = 'PackageStore',
    _getContents = function() {
      var storage_contents = {};
      if (localStorage.getItem(_storageKey) !== null) {
        storage_contents = JSON.parse(_decrypt(localStorage.getItem(_storageKey)));
      }
      return storage_contents;
    };
  
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
      var storage_contents = _getContents();
      storage_contents[key] = value;
      return localStorage.setItem(_storageKey, _encrypt(JSON.stringify(storage_contents)));
    },

    getItem : function (key) {
      var storage_contents = _getContents();
      return typeof (storage_contents[key]) === 'undefined' ? null : storage_contents[key];
    },

    removeItem : function (key) {
      var storage_contents = _getContents();
      delete(storage_contents[key]);
      return localStorage.setItem(_storageKey, _encrypt(JSON.stringify(storage_contents)));
    },
    
    clear : function () {
      return localStorage.remove(_storageKey);
    },
    
    length : function () {
      var storage_contents = _getContents(),
        cnt = 0;
      for (var key in storage_contents) {
        if (storage_contents.hasOwnProperty(key)) {
          cnt += 1;
        }
      }
      return cnt;
    },
    
    key : function (i) {
      var storage_contents = _getContents(),
        cnt = 0;
      for (var key in storage_contents) {
        if (storage_contents.hasOwnProperty(key)) {
          if (cnt === i) {
            return key;
          }
          cnt += 1;
        }
      }
      return null;
    }
  }
};