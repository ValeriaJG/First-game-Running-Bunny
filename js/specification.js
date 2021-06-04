game.newLoop('specification', function () { //начало игрового цыкла
  default_home(); //ui, фон, заяц
  buy_bg.draw(); //темный фон
  frame.draw(); //фрейм
  specification_txt.draw();
  ui_close.draw(); // кнопка закрытия окна покупки
  ui_close_normal.x = frame.x + 30;
  ui_close_hover.x = frame.x + 30;

  //содержимое правил
  var txt_1_specification = "Jump: W or ↑    Down: S or ↓\n\nShoot base cannon:\nSpace + D or Space + →\n\nShoot double cannon:\nSpace + D + W or Space + → + ↑"; //копируем стиль из переменной
  txt_paragraph(frame, txt_1_specification, 390, 140, "center", 45)
 
  var txt_2_specification = "Если нашли баг в игре, пожалуста,\nнапишите об этом на почту eagle.dev.it@gmail.com"; 
  txt_paragraph(frame, txt_2_specification, 390, 520, "center", 25)

  // ховер кнопки выхода
  hover_on_btn(ui_close_normal, ui_close_hover, ui_close_noactive);
  
  // закрыть окно правил
  if (mouse.isInStatic(ui_close_normal.getStaticBox()) && mouse.isPress("LEFT") || key.isDown("SPACE")) {
    game.setLoop('home');
  }
});