const clearToken = (token) => {
    if (token) {
      return token.replace("Bearer ", "");
    }
    return null;
  };
  
  module.exports = clearToken;
  