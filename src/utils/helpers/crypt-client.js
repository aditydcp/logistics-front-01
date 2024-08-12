export const encryptId = (id) => {
  const key = 'not so secret';
  return id.toString().split('').map((char, index) => 
    String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length))
  ).join('');
};

export const decryptId = (encryptedId) => {
  const key = 'not so secret';
  return encryptedId.split('').map((char, index) => 
    String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length))
  ).join('');
};