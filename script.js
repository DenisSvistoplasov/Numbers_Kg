function randomNumber() {
  const digits = Math.floor(Math.random() * 3) + 1;
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function numberToKyrgyz(num) {
  const ones = [
    '', 'бир', 'эки', 'үч', 'төрт',
    'беш', 'алты', 'жети', 'сегиз', 'тогуз'
  ];

  const tens = [
    '', 'он', 'жыйырма', 'отуз', 'кырк',
    'элүү', 'алтымыш', 'жетимиш', 'сексен', 'токсон'
  ];

  if (num < 1 || num > 999 || !Number.isInteger(num)) {
    throw new Error('Число должно быть целым от 1 до 999');
  }

  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;
  const ten = Math.floor(remainder / 10);
  const one = remainder % 10;

  return [
    hundreds ? `${ones[hundreds]} жүз` : '',
    tens[ten],
    ones[one]
  ].filter(Boolean).join(' ');
}


(() => {
  let phase = 1;

  function step() {
    if (phase === 1) {
      document.querySelector('.text').classList.add('hidden');
      const number = randomNumber();
      const text = numberToKyrgyz(number);
      document.querySelector('.number').textContent = number;
      document.querySelector('.text').textContent = text;
      phase = 2;
      return;
    }

    if (phase === 2) {
      document.querySelector('.text').classList.remove('hidden');
      phase = 1;
      return;
    }
  }

  document.querySelector('.container').addEventListener('click', step);
  step();
})();