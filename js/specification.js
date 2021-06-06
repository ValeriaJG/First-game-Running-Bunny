
function for_specification() {
  default_home(); //ui, фон, заяц
  buy_bg.draw(); //темный фон
  frame.draw(); //фрейм
  specification_txt.draw();
  ui_close.draw(); // кнопка закрытия окна покупки
  ui_close_normal.x = frame.x + 30;
  ui_close_hover.x = frame.x + 30;

  ui_left.draw(); // кнопка закрытия окна покупки
  ui_right.draw(); // кнопка закрытия окна покупки

  // ховер кнопки выхода
  hover_on_btn(ui_close_normal, ui_close_hover, ui_close_noactive);
  hover_on_btn(ui_left_normal, ui_left_hover, ui_left_noactive);
  hover_on_btn(ui_right_normal, ui_right_hover, ui_right_noactive);

  // закрыть окно правил
  if (mouse.isInStatic(ui_close_normal.getStaticBox()) && mouse.isPress("LEFT")) {
    game.setLoop('home');
  }
}

game.newLoop('specification_page_1', function () { //начало игрового цыкла
  for_specification();
  
  // page 1
  var txt_1_specification = "Jump: W or ↑   Down: S or ↓"; //копируем стиль из переменной
  txt_paragraph(frame, txt_1_specification, 390, 140, "center", 45)
  var txt_2_specification = "\n\nShoot base cannon:\nSpace + D or Space + →\n\nShoot double cannon:\nSpace + D + W or Space + → + ↑"; //копируем стиль из переменной
  txt_paragraph(frame, txt_2_specification, 140, 160, "left", 45)
  var txt_3_specification = "If you find a bug in the game, please,\n write about it by email eagle.dev.it@gmail.com";
  txt_paragraph(frame, txt_3_specification, 390, 520, "center", 25)

  buy_gun_bullet.x = frame.x + 150;
  buy_gun_bullet.y = frame.y + 240;
  buy_gun_bullet.w = 189 / 1.4;
  buy_gun_bullet.h = 179 / 1.4;

  buy_doublegun_bullet.x = frame.x + 150;
  buy_doublegun_bullet.y = frame.y + 390;
  buy_doublegun_bullet.w = 203 / 1.4;
  buy_doublegun_bullet.h = 185 / 1.4;

  buy_doublegun_bullet.draw()
  buy_gun_bullet.draw()

  if (mouse.isInStatic(ui_left_normal.getStaticBox()) && mouse.isPress("LEFT") || 
  mouse.isInStatic(ui_right_normal.getStaticBox()) && mouse.isPress("LEFT")) {
    game.setLoop('specification_page_2');
  }
});

game.newLoop('specification_page_2', function () { //начало игрового цыкла
  for_specification()
  specification_gift.draw();
  specification_gun.draw();
  specification_bullet.draw();
  specification_coin.draw();
  var txt_1_specification = "The     may contain a       ,      \n\nand     , for which you can buy a gun\n\nand bullets in the store."; //копируем стиль из переменной
  txt_paragraph(frame, txt_1_specification, 385, 180, "center", 45);
  var txt_3_specification = "If you find a bug in the game, please,\n write about it by email eagle.dev.it@gmail.com";
  txt_paragraph(frame, txt_3_specification, 390, 520, "center", 25);
  
  if (mouse.isInStatic(ui_left_normal.getStaticBox()) && mouse.isPress("LEFT") || 
  mouse.isInStatic(ui_right_normal.getStaticBox()) && mouse.isPress("LEFT")) {
    game.setLoop('specification_page_1');
  }

})