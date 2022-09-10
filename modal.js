const scroll = calcScroll();

function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);


  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
  document.body.style.marginRight = `0px`;
}

function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  document.body.style.marginRight = `${scroll}px`;
}

function modal(triggerSelector, modalSelector) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);

  modalTrigger.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector));
  });

  modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
          closeModal(modalSelector);
      }
  });

  document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) { 
          closeModal(modalSelector);
      }
  });

  function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          openModal(modalSelector, modalTimerId);
          window.removeEventListener('scroll', showModalByScroll);
      }
  }

  window.addEventListener('scroll', showModalByScroll);
}

modal('[data-modal]', '.modal');