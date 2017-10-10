$(() => {
  let $userArray = [];
  let $squareSequence = [];
  let delay = 0;
  const level = 3;
  let score = 0;
  const $score = $('.score');
  const $matchStatus = $('.matchStatus');
  const $square = $('.square');
  const $lis = $('li');
  const $button = $('button');
  let colors = [ '#9C89B8', '#F0A6CA','#EFC3E6', '#F0E6EF', '#B8BEDD'];
  const originColor = '#FE938C';
  let randomColor = [];

  function shuffle() {
    for (let i = 0; i < level; i++){
      $squareSequence.push(Math.floor(Math.random()* 8)+1);
    }
    console.log('squareSecquence---->', $squareSequence);
  }
  shuffle();

  function computerPlay() {
    console.log(`computerplay im hit --> ${$squareSequence.length} `);
    //random color generator
    for (var j = 0; j < level; j++) {
      const newRandom = Math.floor(Math.random() * colors.length);
      randomColor.push(colors[newRandom]);
      colors.splice(newRandom, 1);
    }
    console.log(randomColor);
    //return the color array to its original state
    colors = [ '#9C89B8', '#F0A6CA','#EFC3E6', '#F0E6EF', '#B8BEDD'];
    console.log(randomColor);
    //assign random color to a random sequence of squares
    for (var i = 0; i < $squareSequence.length; i++) {
      const colorToAssign = randomColor[i];
      const singleSquare =$lis[$squareSequence[i]];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${colorToAssign}`);
      }, delay);
      delay += 500;
    }
  }
  //function to clear the random sequence just played
  function clearDisplay() {
    console.log('cleardisplay im hit');
    for (var i = 0; i < $lis.length; i++) {
      const singleSquare = $lis[i];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${originColor}`);
      },  2500);
    }
    //call function to allow user to play
    userPlay();
  }
  //function which logs user play
  function userPlay() {
    console.log('userplay im hit');
    $square.on('click', function(){
      $(this).css('background-color','#9C89B8');
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
  //function which compares user array with computer array
  function comparison(){
    const arr1 = $userArray.toString();
    const arr2 = $squareSequence.toString();
    if (arr1 === arr2){
      console.log('match!');
      $matchStatus.text('It\'s a match!');
      $score.text(`${score += 1}`);
      setTimeout(() => {
        reset();
        shuffle();
        setTimeout(() => {
          playAgain();
        }, 1000);
      }, 1000);
    } else {
      console.log('not a match');
      $matchStatus.text('Game Over');
      setTimeout(() => {
        gameReset();
        shuffle();
      }, 1000);
    }
  }


  //function to start game
  $button.on('click', function() {
    computerPlay();
    clearDisplay();
  });

  //function to call next sequence in game
  function playAgain(){
    $square.off('click');
    computerPlay();
    clearDisplay();
  }

  //reset for when play continues
  function reset (){
    $matchStatus.text('');
    delay = 0;
    $userArray =[];
    $squareSequence =[];
    randomColor = [];
  }
  //reset for when it's game over
  function gameReset(){
    $score.text('0');
    score = 0;
    delay = 0;
    $userArray =[];
    $squareSequence =[];
    randomColor=[];
  }
});
