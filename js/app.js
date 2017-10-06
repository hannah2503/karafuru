$(() => {

  //testing the click and color change
  console.log('working');

  const $square = $('.square');

  $square.on('click' , function(){
    console.log('clicked!');

  });

  $(function() {
    $('.square').click(function(){
      $(this).css('background', 'yellow');

    });
  });

  //play button starts game (i.e starts random squence )
  const $play = $('.button');

  $play.on('click', function() {
    console.log('play!');
    //random sequence function
  });
  //random sequence
  
      //grab the id of each square - console log
      // put the ids into an array
      //  loop through each id in the array in a random order and change the color for a couple of seconds - apply change color function to each element in the array - the change color function is based on a function which selects a random color
      // remember the order  - store the random order in an array for comparison

  //generate random color function
      //set an array of colours
      //use math.random to create a changing order of colors  and apply them to the ids

  //user clicks the sequence and computer stores the input

  //comparison between computer sequence and user input - if correct new sequence plays, if not, alert game over, try again.

});
