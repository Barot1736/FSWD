// Local Storage Manager for Income Calculator
class IncomeStorage {
    constructor() {
        this.storageKey = 'incomeCalculations';
        this.currentDataKey = 'currentIncomeData';
    }

    // Save current form data (for auto-save functionality)
    saveCurrentData(income1, income2) {
        const data = {
            income1: income1 || '',
            income2: income2 || '',
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(this.currentDataKey, JSON.stringify(data));
    }

    // Load current form data
    loadCurrentData() {
        const stored = localStorage.getItem(this.currentDataKey);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing stored data:', e);
                return { income1: '', income2: '' };
            }
        }
        return { income1: '', income2: '' };
    }

    // Save calculation result to history
    saveCalculation(income1, income2, total) {
        const calculation = {
            id: Date.now(), // Simple ID based on timestamp
            income1: parseFloat(income1),
            income2: parseFloat(income2),
            total: parseFloat(total),
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        let calculations = this.getCalculations();
        calculations.unshift(calculation); // Add to beginning of array
        
        // Keep only last 50 calculations to prevent storage bloat
        if (calculations.length > 50) {
            calculations = calculations.slice(0, 50);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(calculations));
        return calculation;
    }

    // Get all saved calculations
    getCalculations() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing calculations:', e);
                return [];
            }
        }
        return [];
    }

    // Delete a specific calculation by ID
    deleteCalculation(id) {
        let calculations = this.getCalculations();
        calculations = calculations.filter(calc => calc.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(calculations));
    }

    // Clear all calculations
    clearAllCalculations() {
        localStorage.removeItem(this.storageKey);
    }

    // Clear current form data
    clearCurrentData() {
        localStorage.removeItem(this.currentDataKey);
    }

    // Get storage statistics
    getStorageStats() {
        const calculations = this.getCalculations();
        const totalCalculations = calculations.length;
        const totalIncome = calculations.reduce((sum, calc) => sum + calc.total, 0);
        const averageIncome = totalCalculations > 0 ? totalIncome / totalCalculations : 0;

        return {
            totalCalculations,
            totalIncome: totalIncome.toFixed(2),
            averageIncome: averageIncome.toFixed(2)
        };
    }
}

// Create global instance
const incomeStorage = new IncomeStorage();

// Form auto-save functionality
function setupAutoSave() {
    const income1Input = document.getElementById('income1');
    const income2Input = document.getElementById('income2');

    if (income1Input && income2Input) {
        // Load saved data on page load
        const savedData = incomeStorage.loadCurrentData();
        if (savedData.income1) income1Input.value = savedData.income1;
        if (savedData.income2) income2Input.value = savedData.income2;

        // Auto-save on input change
        income1Input.addEventListener('input', () => {
            incomeStorage.saveCurrentData(income1Input.value, income2Input.value);
        });

        income2Input.addEventListener('input', () => {
            incomeStorage.saveCurrentData(income1Input.value, income2Input.value);
        });
    }
}

// Display calculation history
function displayCalculationHistory() {
    const historyContainer = document.getElementById('calculation-history');
    if (!historyContainer) return;

    const calculations = incomeStorage.getCalculations();
    
    if (calculations.length === 0) {
        historyContainer.innerHTML = '<p>No calculations saved yet.</p>';
        return;
    }

    let historyHTML = '<h3>History</h3>';

    historyHTML += '<div class="history-list">';
    calculations.forEach(calc => {
        historyHTML += `
            <div class="history-item" data-id="${calc.id}">
                <div class="history-content">
                    <p><strong>Date:</strong> ${calc.date} at ${calc.time}</p>
                    <p><strong>Income 1:</strong> $${calc.income1.toFixed(2)}</p>
                    <p><strong>Income 2:</strong> $${calc.income2.toFixed(2)}</p>
                    <p><strong>Total:</strong> $${calc.total.toFixed(2)}</p>
                </div>
                <button class="delete-btn" onclick="deleteCalculation(${calc.id})">Delete</button>
            </div>
        `;
    });
    historyHTML += '</div>';

    historyHTML += '<button class="clear-all-btn" onclick="clearAllHistory()">Clear All History</button>';

    historyContainer.innerHTML = historyHTML;
}

// Delete a single calculation
function deleteCalculation(id) {
    if (confirm('Are you sure you want to delete this calculation?')) {
        incomeStorage.deleteCalculation(id);
        displayCalculationHistory(); // Refresh the display
    }
}

// Clear all calculation history
function clearAllHistory() {
    if (confirm('Are you sure you want to clear all calculation history? This action cannot be undone.')) {
        incomeStorage.clearAllCalculations();
        displayCalculationHistory(); // Refresh the display
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupAutoSave();
    displayCalculationHistory();
});