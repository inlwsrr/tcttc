document.addEventListener("DOMContentLoaded", function () {
    let audios = [
        {
            audio: document.getElementById("audio1"),
            playBtn: document.getElementById("playPause1"),
            seekBar: document.getElementById("seekBar1"),
            volumeBar: document.getElementById("volume1"),
            currentTimeElem: document.getElementById("currentTime1"),
            durationElem: document.getElementById("duration1")
        },
        {
            audio: document.getElementById("audio2"),
            playBtn: document.getElementById("playPause2"),
            seekBar: document.getElementById("seekBar2"),
            volumeBar: document.getElementById("volume2"),
            currentTimeElem: document.getElementById("currentTime2"),
            durationElem: document.getElementById("duration2")
        },
        {
            audio: document.getElementById("audio3"),
            playBtn: document.getElementById("playPause3"),
            seekBar: document.getElementById("seekBar3"),
            volumeBar: document.getElementById("volume3"),
            currentTimeElem: document.getElementById("currentTime3"),
            durationElem: document.getElementById("duration3")
        },
        {
            audio: document.getElementById("audio4"),
            playBtn: document.getElementById("playPause4"),
            seekBar: document.getElementById("seekBar4"),
            volumeBar: document.getElementById("volume4"),
            currentTimeElem: document.getElementById("currentTime4"),
            durationElem: document.getElementById("duration4")
        }
    ];

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    }

    function updateProgress(audioObj) {
        const { audio, seekBar, currentTimeElem, durationElem } = audioObj;
        seekBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeElem.textContent = formatTime(audio.currentTime);
        durationElem.textContent = formatTime(audio.duration || 0);
    }

    function handleSeekBar(audioObj) {
        audioObj.seekBar.addEventListener('input', function () {
            audioObj.audio.currentTime = (audioObj.seekBar.value / 100) * audioObj.audio.duration;
        });
    }

    function handleVolume(audioObj) {
        audioObj.volumeBar.addEventListener('input', function () {
            audioObj.audio.volume = audioObj.volumeBar.value / 100;
        });
    }

    function togglePlayPause(audioObj) {
        audioObj.playBtn.addEventListener('click', function () {
            if (audioObj.audio.paused) {
                pauseAllExcept(audioObj.audio);
                audioObj.audio.play();
                audioObj.playBtn.textContent = '❚❚';
                showControls(audioObj);
            } else {
                audioObj.audio.pause();
                audioObj.playBtn.textContent = '►';
            }
        });
    }

    function pauseAllExcept(currentAudio) {
        audios.forEach(function (audioObj) {
            if (audioObj.audio !== currentAudio) {
                audioObj.audio.pause();
                audioObj.playBtn.textContent = '►';
            }
        });
    }

    function showControls(audioObj) {
        audioObj.seekBar.classList.remove('hidden');
        audioObj.volumeBar.classList.remove('hidden');
        audioObj.currentTimeElem.parentElement.classList.remove('hidden');
    }

    audios.forEach(function (audioObj) {
        togglePlayPause(audioObj);
        handleSeekBar(audioObj);
        handleVolume(audioObj);

        audioObj.audio.addEventListener('timeupdate', function () {
            updateProgress(audioObj);
        });

        // Скрываем элементы управления до начала воспроизведения
        audioObj.seekBar.classList.add('hidden');
        audioObj.volumeBar.classList.add('hidden');
        audioObj.currentTimeElem.parentElement.classList.add('hidden');
    });








// Открытие и закрытие модальных окон для раздела About
    const modalButtons = document.querySelectorAll('.open-modal-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn');

// Обработчик для открытия модальных окон
    modalButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'flex'; // Открываем модальное окно
        });
    });

// Обработчик для закрытия модальных окон по клику на крестик
    closeButtons.forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            modal.style.display = 'none'; // Закрываем модальное окно
        });
    });

// Закрытие модального окна при клике вне области контента
    modals.forEach(function (modal) {
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none'; // Закрываем при клике вне контента
            }
        });
    });







    // Модальные окна
    const modal = document.getElementById('productModal');
    const modalImgFront = document.getElementById('modalImg'); // Изображение спереди
    const modalImgBack = document.getElementById('modalImgBack'); // Изображение сзади
    const span = document.getElementsByClassName('close')[0];

// Стрелки для переключения изображений
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

// Получаем все изображения продуктов
    const products = document.querySelectorAll('.product');

// Переменные для текущего изображения и его индекса
    let currentIndex = 0;
    let currentImages = [];

// Добавляем обработчик событий на клик по каждому продукту
    products.forEach(function (product) {
        product.addEventListener('click', function () {
            const imgSrcFront = this.getAttribute('data-front'); // Получаем путь к изображению спереди
            const imgSrcBack = this.getAttribute('data-back'); // Получаем путь к изображению сзади

            currentImages = [imgSrcFront, imgSrcBack]; // Массив с двумя изображениями
            currentIndex = 0; // Начинаем с первого изображения (вид спереди)

            modal.style.display = 'block'; // Показываем модальное окно

            // Очищаем src перед установкой нового значения для корректной загрузки
            modalImgFront.src = '';
            modalImgBack.src = '';

            setTimeout(() => {
                modalImgFront.src = currentImages[0]; // Устанавливаем изображение спереди
                modalImgBack.src = currentImages[1]; // Устанавливаем изображение сзади, но оно будет скрыто

                // Всегда показываем изображение спереди при открытии
                modalImgFront.style.display = 'block';
                modalImgBack.style.display = 'none'; // Скрываем вид сзади
            }, 100); // Небольшая задержка для плавного обновления изображения
        });
    });

// Закрытие модального окна при клике на крестик
    span.onclick = function () {
        modal.style.display = 'none';

        // Сброс видимости изображений для следующего открытия
        modalImgFront.style.display = 'block';
        modalImgBack.style.display = 'none';
    };

// Закрытие модального окна при клике вне изображения
    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';

            // Сброс видимости изображений для следующего открытия
            modalImgFront.style.display = 'block';
            modalImgBack.style.display = 'none';
        }
    };

// Переключение между изображениями (спереди/сзади)
    next.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % currentImages.length;
        if (currentIndex === 0) {
            modalImgFront.style.display = 'block';
            modalImgBack.style.display = 'none';
        } else {
            modalImgFront.style.display = 'none';
            modalImgBack.style.display = 'block';
        }
    });

    prev.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        if (currentIndex === 0) {
            modalImgFront.style.display = 'block';
            modalImgBack.style.display = 'none';
        } else {
            modalImgFront.style.display = 'none';
            modalImgBack.style.display = 'block';
        }
    });

});












// Elements for registration modal
const rgModal = document.getElementById("registrationModal");
const rgBtnOpen = document.getElementById("openRgModal");
const rgBtnClose = document.getElementById("closeRgModal");

// Elements for login modal
const loginModal = document.getElementById("loginModal");
const loginBtnOpen = document.getElementById("openLoginModal");
const loginBtnClose = document.getElementById("closeLoginModal");

// Open and close registration modal
function openRgModal() {
    rgModal.style.display = "block";
}
function closeRgModal() {
    rgModal.style.display = "none";
}

// Open and close login modal
function openLoginModal() {
    loginModal.style.display = "block";
}
function closeLoginModal() {
    loginModal.style.display = "none";
}

// Event listeners for registration modal
rgBtnOpen.addEventListener("click", openRgModal);
rgBtnClose.addEventListener("click", closeRgModal);

// Event listeners for login modal
loginBtnOpen.addEventListener("click", openLoginModal);
loginBtnClose.addEventListener("click", closeLoginModal);

// Close modals if clicked outside
window.addEventListener("click", function(event) {
    if (event.target === rgModal) {
        closeRgModal();
    } else if (event.target === loginModal) {
        closeLoginModal();
    }
});

// Registration form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if user already exists in localStorage
    if (localStorage.getItem(email)) {
        alert('User with this email already exists!');
        return;
    }

    // Store user data in localStorage (simulating account creation)
    const userData = { username, email, password };
    localStorage.setItem(email, JSON.stringify(userData));
    alert('Registration successful! You can now log in.');

    // Close modal and reset form
    closeRgModal();
    this.reset();
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem(loginEmail);

    if (storedUser) {
        const userData = JSON.parse(storedUser);

        // Check if password matches
        if (userData.password === loginPassword) {
            alert(`Welcome back, ${userData.username}!`);
            closeLoginModal();
            this.reset();
        } else {
            alert('Incorrect password. Please try again.');
        }
    } else {
        alert('No account found with this email.');
    }
});

