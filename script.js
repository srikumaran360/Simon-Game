var colors=["red","blue","green","yellow"];
var pattern=[];
var user_pattern=[];
var level=0;
var started=false;
function generate_pattern()
{
  user_pattern=[];
  var color_index=Math.floor((Math.random()*4));
  var color=colors[color_index];
  pattern.push(color);
  level++;
  show_sequence(color);
}
function show_sequence(color)
{
  $("."+color).fadeIn(100).fadeOut(100).fadeIn(100);
  play_sound(color);
  $("h1").text("Level "+level);
}
$(".btn").on("click",function(){
var user_color=$(this).attr("id");
user_pattern.push(user_color);
play_sound(user_color);
animate_press(user_color);
checkAnswer(user_pattern.length-1);
});
function animate_press(user_color)
{
  $("#"+user_color).addClass("pressed");
  setTimeout(function(){
    $("#"+user_color).removeClass("pressed");},100);
}
$(document).on("keypress",function(){
  if(started===false){
  started=true;
  generate_pattern();
}
});
function play_sound(sound){
  var audio=new Audio("sounds/"+sound+".mp3");
  audio.play();
}
function checkAnswer(index)
{
  if(user_pattern[index]===pattern[index])
  {
    if(user_pattern.length===pattern.length)
    {
      setTimeout(function(){generate_pattern();},1000);
    }
  }
  else
  {
    $("body").addClass("game-over");
    play_sound("wrong");
    $("h1").text("Game Over, Press Any Key To Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}
function startOver()
{
  level=0;
  pattern=[];
  started=false;
}
