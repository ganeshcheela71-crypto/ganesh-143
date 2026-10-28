const WHATSAPP_NUMBER = '917815989020';

function whatsappUrl(message) {
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}

function openWhatsApp(message) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('.menu-toggle').forEach(function (toggle) {
  toggle.addEventListener('click', function () {
    const nav = document.querySelector('#main-nav');
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !open);
  });
});

document.querySelectorAll('#main-nav a').forEach(function (link) {
  link.addEventListener('click', function () {
    const nav = document.querySelector('#main-nav');
    const toggle = document.querySelector('.menu-toggle');
    if (nav && toggle) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }
  });
});

document.querySelectorAll('[data-trip-toggle]').forEach(function (group) {
  const hidden = group.parentElement.querySelector('input[type="hidden"][name="tripType"]');
  group.querySelectorAll('button[data-trip-type]').forEach(function (button) {
    button.addEventListener('click', function () {
      group.querySelectorAll('button[data-trip-type]').forEach(function (item) {
        item.setAttribute('aria-pressed', String(item === button));
      });
      if (hidden) hidden.value = button.dataset.tripType;
    });
  });
});

document.querySelectorAll('input[type="date"]').forEach(function (input) {
  const now = new Date();
  const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  input.min = localToday;
});

document.querySelectorAll('[data-whatsapp-booking]').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      'Hello Reeshika Travels, I would like to request a cab booking.',
      'Trip: ' + (data.get('tripType') || 'Round trip'),
      'Pickup: ' + (data.get('pickup') || 'Not specified'),
      'Destination: ' + (data.get('destination') || 'Not specified'),
      'Date: ' + (data.get('date') || 'Not specified'),
      'Vehicle: ' + (data.get('vehicle') || 'Any available vehicle')
    ];
    openWhatsApp(lines.join('\n'));
  });
});

document.querySelectorAll('.filter-button').forEach(function (button) {
  button.addEventListener('click', function () {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach(function (item) {
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelectorAll('.car-card').forEach(function (card) {
      card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter);
    });
  });
});

document.querySelectorAll('[data-book-car]').forEach(function (button) {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    openWhatsApp('Hello Reeshika Travels, I would like to enquire about booking a ' + button.dataset.bookCar + ' for an outstation trip. Please share availability and a quote.');
  });
});

document.querySelectorAll('[data-whatsapp-estimate]').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      'Hello Reeshika Travels, please share a fare quote for my outstation trip.',
      'Trip: ' + (data.get('tripType') || 'Round trip'),
      'Pickup city: ' + (data.get('pickup') || 'Not specified'),
      'Destination: ' + (data.get('destination') || 'Not specified'),
      'Travel date: ' + (data.get('date') || 'Not specified'),
      'Vehicle: ' + (data.get('vehicle') || 'Please recommend one')
    ].join('\n');
    openWhatsApp(message);
  });
});

document.querySelectorAll('[data-whatsapp-contact]').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      'Hello Reeshika Travels, I have a travel enquiry.',
      'Name: ' + data.get('name'),
      'Phone: ' + data.get('phone'),
      'Email: ' + (data.get('email') || 'Not provided'),
      'Trip type: ' + data.get('tripType'),
      'Trip details: ' + data.get('details')
    ].join('\n');
    openWhatsApp(message);
    const status = form.querySelector('.status-message');
    if (status) status.classList.add('is-visible');
  });
});

document.querySelectorAll('[data-year]').forEach(function (element) {
  element.textContent = new Date().getFullYear();
});
