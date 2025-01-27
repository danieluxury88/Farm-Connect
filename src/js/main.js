// // dom ready listener
// document.addEventListener('DOMContentLoaded', function() {
//     // your code here
//     console.log('dom ready');
// });
// console.log('main.js loaded');

import { syncRecordsToServer } from './syncService.js';

// Attempt to sync stored data when the app goes online
window.addEventListener('online', async () => {
    console.log('Internet connection restored. Attempting to sync...');
    await syncRecordsToServer();
});


if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('/public/service-worker.js').then(registration => {
        console.log('Service Worker Registered');
    });
}


import { addWeightRecord, getWeightRecords } from './weightService.js';

document.getElementById('record-form').onsubmit = async (event) => {
    event.preventDefault();
    const animal_id = document.getElementById('animal_id').value;
    const weight = document.getElementById('weight').value;
    const date = document.getElementById('date').value;

    await addWeightRecord(animal_id, weight, date);
    alert('Record saved successfully!');

    displayRecords();
};

// Display stored records on page load
async function displayRecords() {
    const records = await getWeightRecords();
    const listElement = document.getElementById('record-list');
    listElement.innerHTML = '';
    records.forEach(record => {
        const listItem = document.createElement('li');
        listItem.textContent = `Animal ${record[1]}, Weight: ${record[2]} kg, Date: ${record[3]}`;
        listElement.appendChild(listItem);
    });
}
displayRecords();


