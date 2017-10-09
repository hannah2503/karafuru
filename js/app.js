//play button starts game (i.e starts random squence )
//grab the id of each square - and put in an array ready to shuffle
//  loop through each id in the array in a random order and change the color for a couple of seconds - apply change color function to each element in the array - the change color function is based on a function which selects a random color
// remember the order  - store the random order in an array for comparison
//generate random color function
//set an array of colours
//use math.random to create a changing order of colors  and apply them to the ids
//user clicks the sequence and computer stores the input
//comparison between computer sequence and user input - if correct new sequence plays, if not, alert game over, try again.
// for (let i = a.length; i; i--) {
//   const j = Math.floor(Math.random() * i);
//   [a[i - 1], a[j]] = [a[j], a[i - 1]];
// }



$(() => {
  const $lis = $('li');
  const $square = $('.square');
  const $play = $('#play');
  const colors = ['#9C89B8', '#F0A6CA', '#EFC3E6', '#F0E6EF', '#B8BEDD'];
  const originColor = '#FE938C';
  let delay = 0;

  const level = 3;
  const $squareSequence = [];

  function shuffle() {
    for (var i = 0; i < level; i++){
      $squareSequence.push(Math.floor(Math.random()* 8));
    }
  }
  shuffle();
  console.log($squareSequence);

  function changeColor() {
    for (var i = 0; i < $squareSequence.length; i++) {
      const singleSquare =$lis[$squareSequence[i]];
      const randomColor = colors[Math.floor(Math.random() *colors.length)];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${randomColor}`);
      }, delay);
      delay += 500;
    }
  }

  function resetColor(){
    for (var i = 0; i < $lis.length; i++) {
      const singleSquare = $lis[i];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${originColor}`);
      },  3000);
    }
  }

  const $userArray = [];
  function userPlay(){
    $square.one('click', function(){
      console.log(this);
      $userArray.push(parseInt($(this).attr('id')));
      if($userArray.length === 3){
        console.log('3!');
        console.log($userArray);
        comparison();
      } else{
        console.log('keep clicking!');
      }
    });
  }

  function comparison(){
    //  compare arrays ()
    const arr1 = $userArray.toString();
    const arr2 = $squareSequence.toString();
    console.log(arr1);
    console.log(arr2);
    if (arr1 === arr2){
      console.log('match!');
    } else {
      console.log('not a match');
    }
  }

  $play.on('click', function() {
    changeColor();
    resetColor();
    userPlay();
  });
});
