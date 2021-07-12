const openModalBtnRef = document.querySelector('button[data-action="open-modal"]');
const backDropRef = document.querySelector('.js-backdrop');
const closeModalBtnRef = document.querySelector('button[data-action="close-modal"]');


openModalBtnRef.addEventListener('click', onOpenModal);
closeModalBtnRef.addEventListener('click', onCloseModal);
backDropRef.addEventListener('click', onBackdropClick);


function onCloseModal() {
    window.removeEventListener('keydown', onPressEscape);
    backDropRef.classList.remove('show_modal');
};

function onOpenModal() {
    window.addEventListener('keydown', onPressEscape);
    backDropRef.classList.add('show_modal');
};

function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
        console.log('Потрібно закрити модалку, кліккай в темне!');
        onCloseModal();
    }
};

function onPressEscape(event) {
    if (event.code === 'Escape') {
        console.log('Натиснули ESC потрібно закрити модалку!');
        onCloseModal();
    }
};