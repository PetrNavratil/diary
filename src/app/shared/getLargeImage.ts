export function getLargeImage(url: string): string {
  let myIndex = url.lastIndexOf('/') -1;
  let newUrl = url.split('').map((char, index) => {
    if(index === myIndex){
      return 'l';
    } else {
      return char;
    }
  }).join('');
  return newUrl;
}
