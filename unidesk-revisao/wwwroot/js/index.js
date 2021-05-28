window.onload = (e) => {
  // Toggle menu
  (function () {
    let opened_menu = false;

    var upper_menu = document.getElementsByTagName('nav')[0];
    var toggle_buttons = document.getElementsByClassName('toggle-menu');

    function toggleMenu(newState) {
      if (newState !== undefined) {
        opened_menu = newState;
      } else {
        opened_menu = !opened_menu;
      }

      if (opened_menu) upper_menu.classList.remove('mobile-hidden');
      else upper_menu.classList.add('mobile-hidden');
    }

    Array.from(toggle_buttons).forEach((element) => {
      element.onclick = function (e) {
        toggleMenu();
      };
    });

    toggleMenu(false);
  })();

  // Header carousel

  (function () {
    const number_sequence = Array.from(document.getElementsByClassName('carousel-index'));
    const thumb_sequence = Array.from(document.getElementsByClassName('carousel-thumb'));
    const content_sequence = Array.from(document.getElementsByClassName('carousel-item'));

    function activateThumb(index) {
      for (let i = 0; i < thumb_sequence.length; i++) {
        if (i === index) {
          thumb_sequence[i].classList.add('active');
          thumb_sequence[i].classList.add('black-text');
          thumb_sequence[i].classList.remove('text-black-shadow-desktop');
        } else {
          thumb_sequence[i].classList.remove('active');
          thumb_sequence[i].classList.remove('black-text');
          thumb_sequence[i].classList.add('text-black-shadow-desktop');
        }
      }

      var thumbanails_div = document.getElementsByClassName('carousel-thumb');
      Array.from(thumbanails_div).forEach((element) => {
        if (!element.classList.contains('active')) {
          element.style.backgroundImage = `url('${element.dataset.thumb}')`;
        } else {
          element.style.backgroundImage = `url('${''}')`;
        }
      });
    }

    function activateContent(index) {
      for (let i = 0; i < content_sequence.length; i++) {
        if (i === index) {
          content_sequence[i].classList.add('active');
        } else {
          content_sequence[i].classList.remove('active');
        }
      }
    }

    function activateNumber(index) {
      for (let i = 0; i < number_sequence.length; i++) {
        if (i === index) {
          number_sequence[i].classList.add('selected');
        } else {
          number_sequence[i].classList.remove('selected');
        }
      }
    }

    // Muda imagens do header
    const header_image = document.getElementById('changeImage');

    function changeImages(index) {
      if (index === 3) {
        header_image.style.backgroundImage = 'url(../img/carousel/banner_04.png)';
      } else if (index === 2) {
        header_image.style.backgroundImage = 'url(../img/carousel/banner_03.png)';
      } else if (index === 1) {
        header_image.style.backgroundImage = 'url(../img/carousel/banner_02.png)';
      } else if (index === 0) {
        header_image.style.backgroundImage = 'url(../img/carousel/banner_01.png)';
      }
    }

    function activateIndex(index) {
      activateThumb(index);
      activateContent(index);
      activateNumber(index);
      changeImages(index);
    }

    for (let i = 0; i < number_sequence.length; i++) {
      const index = i;
      number_sequence[i].onclick = function () {
        activateIndex(index);
      };
    }

    activateIndex(0);
  })();
  // Máscara telefone
  jQuery('input.telefone')
    .mask('(99) 9999-9999?9')
    .focusout(function (event) {
      var target, phone, element;
      target = event.currentTarget ? event.currentTarget : event.srcElement;
      phone = target.value.replace(/\D/g, '');
      element = $(target);
      element.unmask();
      if (phone.length > 10) {
        element.mask('(99) 99999-999?9');
      } else {
        element.mask('(99) 9999-9999?9');
      }
    });
  // Bind form - Contato
  (function () {
    var formContato = document.getElementById('form-contato');

    var fieldNome = document.getElementById('contato-nome');
    var fieldEmail = document.getElementById('contato-email');
    var fieldTelefone = document.getElementById('contato-telefone');
    var fieldMensagem = document.getElementById('contato-mensagem');
    var fieldHP = document.getElementById('contato-hp');

    var validationNome = document.getElementById('contato-nome-validation');
    var validationEmail = document.getElementById('contato-email-validation');
    var validationTelefone = document.getElementById('contato-telefone-validation');
    var validationMensagem = document.getElementById('contato-mensagem-validation');

    var button = formContato.getElementsByClassName('btn')[0];

    var notification = formContato.getElementsByClassName('notification-form')[0];
    $(formContato).submit(function (e) {
      e.preventDefault();
      button.setAttribute('disabled', 'disabled');
      button.innerHTML = 'Enviando...';

      var data = {
        nome: fieldNome.value,
        email: fieldEmail.value,
        telefone: fieldTelefone.value,
        mensagem: fieldMensagem.value,
        hp: fieldHP.value,
      };

      $.post('/api/cadastrar-contato', data, function (res) {
        if (!res.ok) {
          validationNome.innerText = res.validacao.nome;
          validationEmail.innerText = res.validacao.email;
          validationTelefone.innerText = res.validacao.telefone;
          validationMensagem.innerText = res.validacao.mensagem;
          button.innerHTML = 'Enviar';
        } else {
          fieldNome.value = '';
          fieldEmail.value = '';
          fieldTelefone.value = '';
          fieldMensagem.value = '';

          validationNome.innerText = '';
          validationEmail.innerText = '';
          validationTelefone.innerText = '';
          validationMensagem.innerText = '';
          notification.style.display = 'block';
          button.innerHTML = 'Enviar';
        }
      }).always(function () {
        button.removeAttribute('disabled');
        setTimeout(function () {
          notification.style.display = 'none';
        }, 3000);
      });
    });
  })();

  // Bind form - Newsletter
  (function () {
    var formNewsletter = document.getElementById('form-newsletter');

    var fieldNome = document.getElementById('newsletter-nome');
    var fieldEmail = document.getElementById('newsletter-email');
    var fieldHP = document.getElementById('newsletter-hp');

    var validationNome = document.getElementById('newsletter-nome-validation');
    var validationEmail = document.getElementById('newsletter-email-validation');
    var button = formNewsletter.getElementsByClassName('btn')[0];
    var notification = formNewsletter.getElementsByClassName('notification-form')[0];

    $(formNewsletter).submit(function (e) {
      e.preventDefault();
      button.setAttribute('disabled', 'disabled');
      button.innerHTML = 'Enviando...';

      var data = {
        nome: fieldNome.value,
        email: fieldEmail.value,
        hp: fieldHP.value,
      };

      $.post('/api/cadastrar-newsletter', data, function (res) {
        if (!res.ok) {
          validationNome.innerText = res.validacao.nome;
          validationEmail.innerText = res.validacao.email;
          button.innerHTML = 'Assinar';
        } else {
          fieldNome.value = '';
          fieldEmail.value = '';
          validationNome.innerText = '';
          validationEmail.innerText = '';
          notification.style.display = 'block';
          button.innerHTML = 'Assinar';
        }
      }).always(function () {
        button.removeAttribute('disabled');
        setTimeout(function () {
          notification.style.display = 'none';
        }, 3000);
      });
    });
  })();
};
