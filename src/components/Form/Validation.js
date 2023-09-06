export function currentDateString() {
  const date = new Date();
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 + "").padStart(2, "0") +
    "-" +
    (date.getDate() + "").padStart(2, "0")
  );
}
export function emailValidation(email) {
  const validEmailregex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  if (email === "" || !(validEmailregex.test(email))) {
    return false;
  }
  return true;
}
export function nameValidation(name) {
  const validCharregex = /^[A-Za-z]+$/;
  if (name === "") return false;
  if(validCharregex.test(name)) return true;
  return false;
}
export function mobileValidation(mobileNumber) {
  const validNumber = /^[0-9]*$/;
  if (mobileNumber === "") return false;
  if (validNumber.test(mobileNumber) && (mobileNumber.length == 10)) {
    return true;
  }
  return false;
}
export function addressValidation(address) {
  if (address === "" || address.length > 50) return false;
  return true;
}
export function dateValidation(date) {
  if (date) {
    return true;
  }
  return false;
}
