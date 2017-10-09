//play button starts game (i.e starts random squence )
//grab the id of each square - and put in an array ready to shuffle
//  loop through each id in the array in a random order and change the color for a couple of seconds - apply change color function to each element in the array - the change color function is based on a function which selects a random color
// remember the order  - store the random order in an array for comparison
//generate random color function
//set an array of colours
//use math.random to create a changing order of colors  and apply them to the ids
//user clicks the sequence and computer stores the input
//comparison between computer sequence and user input - if correct new sequence plays, if not, alert game over, try again.


// $square.on('click' , function(){
//   console.log('click!');
// });

// $(function() {
//   $('.square').click(function(){
//     $(this).css('background', '#EEEFD7');
//   });
// });



// function countDown() {
//   let counter = 11;
//   const timer = setInterval( () => {
//     counter--;
//     console.log(counter);
//     $('.timer').html(counter);
//     checkValue();
//   }, 1000);
//   function checkValue(){
//     if (counter <= 0) {
//       clearInterval(timer);
//     }
//   }
// }


// let colorHistory = [];
//  console.log($squareSequence);

$(() => {
  const $lis = $('li');
  const $square = $('.square');
  const $play = $('#play');
  const colors = ['#9C89B8', '#F0A6CA', '#EFC3E6', '#F0E6EF', '#B8BEDD'];
  const originColor = '#FE938C';
  let delay = 0;

  const $squareSequence = [0,1,2,3,4,5,6,7,8];

  function shuffle(a) {
    for (let i = a.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }

  shuffle($squareSequence);
  console.log($squareSequence);

  function changeColor() {
    for (var i = 0; i < $squareSequence.length; i++) {
      const singleSquare =$lis[$squareSequence[i]];
      console.log(singleSquare);
      const randomColor = colors[Math.floor(Math.random() *colors.length)];

      setTimeout(() => {
        $(singleSquare).css('background-color', `${randomColor}`);
        console.log($(singleSquare).css('background-color'));
      }, delay);
      delay += 700;
      console.log(singleSquare);
    }
  }

  function resetColor(){
    for (var i = 0; i < $squareSequence.length; i++) {
      const singleSquare = $lis[i];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${originColor}`);
      }, delay = 6000);
    }
  }

  const $userArray = [];
  function userPlay(){
    $square.one('click', function(){
      console.log(this);
      // get id attribute value from clicked li
      // push id value into array $userArray
      $userArray.push(parseInt($(this).attr('id')));
      // if number of clicks === 9
      if($userArray.length === 9){
        console.log('9!');
        console.log($userArray);
        //  compare arrays ()
      } else{
        console.log('keep clicking!');
      }



    });
  }

  $play.on('click', function() {
    changeColor();
    //save sequence to array?
    resetColor();
    userPlay();
    //saved computer array and user input array compared
  });

});
