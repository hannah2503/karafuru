$(() => {

  let level = 0;
  let score = 0;
  let delay = 100;
  let pattern = 3;
  let $userArray = [];
  let $squareSequence = [];
  let randomColor = [];
  let colors = [ '#9C89B8', '#F0A6CA','#EFC3E6', '#B8BEDD'];

  const $level = $('.level');
  const $score = $('.score');
  const $matchStatus = $('.matchStatus');
  const $square = $('.square');
  const $lis = $('li');
  const $button = $('button');
  const originColor = '#FE938C';

  const $star = $('.star');
  const $optionone = $('.option-one');
  const $optiontwo = $('.option-two');
  const $instructions = $('.instructions');
  const $about = $('.about');
  const $close = $('.close');

  $star.on('click', function() {
    $optionone.toggle();
    $optiontwo.toggle();
  });

  $optionone.on('click', function() {
    $instructions.toggle('slow');
    $optionone.toggle();
    $optiontwo.toggle();
  });

  $close.on('click', function() {
    $instructions.hide();
  });

  $optiontwo.on('click', function() {
    $about.toggle('slow');
    $optionone.toggle();
    $optiontwo.toggle();
  });

  $close.on('click', function() {
    $about.hide();
  });

  $button.on('click', play);

  function play(){
    $matchStatus.css('display', 'block').text('PLAY');
    setTimeout(()=>{
      $matchStatus.css('display', 'none');
    },500);
    setTimeout(()=>{
      computerPlay();
      $button.css('display', 'none');
    }, 500);
  }

  function computerPlay(){
    function shuffleLis(){
      for (let i = 0; i < pattern; i++){
        $squareSequence.push(Math.floor(Math.random()* 8)+1);
      }
    }
    shuffleLis();
    for (var j = 0; j < pattern; j++) {
      const newRandom = Math.floor(Math.random() * colors.length);
      randomColor.push(colors[newRandom]);
      colors.splice(newRandom, 1);
    }
    colors = ['#899D78', '#F0BCD4','#DA4167', '#8A1C7C', '#1F0322'];
    for (var i = 0; i < $squareSequence.length; i++) {
      const colorToAssign = randomColor[i];
      const singleSquare =$lis[$squareSequence[i]];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${colorToAssign}`);
        $(singleSquare).addClass('animated', 'tada');
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
    }
  }

  userPlay();

  function userPlay(){
    $square.off('click');
    $square.on('click', function(){
      $(this).css('background-color','#9C89B8').fadeIn(500).fadeOut(500).fadeIn(200);
      $userArray.push(parseInt($(this).attr('id')));
      if($userArray.length === pattern){
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
      setTimeout(() => {
        $matchStatus.css('display', 'block').text('IT\'S A MATCH');
        $score.text(`${score += 1}`);
      }, 1000);
      setTimeout(()=> {
        $matchStatus.css('display', 'none');
        clearDisplay();
        reset();
      }, 1500);
      setTimeout(()=>{
        play();
      },3000);
    } else {
      setTimeout(()=>{
        $matchStatus.css('display', 'block').text('GAME OVER');
      }, 1000);
      $matchStatus.css('display', 'none');
      setTimeout(()=>{
        gameReset();

      }, 2500);
    }
  }

  function reset (){
    if (score % 4 === 0 ){
      pattern += 1;
      level+=1;
      $matchStatus.text('');
      delay = 0;
      $level.text(`${level}`);
      $userArray = [];
      $squareSequence =[];
      randomColor = [];
    }else {
      $matchStatus.text('');
      delay = 0;
      $level.text(`${level}`);
      $userArray = [];
      $squareSequence =[];
      randomColor = [];
    }
  }

  function gameReset(){
    clearDisplay();
    $score.text('0');
    $level.text('0');
    $matchStatus.text('TRY AGAIN').fadeOut(3000);
    score = 0;
    level = 0;
    pattern = 3;
    delay = 0;
    $userArray =[];
    $squareSequence =[];
    randomColor=[];
    $button.css('display', 'block');

  }

});
