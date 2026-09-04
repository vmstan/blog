// Renders the author's current age into [data-whois-age] from its
// data-birth-date attribute. Loaded as an external file (same origin) so the
// site's Content-Security-Policy can forbid inline scripts entirely.
const ageElement = document.querySelector("[data-whois-age]");
const birthDate = ageElement?.dataset.birthDate;

if (ageElement && birthDate) {
  const [birthYear, birthMonth, birthDay] = birthDate.split("-").map(Number);
  const today = new Date();
  const birthdayHasPassed =
    today.getMonth() + 1 > birthMonth ||
    (today.getMonth() + 1 === birthMonth && today.getDate() >= birthDay);
  const age = today.getFullYear() - birthYear - (birthdayHasPassed ? 0 : 1);

  ageElement.textContent = String(age);
}
