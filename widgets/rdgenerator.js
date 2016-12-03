exports.randomStringNumbers = function(strLength, charSet, qtd) {
	qtd = 1;
      var result = [];
    
      strLength = strLength || qtd;
      charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
      while (strLength--) {
        result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
      }
    
      return result.join('');
    }

exports.randomStringNumbersLower = function(strLength, charSet, qtd) {
	qtd = 1;
      var result = [];
    
      strLength = strLength || qtd;
      charSet = charSet || 'abcdefghijklmnopqrstuvwxyz0123456789';
    
      while (strLength--) {
        result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
      }
    
      return result.join('');
    }

exports.randomString = function(strLength, charSet, qtd) {
	qtd = 1;
      var result = [];
    
      strLength = strLength || qtd;
      charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
      while (strLength--) {
        result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
      }
    
      return result.join('');
    }

exports.randomStringLower = function(strLength, charSet, qtd) {
	qtd = 1;
      var result = [];
    
      strLength = strLength || qtd;
      charSet = charSet || 'abcdefghijklmnopqrstuvwxyz';
    
      while (strLength--) {
        result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
      }
    
      return result.join('');
    }

exports.randomNumbers = function(strLength, charSet, qtd) {
	  qtd = 1;
      var result = [];
    
      strLength = strLength || qtd;
      charSet = charSet || '0123456789';
    
      while (strLength--) {
        result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
      }
    
      return result.join('');
    }