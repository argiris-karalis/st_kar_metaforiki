    function updateLegalDate() {
    const dateElement = document.getElementById("auto-update-date");
    if (!dateElement) return;

    const currentDate = new Date();
    
    // Παίρνουμε τον μήνα στα ελληνικά (π.χ. "Αυγούστου" -> τον κάνουμε "Αύγουστος" ή ονομαστική)
    const monthNamesGR = [
        "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", 
        "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", 
        "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
    ];

    const currentMonth = monthNamesGR[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    dateElement.textContent = `${currentMonth} ${currentYear}`;
    }

    // Εκτέλεση κατά τη φόρτωση της σελίδας
    document.addEventListener("DOMContentLoaded", () => {
    updateLegalDate();
    });