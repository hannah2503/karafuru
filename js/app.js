$(() => {

  let $userArray = [];
  let $squareSequence = [];
  let delay = 0;
  let pattern = 3;
  const $level = $('.level');
  let level = 0;
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
    $button.css('display', 'none');
  }

  function computerPlay(){
    function shuffleLis(){
      for (let i = 0; i < pattern; i++){
        $squareSequence.push(Math.floor(Math.random()* 8)+1);
      }
    } shuffleLis();
    console.log($squareSequence);
    for (var j = 0; j < pattern; j++) {
      const newRandom = Math.floor(Math.random() * colors.length);
      randomColor.push(colors[newRandom]);
      colors.splice(newRandom, 1);
    }
    colors = ['#9C89B8', '#F0A6CA','#EFC3E6', '#F0E6EF', '#B8BEDD'];
    for (var i = 0; i < $squareSequence.length; i++) {
      const colorToAssign = randomColor[i];
      const singleSquare =$lis[$squareSequence[i]];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${colorToAssign}`).fadeIn(600).fadeOut(500).css('background-color',  `${originColor}`).fadeIn(200);
      }, delay);
      delay += 500;
    } clearDisplay();
  }


  function clearDisplay(){
    for (var i = 0; i < $lis.length; i++) {
      const singleSquare = $lis[i];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${originColor}`);
      },  1500);
    }
  }

  userPlay();

  function userPlay(){
    $square.off('click');
    $square.on('click', function(){
      $(this).css('background-color','#9C89B8').fadeIn(500).fadeOut(500).fadeIn(200);
      console.log(this);
      $userArray.push(parseInt($(this).attr('id')));
      if($userArray.length === pattern){
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
        clearDisplay();
        reset();
      }, 500);
      setTimeout(()=>{
        play();
      },2000);
    } else {
      $matchStatus.text('GAME OVER');
      setTimeout(()=>{
        gameReset();
      }, 2000);
    }
  }

  function reset (){
    if (score % 4 === 0 ){
      pattern += 1;
    }
    $matchStatus.text('');
    delay = 0;
    $level.text(`${level += 1}`);
    $userArray =[];
    $squareSequence =[];
    randomColor = [];

  }

  function gameReset(){
    clearDisplay();
    $score.text('0');
    $level.text('0');
    $matchStatus.text('Try Again!');
    score = 0;
    pattern = 0;
    delay = 0;
    $userArray =[];
    $squareSequence =[];
    randomColor=[];
    $button.css('display', 'block');
  }


});
