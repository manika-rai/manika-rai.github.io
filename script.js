document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        alert('Thank you! Your message has been sent.');
        window.location.href = 'thank-you.html';
      } else {
        alert('Oops! Something went wrong. Please try again later.');
      }
    })
    .catch(() => {
      alert('Error sending message. Please check your internet and try again.');
    });
  });
});


document.querySelectorAll('input[type="file"]').forEach(input => {
  input.addEventListener('change', function () {
    const previewContainer = this.nextElementSibling;
    previewContainer.innerHTML = '';

    [...this.files].forEach(file => {
      const fileType = file.type;
      const reader = new FileReader();

      reader.onload = function (e) {
        let element;
        if (fileType.startsWith('image')) {
          element = document.createElement('img');
          element.src = e.target.result;
        } else if (fileType.startsWith('video')) {
          element = document.createElement('video');
          element.src = e.target.result;
          element.controls = true;
        }

        if (element) previewContainer.appendChild(element);
      };

      reader.readAsDataURL(file);
    });
  });
});
