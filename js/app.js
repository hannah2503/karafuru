$(() => {

  const $userArray = [];
  const $squareSequence = [];
  let delay = 0;
  const level = 3;
  const $square = $('.square');
  const $lis = $('li');
  const $playButton = $('button');
  const colors = [ '#9C89B8', '#F0A6CA','#EFC3E6', '#F0E6EF', '#B8BEDD'];
  const randomColor = colors[Math.floor(Math.random() *colors.length)];
  const originColor = '#FE938C';
  const $score = $('.score');
  // let $timer = $('.timer');
  // const timer = 10;

  function shuffle() {
    for (let i = 0; i < level; i++){
      $squareSequence.push(Math.floor(Math.random()* 8)+1);
    } shuffle;
  }
  shuffle();
  console.log($squareSequence);

  // function computerPlay() {
  //   $squareSequence['i'].css('background-color', `${randomColor}`);
  // }
  //
  // const myVar = setInterval(function(){
  //   computerPlay();
  // }, 300);
  //
  //
  // function stopColor() {
  //   clearInterval(myVar);
  // }
  //
  // function stopSequence(){
  //   if ($squareSequence === (level.length -1)){
  //     stopColor();
  //   }else{
  //     console.log($squareSequence);
  //   }
  // }


  function computerPlay() {
    for (var i = 0; i < $squareSequence.length; i++) {
      const singleSquare =$lis[$squareSequence[i]];
      const randomColor = colors[Math.floor(Math.random() *colors.length)];
      console.log(randomColor);
      setTimeout(() => {
        $(singleSquare).css('background-color', `${randomColor}`);
      }, delay);
      delay += 500;
    }
  }

  function clearDisplay() {
    for (var i = 0; i < $lis.length; i++) {
      const singleSquare = $lis[i];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${originColor}`);
      },  2500);
    }
  }

  function userPlay() {
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
    const $matchStatus = $('.matchStatus');
    const arr1 = $userArray.toString();
    const arr2 = $squareSequence.toString();
    if (arr1 === arr2){
      console.log('match!');
      $matchStatus.text('It\'s a match!');
      $score.text(+1);
    } else {
      console.log('not a match');
      $matchStatus.text('Not a match!!');
      $score.text(-1);
    }
  }

  $playButton.on('click', function() {
    computerPlay();
    clearDisplay();
    userPlay();

  });




});
