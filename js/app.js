//play button starts game (i.e starts random squence )
//grab the id of each square - and put in an array ready to shuffle
//  loop through each id in the array in a random order and change the color for a couple of seconds - apply change color function to each element in the array - the change color function is based on a function which selects a random color
// remember the order  - store the random order in an array for comparison
//generate random color function
//set an array of colours
//use math.random to create a changing order of colors  and apply them to the ids
//user clicks the sequence and computer stores the input
//comparison between computer sequence and user input - if correct new sequence plays, if not, alert game over, try again.

// const $square = $('.square');
// $square.on('click' , function(){
//   console.log('click!');
// });

// $(function() {
//   $('.square').click(function(){
//     $(this).css('background', '#EEEFD7');
//   });
// });

// const $squareSequence = [];
// for (let i = 0; i < $square.length; i++) {
//   $squareSequence.push($square[i].getAttribute('id'));
// }
// console.log($squareSequence);

// function shuffle(a) {
//   for (let i = a.length; i; i--) {
//     const j = Math.floor(Math.random() * i);
//     [a[i - 1], a[j]] = [a[j], a[i - 1]];
//   }
//   console.log(a);
// }
// shuffle($squareSequence);
// ($squareSequence[i]).style.background =  colors[Math.floor(Math.random() *colors.length)];

$(() => {

  const $play = $('#play');
  const colors = ['#9C89B8', '#F0A6CA', '#EFC3E6', '#F0E6EF', '#B8BEDD'];
  const colorHistory = [];
  const $lis = $('li');

  function changeColor(){
    for (var i = 0; i < $lis.length; i++) {
      const singleSquare = $lis[i];
      const $randomColor = colors[Math.floor(Math.random() *colors.length)];
      $(singleSquare).css('background-color', `${$randomColor}`);
      colorHistory.push($randomColor);
      console.log(`in the making --> ${colorHistory}`);
    }
  }
  console.log(colorHistory);

  $play.on('click', function() {
    console.log('play!');
    setTimeout(function (){
      changeColor();
    }, 2000);
  });

});
