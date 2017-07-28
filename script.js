var generate_number = function() {
  var card_number = [];
  while (card_number.length < 15) {
    card_number.push(Math.floor(Math.random() * 10));
  }
  card_number.splice(18, 0, ' ');
  card_number.splice(12, 0, ' ');
  card_number.splice(8, 0, ' ');
  card_number.splice(4, 0, ' ');
  return card_number.join('');
}

document.addEventListener('DOMContentLoaded', function() {
  var card_number = generate_number();
  document.getElementById('stream').innerHTML = card_number;

  var index = 0;

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
