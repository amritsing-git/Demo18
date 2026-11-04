const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;
    document.querySelectorAll('.art-card').forEach(card => {
      card.hidden = selected !== 'all' && card.dataset.category !== selected;
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('enquiryForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent('Artwork enquiry — Vistara Creations');
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nReply contact: ${data.get('reply')}\nInterested in: ${data.get('interest')}\n\nMessage:\n${data.get('message') || 'No additional message'}`
  );
  const status = document.getElementById('formStatus');
  status.textContent = 'Your enquiry details are ready. Choose an email app to send them; this website does not store submissions.';
  const mailLink = document.createElement('a');
  mailLink.href = `mailto:?subject=${subject}&body=${body}`;
  mailLink.textContent = ' Open email app ↗';
  mailLink.style.marginLeft = '5px';
  mailLink.style.textDecoration = 'underline';
  status.appendChild(mailLink);
});
