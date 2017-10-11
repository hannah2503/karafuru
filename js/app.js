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

  $button.on('click', play);

  function play(){
    console.log('lets play!');
    $matchStatus.text('Let\'s Play!');
    computerPlay();
  }

  function computerPlay(){
    function shuffleLis(){
      for (let i = 0; i < level; i++){
        $squareSequence.push(Math.floor(Math.random()* 8)+1);
      }
    } shuffleLis();
    console.log($squareSequence);
    for (var j = 0; j < level; j++) {
      const newRandom = Math.floor(Math.random() * colors.length);
      randomColor.push(colors[newRandom]);
      colors.splice(newRandom, 1);
    }
    colors = ['#9C89B8', '#F0A6CA','#EFC3E6', '#F0E6EF', '#B8BEDD'];
    for (var i = 0; i < $squareSequence.length; i++) {
      const colorToAssign = randomColor[i];
      const singleSquare =$lis[$squareSequence[i]];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${colorToAssign}`);
      }, delay);
      delay += 500;
    } clearDisplay();
  }

  function clearDisplay(){
    for (var i = 0; i < $lis.length; i++) {
      const singleSquare = $lis[i];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${originColor}`);
      },  2000);
      userPlay();
    }
  }

  function userPlay(){
    $square.off('click');
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

  function comparison(){
    const arr1 = $userArray.toString();
    const arr2 = $squareSequence.toString();
    if (arr1 === arr2){
      $matchStatus.text('IT\'S A MATCH!');
      $score.text(`${score += 1}`);
      setTimeout(()=> {
        play();
      }, 4000);
    } else {
      $matchStatus.text('GAME OVER');
      setTimeout(()=>{
        gameReset();
      }, 1500);
    }
  }


  function gameReset(){
    $score.text('0');
    $matchStatus.text('Try Again!');
    score = 0;
    delay = 0;
    $userArray =[];
    $squareSequence =[];
    randomColor=[];
  }


});
