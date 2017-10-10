//play button starts game (i.e starts random squence )
//grab the id of each square - and put in an array ready to shuffle
//  loop through each id in the array in a random order and change the color for a couple of seconds - apply change color function to each element in the array - the change color function is based on a function which selects a random color
// remember the order  - store the random order in an array for comparison
//generate random color function
//set an array of colours
//use math.random to create a changing order of colors  and apply them to the ids
//user clicks the sequence and computer stores the input
//comparison between computer sequence and user input - if correct new sequence plays, if not, alert game over, try again.
//
function playAnswer(){
    // const difficultyLevel = parseInt($('#difficulty').find(':selected').val());
    // $('#reset').prop('disabled',true);
    let counter = 0;
    const interval = setInterval(function() {
      if (counter === (ansArray.length - 1)) {//stops when it reaches the ned of the sequence
        // $('#reset').prop('disabled',false);
        clearInterval(interval);
      }
      console.log(ansArray[counter]);
      light up my square
      // new Audio(`./Roland_TB-303/${ansArray[counter]}.mp3`).play();

      setTimeout(function() {
        un light my square
        counter++;
      },50);//amount of time before it unlight my square
    }, 800);//amount of time between each interval

  }



$(() => {
  const $lis = $('li');
  const $square = $('.square');
  const $play = $('#play');
  const colors = [ '#9C89B8', '#F0A6CA','#EFC3E6', '#F0E6EF', '#B8BEDD'];
  const originColor = '#FE938C';
  const $userArray = [];
  let delay = 0;
  const level = 3;
  const $squareSequence = [];
  const $score = $('.score');

  function shuffle() {
    for (var i = 0; i < level; i++){
      $squareSequence.push(Math.floor(Math.random()* 8)+1);
    }
  }
  shuffle();
  console.log($squareSequence);

  function changeColor() {
    for (var i = 0; i < $squareSequence.length; i++) {
      const singleSquare =$lis[$squareSequence[i]];
      const randomColor = colors[Math.floor(Math.random() *colors.length)+1];
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
      },  2500);
    }
  }

  function userPlay(){
    $square.on('click', function(){
      console.log(this);
      $userArray.push(parseInt($(this).attr('id')));
      if($userArray.length === 3){
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
      $score.text('It\'s aMatch!');
      // resetPlay();
    } else {
      console.log('not a match');
      $score.text('Not a match!!');
      // resetPlay();
    }
  }

  //PLAY
  $play.on('click', function() {
    changeColor();
    resetColor();
    userPlay();
  });

  //RESETPLAY
  // function resetPlay(){
  //   $userArray = 0;
  //   $squareSequence = 0;
  //   changeColor();
  //   resetColor();
  //   userPlay();
  // }

});
