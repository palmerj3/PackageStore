PackageStore
============

A JavaScript library that allows for flexible storage of data in a secure manner.
The interface to store variables is exactly the same as localStorage.

Simple Example:
```
var packagestore = new PackageStore();
packagestore.init();

packagestore.setItem('my_variable', 'Hello world!');
console.log(packagestore.getItem('my_variable'));
```

With Encryption:
```
var packagestore = new PackageStore();
packagestore.init();

packagestore.settings.encrypt = function(str) {
  return window.btoa(str);
}
packagestore.settings.decrypt = function(str) {
  return window.atob(str);
}

packagestore.setItem('my_variable', 'Hello world!');
console.log(packagestore.getItem('my_variable'));
```