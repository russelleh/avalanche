var generate_number = function() {
  var card_number = [];
  while (card_number.length < 15) {
    card_number.push(Math.floor(Math.random() * 10));
  }
  return card_number.join('');
}

var render_number = function(number) {
  number = number.split('');
  number.splice(12, 0, ' ');
  number.splice(8,  0, ' ');
  number.splice(4,  0, ' ');
  return number.join('');
}

document.addEventListener('DOMContentLoaded', function() {
  var card_number = generate_number();
  var index = 0;

  document.getElementById('stream').innerHTML = render_number(card_number);

  document.addEventListener('click', function(e) {
    document.getElementById('click').hidden = true;

    var input  = document.getElementById('input');
    var stream = document.getElementById('stream');
    var output = document.getElementById('output');
    var summation = 0;

    if (index === 18) {
      if (input.innerHTML) {
        summation        = parseInt(input.innerHTML, 10);
        input.innerHTML  = '';
        stream.innerHTML = stream.innerHTML.trim();
        stream.innerHTML += summation.toString();
      }
    } else {
      if (input.innerHTML) {
        summation =  parseInt(input.innerHTML, 10);
        summation += parseInt(stream.innerHTML[index], 10);

        input.innerHTML  = '';
        output.innerHTML = ' '.repeat(index) + summation.toString();
      } else {
        summation = parseInt(output.innerHTML, 10);
        if (summation >= 10) {
          summation %= 10;
          output.innerHTML = ' '.repeat(index) + summation.toString();
        } else {
          output.innerHTML = '';
          index += 1;
          while (stream.innerHTML[index] === ' ' && index < 17) {
            index += 1;
          }
          input.innerHTML = ' '.repeat(index) + summation.toString();
        }
      }
    }
  });
}, false);
