describe("PackageStore", function() {
  var packageStoreUnencrypted,
      packageStoreEncrypted,
      unencryptedSettings = {
        'storageKey' : 'unencrypted'
      },
      encryptedSettings = {
        'storageKey' : 'encrypted',
        'encrypt' : function(str) {
          return str.split("").reverse().join("");
        },
        'decrypt' : function(str) {
          return str.split("").reverse().join("");
        }
      };

  beforeEach(function() {
    localStorage.clear();

    packageStoreUnencrypted = new PackageStore(unencryptedSettings);
    packageStoreEncrypted = new PackageStore(encryptedSettings);
  });

  it("should be able to store items", function() {
    // unencrypted storage of string
    packageStoreUnencrypted.setItem('test', 'test_value');
    expect(packageStoreUnencrypted.getItem('test')).toEqual('test_value');

    // encrypted storage of string
    packageStoreEncrypted.setItem('test', 'test_value');
    expect(packageStoreEncrypted.getItem('test')).toEqual('test_value');
  });
  
  it("should set and get unencrypted content", function() {
    packageStoreUnencrypted.setItem('test1', 'test_value1');
    packageStoreUnencrypted.setItem('test2', 'test_value2');
    packageStoreUnencrypted.setItem('test3', 'test_value3');
    packageStoreUnencrypted.setItem('test4', 'test_value4');
    packageStoreUnencrypted.setItem('test5', 'test_value5');

    expect(packageStoreUnencrypted.length()).toEqual(5);
  });
  
  it("should set and get encrypted content", function() {
    packageStoreEncrypted.setItem('test1', 'test_value1');
    packageStoreEncrypted.setItem('test2', 'test_value2');
    packageStoreEncrypted.setItem('test3', 'test_value3');
    packageStoreEncrypted.setItem('test4', 'test_value4');
    packageStoreEncrypted.setItem('test5', 'test_value5');

    expect(packageStoreEncrypted.length()).toEqual(5);
  });
  
  it("should support the key method", function() {
    packageStoreUnencrypted.setItem('test', 'test_value');
    packageStoreEncrypted.setItem('test', 'test_value');
    
    expect(packageStoreUnencrypted.key(0)).toEqual('test');
    expect(packageStoreEncrypted.key(0)).toEqual('test');
    
    expect(packageStoreUnencrypted.key(1)).toEqual(null);
    expect(packageStoreEncrypted.key(1)).toEqual(null);  
  });
  
  it("should handle non-existent keys gracefully", function() {
    expect(packageStoreUnencrypted.getItem('non-existant-key')).toEqual(null);
    expect(packageStoreEncrypted.getItem('none-existant-key')).toEqual(null);  
  });
  
  it("should handle storage of Numbers, Strings, Booleans, and Objects", function() {
    packageStoreUnencrypted.setItem('test_string', 'test_value');
    packageStoreUnencrypted.setItem('test_number', 5);
    packageStoreUnencrypted.setItem('test_boolean', false);
    packageStoreUnencrypted.setItem('test_object', { test : 'foo' });
    
    expect(packageStoreUnencrypted.getItem('test_string')).toEqual('test_value');
    expect(packageStoreUnencrypted.getItem('test_number')).toEqual(5);
    expect(packageStoreUnencrypted.getItem('test_boolean')).toEqual(false);
    expect(JSON.stringify(packageStoreUnencrypted.getItem('test_object'))).toEqual(JSON.stringify({ test : 'foo' }));
    
    packageStoreEncrypted.setItem('test_string', 'test_value');
    packageStoreEncrypted.setItem('test_number', 5);
    packageStoreEncrypted.setItem('test_boolean', false);
    packageStoreEncrypted.setItem('test_object', { test : 'foo' });
    
    expect(packageStoreEncrypted.getItem('test_string')).toEqual('test_value');
    expect(packageStoreEncrypted.getItem('test_number')).toEqual(5);
    expect(packageStoreEncrypted.getItem('test_boolean')).toEqual(false);
    expect(JSON.stringify(packageStoreEncrypted.getItem('test_object'))).toEqual(JSON.stringify({ test : 'foo' }));
  });
  
  it('Should remove items', function() {
    packageStoreUnencrypted.setItem('test_string', 'test_value');
    packageStoreEncrypted.setItem('test_string', 'test_value');
    
    packageStoreUnencrypted.removeItem('test_string');
    packageStoreEncrypted.removeItem('test_string');
    
    expect(packageStoreUnencrypted.getItem('test_string')).toEqual(null);
    expect(packageStoreEncrypted.getItem('test_string')).toEqual(null);
  });
  
  it('Should clear', function() {
    packageStoreUnencrypted.setItem('test_string', 'test_value');
    packageStoreEncrypted.setItem('test_string', 'test_value');
    
    packageStoreUnencrypted.clear();
    packageStoreEncrypted.clear();
    
    expect(packageStoreUnencrypted.getItem('test_string')).toEqual(null);
    expect(packageStoreEncrypted.getItem('test_string')).toEqual(null);
    
    expect(packageStoreUnencrypted.length()).toEqual(0);
    expect(packageStoreEncrypted.length()).toEqual(0);
  });
  
  it('Should play nicely with other instances using different storage keys', function() {
    packageStoreUnencrypted.setItem('test_string', 'test_value');
    packageStoreEncrypted.setItem('test_string', 'test_value1');
    
    expect(packageStoreUnencrypted.getItem('test_string')).toEqual('test_value');
    expect(packageStoreEncrypted.getItem('test_string')).toEqual('test_value1');
  });
});