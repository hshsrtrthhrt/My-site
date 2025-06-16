let balance = 100;
let loseStreak = 0;

const symbols = [
  { name: '7', img: 'img/f.png' },
  { name: 'вишня', img: 'img/d.png' },
  { name: 'яблоко', img: 'img/h.png' },
  { name: 'груша', img: 'img/g.png' }
];

function getRandomSymbol() {
  const chance = Math.random();
  if (chance < 0.1) return symbols[0];
  if (chance < 0.2) return symbols[1];
  if (chance < 0.3) return symbols[2];
  if (chance < 0.4) return symbols[3];
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spin() {
  const spinButton = document.getElementById('spin-button');
  spinButton.disabled = true;
  spinButton.classList.add('spin-anim');

  setTimeout(() => {
    spinButton.classList.remove('spin-anim');
    spinButton.disabled = false;
  }, 500);

  document.getElementById('deposit').style.display = 'none';

  const reels = ['r1', 'r2', 'r3'].map(id => {
    const sym = getRandomSymbol();
    document.getElementById(id).innerHTML = `<img src="${sym.img}" alt="${sym.name}">`;
    return sym.name;
  });

  let resultText = '';
  if (reels.every(r => r === '7')) {
    resultText = '<span class="money-animation">ДЖЕКПОТ! +5000₽</span>';
    balance += 5000;
    loseStreak = 0;
  } else if (new Set(reels).size === 1) {
    resultText = `3 ${reels[0]}! +30₽`;
    balance += 30;
    loseStreak = 0;
  } else {
    resultText = 'Проигрыш -10₽';
    balance -= 10;
    loseStreak++;
    document.getElementById('deposit').style.display = 'block';
  }

  // Бонус, если баланс слишком мал (по приколу)
  if (balance < 10) {
    balance += 100;
    alert('Вы получили бонус +100₽!');
  }

  document.getElementById('result').innerHTML = resultText;
  document.getElementById('balance').innerText = `Баланс: ${balance}₽`;

  if (loseStreak >= 10) {
    document.getElementById('extra-message').innerText = 'Не волнуйся, депни квартиру и всё будет!';
  } else {
    document.getElementById('extra-message').innerText = '';
  }

  document.getElementById('jackpot-info').innerText = 'Джекпот = 5000₽';
}

function spin() {
  const spinButton = document.getElementById('spin-button');
  spinButton.disabled = true;
  spinButton.classList.add('spin-anim');

  const reelIds = ['r1', 'r2', 'r3'];
  const finalSymbols = [];

  // Эффект "прокрутки"
  let spinCount = 10;
  let interval = setInterval(() => {
    reelIds.forEach(id => {
      const reel = document.getElementById(id);
      const randomSymbol = getRandomSymbol();
      reel.innerHTML = `<img src="${randomSymbol.img}" alt="${randomSymbol.name}">`;
    });
    spinCount--;
    if (spinCount <= 0) {
      clearInterval(interval);

      // Показ финальных символов с падением
      finalSymbols.length = 0;
      reelIds.forEach(id => {
        const finalSymbol = getRandomSymbol();
        finalSymbols.push(finalSymbol.name);
        const reel = document.getElementById(id);
        reel.innerHTML = `<img src="${finalSymbol.img}" alt="${finalSymbol.name}">`;
      });

      // Подсчёт результатов
      let resultText = '';
      if (finalSymbols.every(r => r === '7')) {
        resultText = '<span class="money-animation">ДЖЕКПОТ! +5000₽</span>';
        balance += 5000;
        loseStreak = 0;
      } else if (new Set(finalSymbols).size === 1) {
        resultText = `3 ${finalSymbols[0]}! +30₽`;
        balance += 30;
        loseStreak = 0;
      } else {
        resultText = 'Проигрыш -10₽';
        balance -= 10;
        loseStreak++;
        document.getElementById('deposit').style.display = 'block';
      }

      document.getElementById('result').innerHTML = resultText;
      document.getElementById('balance').innerText = `Баланс: ${balance}₽`;

      document.getElementById('extra-message').innerText =
        loseStreak >= 10 ? 'Не волнуйся, депни квартиру и всё будет!' : '';

      spinButton.disabled = false;
      spinButton.classList.remove('spin-anim');
    }
  }, 100); // скорость прокрутки
}
const reel = document.getElementById(id);
reel.innerHTML = ''; // сбрасываем старое содержимое
const img = document.createElement('img');
img.src = sym.img;
img.alt = sym.name;
img.classList.add('fall'); // можно, если хочешь задать отдельный класс
reel.appendChild(img);
