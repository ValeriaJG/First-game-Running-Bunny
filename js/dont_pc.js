game.newLoop('dont_PC', function () {
  bg_base.draw();
  bunny_idle.draw();

  pjs.brush.drawMultiText({
    text: "Sorry, this game is\nfor wide screens only",
    x: width / 2, y: height / 2,
    color: "white", align: "center",
    font: "Comic Sans MS",
    style: "bold", size: 30,
    strokeColor: "#000", strokeWidth: 2
  })
})