document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const seatsContainer = document.querySelector('.seats');
    const selectedSeatsSpan = document.getElementById('selected-seats');
    const bookButton = document.getElementById('book-button');

    // Инициализация доступных дат
    const today = new Date();
    const availableDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        availableDates.push(date.toISOString().slice(0, 10));
    }

    // Заполнение поля даты
    dateInput.value = availableDates[0];

    // Загрузка данных из localStorage
    let bookingData = JSON.parse(localStorage.getItem('bookingData')) || {};

    // Функция для отображения мест
    function renderSeats(date, time) {
        seatsContainer.innerHTML = ''; // Очищаем контейнер мест

        // Создание мест
        const seats = [];
        for (let i = 0; i < 20; i++) {
            seats.push(i);
        }

        // Отображение мест
        seats.forEach(seat => {
            const seatElement = document.createElement('div');
            seatElement.classList.add('seat');
            seatElement.dataset.seat = seat;

            // Проверка статуса места (свободно, забронировано)
            const bookingKey = `${date}-${time}`;
            if (bookingData[bookingKey] && bookingData[bookingKey].includes(seat)) {
                seatElement.classList.add('booked');
            } else {
                seatElement.addEventListener('click', function() {
                    toggleSeatSelection(seat, date, time);
                });
            }
            seatsContainer.appendChild(seatElement);
        });
    }

    // Функция для переключения выбора места
    function toggleSeatSelection(seat, date, time) {
        const seatElement = document.querySelector(`.seat[data-seat="${seat}"]`);

        if (seatElement.classList.contains('selected')) {
            seatElement.classList.remove('selected');
        } else {
            seatElement.classList.add('selected');
        }

        // Обновление списка выбранных мест
        updateSelectedSeats(date, time);
    }

    // Функция для обновления списка выбранных мест
    function updateSelectedSeats(date, time) {
        const selectedSeats = [];
        const seats = document.querySelectorAll('.seat.selected');
        seats.forEach(seat => {
            selectedSeats.push(parseInt(seat.dataset.seat));
        });

        selectedSeatsSpan.textContent = selectedSeats.join(', ');

        // Обновление данных в localStorage
        const bookingKey = `${date}-${time}`;
        bookingData[bookingKey] = selectedSeats;
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
    }

    // Обработчик события выбора даты
    dateInput.addEventListener('change', function() {
        renderSeats(dateInput.value, timeSelect.value);
        updateSelectedSeats(dateInput.value, timeSelect.value);
    });

    // Обработчик события выбора времени
    timeSelect.addEventListener('change', function() {
        renderSeats(dateInput.value, timeSelect.value);
        updateSelectedSeats(dateInput.value, timeSelect.value);
    });

    // Обработчик события бронирования
    bookButton.addEventListener('click', function() {
        // TODO: Реализация функционала бронирования
        // Например, отправка данных на сервер или сохранение в localStorage
        alert('Билеты забронированы!');
    });

    // Инициализация отображения мест
    renderSeats(dateInput.value, timeSelect.value);
});