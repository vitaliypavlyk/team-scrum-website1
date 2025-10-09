document.getElementById('registerForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const formMessage = document.getElementById('formMessage');

  // Скидаємо попередні повідомлення
  clearErrors();
  formMessage.textContent = '';

  // Базова валідація
  if (username.length < 3) return showError('username', 'Ім’я користувача має містити щонайменше 3 символи');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError('email', 'Некоректний email');
  if (password.length < 6) return showError('password', 'Пароль має бути не коротший за 6 символів');
  if (password !== confirmPassword) return showError('confirmPassword', 'Паролі не співпадають');

  // Перевірка чи користувач вже існує
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === email)) {
    return showError('email', 'Користувач з таким email вже існує');
  }

  // Просте хешування (base64 — лише навчальний варіант!)
  const hashedPassword = btoa(password);

  // Збереження користувача
  const newUser = {
    id: Date.now(),
    username,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  // Повідомлення про успіх
  formMessage.textContent = '✅ Реєстрація успішна! Зараз вас перенаправимо...';
  formMessage.classList.add('success');

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1500);
});

// Функція показу помилки
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorSpan = field.nextElementSibling;
  errorSpan.textContent = message;
  field.classList.add('error');
}

// Очищення всіх помилок
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
  document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
}