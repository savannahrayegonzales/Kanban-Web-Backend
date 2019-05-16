/**
 * Data Validator Tester
 * 
 * @author Ruben Ruiz
 */

 const dataValidator = require("../data-validator"),
       assert        = require("assert");


function checkEmail() {
    describe('checkEmail()', function() {
        describe('#Straightforward', function() {
            describe('#sampleemail@gmail.com', function() {
                it('should return true', function() {
                  assert.ok(dataValidator.checkEmail("sampleemail@gmail.com"));
                });
            });
            describe('#ruben@outlook.com', function() {
                it('should return true', function() {
                  assert.ok(dataValidator.checkEmail("ruben@outlook.com"));
                });
            });
            describe('#johndoe@example.com', function() {
                it('should return true', function() {
                  assert.ok(dataValidator.checkEmail("johndoe@example.com"));
                });
            });
            describe('#@example.com', function() {
                it('should return false', function() {
                  assert.ok(!dataValidator.checkEmail("@example.com"));
                });
            });
            describe('#@gmail.com', function() {
                it('should return false', function() {
                  assert.ok(!dataValidator.checkEmail("@gmail.com"));
                });
            });
        });
        describe('#bizzarre', function() {
            describe('#ruben.s.ruiz@outlook.com', function() {
                it('should return true', function() {
                  assert.ok(dataValidator.checkEmail("ruben.s.ruiz@outlook.com"));
                });
            });
            describe('#sample@aol.com', function() {
                it('should return true', function() {
                  assert.ok(dataValidator.checkEmail("sample@aol.com"));
                });
            });
            describe('#ruben.ruiz48@k12.leanderisd.org', function() {
                it('should return true', function() {
                  assert.ok(dataValidator.checkEmail("uben.ruiz48@k12.leanderisd.org"));
                });
            });
            describe('#@aol.co', function() {
                it('should return false', function() {
                  assert.ok(!dataValidator.checkEmail("@aol.co"));
                });
            });
            describe('#@xmpl.cc', function() {
                it('should return false', function() {
                  assert.ok(!dataValidator.checkEmail("@xmp1.cc"));
                });
            });
        });
      });

}

// Exports
module.exports.checkEmail = checkEmail;