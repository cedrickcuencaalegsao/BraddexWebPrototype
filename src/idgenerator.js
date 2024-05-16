export function generateRandomID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 15; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${randomString.slice(0, 5)}-${randomString.slice(5, 10)}-${randomString.slice(10, 15)}`;
}