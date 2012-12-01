PackageStore
============

A JavaScript library that allows for flexible storage of data in a secure manner.
The interface to store variables is exactly the same as localStorage.

All variables are persisted in a single localStorage variable, which can be optionally encrypted with the algorithm of your choice.

Simple Example:
```
var packagestore = new PackageStore({
  'storageKey' : 'HighlyRecommendYouChangeThis'
});

packagestore.setItem('my_variable', 'Hello world!');
console.log(packagestore.getItem('my_variable'));
```

With Encryption:
```
var packagestore = new PackageStore({
  'storageKey' : 'HighlyRecommendYouChangeThis',
  'encrypt' : function(str) {
    return window.btoa(str);
  },
  'decrypt' : function(str) {
    return window.atob(str);
  }
});

packagestore.setItem('my_variable', 'Hello world!');
console.log(packagestore.getItem('my_variable'));
```

To run the tests:
```
Open the file tests/SpecRunner.html in your browser
```