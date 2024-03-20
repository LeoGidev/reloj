const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2;

function drawClock() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar el borde del reloj
  ctx.beginPath();
  ctx.arc(radius, radius, radius - 2, 0, 2 * Math.PI);
  ctx.stroke();

  // Dibujar los números
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 1; i <= 12; i++) {
    const angle = (i * Math.PI) / 6;
    const x = radius + (radius - 20) * Math.sin(angle);
    const y = radius - (radius - 20) * Math.cos(angle);
    ctx.fillText(i.toString(), x, y);
  }

  // Dibujar las manecillas
  const now = new Date();
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Dibujar la manecilla de las horas
  const hourAngle = (hour * Math.PI) / 6 + (minute * Math.PI) / 360 + (second * Math.PI) / 21600;
  drawHand(ctx, hourAngle, radius * 0.5, 8);

  // Dibujar la manecilla de los minutos
  const minuteAngle = (minute * Math.PI) / 30 + (second * Math.PI) / 1800;
  drawHand(ctx, minuteAngle, radius * 0.7, 4);

  // Dibujar la manecilla de los segundos
  const secondAngle = (second * Math.PI) / 30;
  drawHand(ctx, secondAngle, radius * 0.8, 1);

  // Dibujar el punto central
  ctx.beginPath();
  ctx.arc(radius, radius, 4, 0, 2 * Math.PI);
  ctx.fill();

  requestAnimationFrame(drawClock);
}

function drawHand(ctx, angle, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.moveTo(radius, radius);
  ctx.lineTo(radius + length * Math.sin(angle), radius - length * Math.cos(angle));
  ctx.stroke();
}

drawClock();

function drawCalendar() {
  const calendarDiv = document.getElementById('calendar');
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const table = document.createElement('table');
  const tableHead = table.createTHead();
  const tableBody = table.createTBody();

  // Cabecera de la tabla
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const headerRow = tableHead.insertRow();
  daysOfWeek.forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  });

  // Cuerpo de la tabla
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = tableBody.insertRow();
    for (let j = 0; j < 7; j++) {
      const cell = row.insertCell();
      if (i === 0 && j < firstDayOfMonth.getDay()) {
        cell.textContent = '';
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.textContent = date;
        const currentDate = new Date(currentYear, currentMonth, date);
        if (currentDate.toDateString() === today.toDateString()) {
          cell.classList.add('today');
        }
        if (currentDate.getDay() === 0) {
          cell.classList.add('sunday');
        }
        if (currentDate.getDay() === 1) {
          cell.classList.add('monday');
        }
        date++;
      }
    }
  }

  calendarDiv.innerHTML = '';
  calendarDiv.appendChild(table);
}

drawClock();
drawCalendar();


  
  