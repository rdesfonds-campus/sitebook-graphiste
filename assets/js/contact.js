const CONTACT_ENDPOINT = 'https://metakina.fr/api/contact-api.php';
const FALLBACK_EMAIL = 'romain.desfonds@gmail.com'; // ✏️ ton adresse

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

document.getElementById('formTs').value = Date.now();

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  status.textContent = 'Envoi en cours…';
  status.className = 'form-status';

  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.ok) {
      status.textContent = 'Message envoyé, merci !';
      status.className = 'form-status ok';
      form.reset();
    } else {
      throw new Error(data.error || 'unknown');
    }
  } catch (err) {
    status.innerHTML =
      `Échec de l'envoi. Écrivez-moi directement à ` +
      `<a href="mailto:${FALLBACK_EMAIL}">${FALLBACK_EMAIL}</a>.`;
    status.className = 'form-status err';
  }
});