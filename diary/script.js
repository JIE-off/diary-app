const addButton = document.getElementById('add-entry-btn');
const entryText = document.getElementById('entry-text');
const entriesContainer = document.getElementById('entries-container');

// Загрузка записей из localStorage
let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

document.addEventListener('DOMContentLoaded', () => {
    displayEntries();  // Отображаем записи при загрузке страницы
});

addButton.addEventListener('click', () => {
    const text = entryText.value.trim();

    if (text) {
        const newEntry = {
            id: Date.now(),
            text: text,
            date: new Date().toLocaleDateString()
        };

        entries.push(newEntry);
        entryText.value = '';  // Очистить поле ввода

        // Сохраняем записи в localStorage
        localStorage.setItem('diaryEntries', JSON.stringify(entries));

        displayEntries();
    }
});

// Функция отображения записей
function displayEntries() {
    entriesContainer.innerHTML = '';  // Очищаем контейнер перед добавлением новых записей

    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        
        const entryTextDiv = document.createElement('p');
        entryTextDiv.textContent = entry.text;
        
        const entryDate = document.createElement('div');
        entryDate.classList.add('date');
        entryDate.textContent = `Дата: ${entry.date}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => deleteEntry(entry.id));

        entryDiv.appendChild(entryTextDiv);
        entryDiv.appendChild(entryDate);
        entryDiv.appendChild(deleteButton);

        entriesContainer.appendChild(entryDiv);
    });
}

// Функция удаления записи
function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);

    // Обновляем записи в localStorage после удаления
    localStorage.setItem('diaryEntries', JSON.stringify(entries));

    displayEntries();
}
