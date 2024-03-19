document.addEventListener("DOMContentLoaded", function() {
  // Function to toggle the visibility of the navigation menu
  function toggleNavMenu() {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    navbarCollapse.classList.toggle("show");
  }

  // Get the navbar toggler button
  const navbarToggler = document.querySelector(".navbar-toggler");

  // Add click event listener to the navbar toggler button
  navbarToggler.addEventListener("click", function() {
    toggleNavMenu();
  });

  // Function to close the navigation menu when a link is clicked (on small screens)
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      navbarCollapse.classList.remove("show");
    });
  });


  // Obtener todas las imágenes con la clase clickable-image
  const images = document.querySelectorAll(".clickable-image");

  // Función para mostrar una imagen gradualmente
  function showImage(image) {
    image.classList.add("loaded"); // Agregar la clase 'loaded' para mostrar la imagen
  }

  // Añadir evento de carga a cada imagen
  images.forEach(image => {
    if (image.complete) {
      // La imagen ya está cargada, mostrarla inmediatamente
      showImage(image);
    } else {
      // La imagen aún no se ha cargado, agregar un controlador de eventos de carga
      image.addEventListener("load", function() {
        showImage(image);
      });
    }

    // Agregar evento de clic para mostrar el modal
    image.addEventListener("click", function() {
      const modalContent = document.getElementById("modal-content");
      modalContent.src = this.src;
      document.getElementById("modal-image").style.display = "block";
      document.body.style.overflow = "hidden"; // Evitar el desplazamiento de la página al hacer zoom
    });
  });

  // Obtener el elemento del modal
  const modal = document.getElementById("modal-image");

  // Obtener el botón de cerrar
  const span = document.getElementById("close-modal");

  // Cuando el usuario hace clic en el botón de cerrar, ocultar el modal
  span.onclick = closeModal;

  // Añadir evento para cerrar el modal haciendo clic fuera del modal
  modal.onclick = function(event) {
    if (event.target === modal) {
      closeModal();
    }
  };

  // Agregar el evento load a las imágenes en las filas
  const rowImages = document.querySelectorAll(".row .clickable-image");
  rowImages.forEach(image => {
    if (image.complete) {
      // La imagen ya está cargada, mostrarla inmediatamente
      showImage(image);
    } else {
      // La imagen aún no se ha cargado, agregar un controlador de eventos de carga
      image.addEventListener("load", function() {
        showImage(image);
      });
    }
  });
});

// Función para cerrar el modal
function closeModal() {
  const modalContent = document.getElementById("modal-content");
  modalContent.style.transform = "scale(1)";
  document.getElementById("modal-image").style.display = "none";
  document.body.style.overflow = "auto"; // Restaurar el desplazamiento de la página
}

let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
console.log(slides); //

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach(slide => slide.style.display = 'none');
  slides[slideIndex].style.display = 'block';
}

function changeSlide(n) {
  slideIndex += n;
  showSlide(slideIndex);
}

showSlide(slideIndex);


document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = e.target;
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action, true);
  xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.onloadend = function (res) {
    if (res.target.status === 200) {
      document.getElementById("submit-btn").style.display = "none";
      document.getElementById("thanks-msg").style.display = "block";
    }
  };
  xhr.send(JSON.stringify({
    name: form.elements.name.value,
    email: form.elements.email.value,
    message: form.elements.message.value
    // add any additional form fields here
  }));
});
