function updateLegalDate() {
  const dateElement = document.getElementById("auto-update-date");
  if (!dateElement) return;

  const currentDate = new Date();
  
  const monthNamesEN = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"
  ];

  const currentMonth = monthNamesEN[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  dateElement.textContent = `${currentMonth} ${currentYear}`;
}

// Εκτέλεση κατά τη φόρτωση
document.addEventListener("DOMContentLoaded", () => {
  updateLegalDate();
});