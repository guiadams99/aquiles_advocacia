// Seleção de elementos
const menuBtn = document.querySelector('#menu')
const closeMenuBtn = document.querySelector('#close-menu')
const menu = document.querySelector('#mobile-navbar')
const faqs = document.querySelectorAll(".faq");

const desktopLinks = document.querySelectorAll('#navbar a')
const mobileLinks = document.querySelectorAll('#mobile-navbar a')
const allLinks = [...desktopLinks, ...mobileLinks]

const slides = document.querySelectorAll('.banner')
const dots = document.querySelectorAll('.dot')
let slideIndex = 0

// Funções
function smoothScroll(e) {
  e.preventDefault()

  const href = this.getAttribute('href')
  const offsetTop = document.querySelector(href).offsetTop
  scroll({
    top: offsetTop,
    behavior: 'smooth'
  })

  setTimeout(() => {
    if (menu.classList.contains('menu-active')) {
      menu.classList.remove('menu-active')
    }
  }, 100)
}

function showSlides() {
  console.log(slides)

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active')
    dots[i].classList.remove('active')
  }

  slideIndex++

  if (slideIndex > slides.length) {
    slideIndex = 1
  }

  slides[slideIndex - 1].classList.add('active')
  dots[slideIndex - 1].classList.add('active')

  setTimeout(showSlides, 3000)
}

// Eventos
;[menuBtn, closeMenuBtn].forEach(btn => {
  btn.addEventListener('click', e => {
    menu.classList.toggle('menu-active')
  })
})

allLinks.forEach(link => {
  link.addEventListener('click', smoothScroll)
})

// Inicialização
showSlides()


faqs.forEach(faq => {
  const question = faq.querySelector(".question");
  const answer = faq.querySelector(".answer");

  question.addEventListener("click", () => {
    if (!faq.classList.contains("active")) {
      // Fecha todos os itens do acordeão antes de abrir o atual
      faqs.forEach(item => {
        if (item !== faq && item.classList.contains("active")) {
          item.classList.remove("active");
          item.querySelector(".answer").style.maxHeight = "0";
        }
      });

      // Abre o item do acordeão clicado
      faq.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      // Fecha o item do acordeão clicado
      faq.classList.remove("active");
      answer.style.maxHeight = "0";
    }
  });
});


const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "center"
    });

    items[currentItem].classList.add("current-item");
  });
});
