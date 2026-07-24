// assets/js/contact.js
const CONTACT_ENDPOINT = 'https://metakina.fr/api/contact-api.php';

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

// On note l'heure d'affichage du formulaire, pour l'anti-spam côté serveur
document.getElementById('formTs').value = Date.now();

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // empêche le rechargement classique de la page

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
    status.textContent = "Erreur lors de l'envoi, réessaie ou écris-moi directement.";
    status.className = 'form-status err';
  }
});