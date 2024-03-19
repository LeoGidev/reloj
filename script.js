function updateClock() {
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
  
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');
  
    const hourRotation = 30 * hour + 0.5 * minute; // 30 degrees per hour, 0.5 degrees per minute
    const minuteRotation = 6 * minute + 0.1 * second; // 6 degrees per minute, 0.1 degrees per second
    const secondRotation = 6 * second; // 6 degrees per second
  
    hourHand.style.transform = `rotate(${hourRotation}deg)`;
    minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
    secondHand.style.transform = `rotate(${secondRotation}deg)`;
  
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  
    document.getElementById('month').innerText = month;
    document.getElementById('year').innerText = year;
    document.getElementById('days').innerText = days;
  }
  
  updateClock();
  setInterval(updateClock, 1000);

  
  