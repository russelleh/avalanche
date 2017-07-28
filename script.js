var generate_number = function() {
  var card_number = [];
  while (card_number.length < 15) {
    card_number.push(Math.floor(Math.random() * 10));
  }
  return card_number.join('');
};

var pad_number = function(number, index) {
  return ' '.repeat(index) + number;
};

var render_number = function(number, index, element) {
  number = pad_number(number, index).split('');
  number.splice(12, 0, ' ');
  number.splice(8,  0, ' ');
  number.splice(4,  0, ' ');
  element.innerHTML = number.join('');
};

document.addEventListener('DOMContentLoaded', function() {
  var card_number = generate_number();
  var index = 0;

  render_number(card_number, 0, document.getElementById('stream'));

  document.addEventListener('click', function(e) {
    document.getElementById('click').hidden = true;

    var input  = document.getElementById('input');
    var stream = document.getElementById('stream');
    var output = document.getElementById('output');
    var summation = 0;

    if (index >= card_number.length) {
      if (input.innerHTML) {
        summation        = parseInt(input.innerHTML, 10);
        input.innerHTML  = '';
        stream.innerHTML = stream.innerHTML.trim();
        stream.innerHTML += summation.toString();
      }
    } else {
      if (input.innerHTML) {
        summation =  parseInt(input.innerHTML.replace(/ /g, ''), 10);
        summation += parseInt(card_number[index], 10);

        input.innerHTML  = '';
        render_number(summation, index, output);
      } else {
        summation = parseInt(output.innerHTML.replace(/ /g, ''), 10);
        if (summation >= 10) {
          summation %= 10;
          render_number(summation, index, output);
        } else {
          output.innerHTML = '';
          index += 1;
          render_number(summation, index, input);
        }
      }
    }
  });
}, false);
