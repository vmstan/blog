// Renders the author's current age into [data-whois-age] from its
// data-birth-date attribute. Loaded as an external file (same origin) so the
// site's Content-Security-Policy can forbid inline scripts entirely.
export function calculateAge(birthDate, today = new Date()) {
  const [birthYear, birthMonth, birthDay] = birthDate.split("-").map(Number);
  const birthdayHasPassed =
    today.getMonth() + 1 > birthMonth ||
    (today.getMonth() + 1 === birthMonth && today.getDate() >= birthDay);

  return today.getFullYear() - birthYear - (birthdayHasPassed ? 0 : 1);
}

export function updateAge(document = globalThis.document, today = new Date()) {
  const ageElement = document?.querySelector("[data-whois-age]");
  const birthDate = ageElement?.dataset.birthDate;

  if (ageElement && birthDate) {
    ageElement.textContent = String(calculateAge(birthDate, today));
  }
}

updateAge();
