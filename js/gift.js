game.newLoop('gift', function () {
  default_home();//отображение ui, фон, заяц
  buy_bg.draw();//темный фон
  gift_open_anim.drawToFrame(13); //запуск анимации до 13 кадра
  ui_gift_noactive.alpha = 1; //ui подарок становиться неактивным

  hover_on_btn(ui_close_normal, ui_close_hover, ui_close_noactive); //ховер кнопки выхода
  //если у нас открыт последний кадр, тогда показать отображение выигрыша в подарке
  if (gift_last_frame == gift_open_anim.getFrame()) {
    //если пушка не куплена/выиграна, то тогда пушка может быть в подарке, если рандоме будет 1
    if (!bunny_gun_up_buy === true && gift_gun_base == 1) {
      bunny_gun_up_buy = true; //больше нельзя выиграть и купить пушку
      gift_buy_gun_bullet.alpha = 1; //видимость пушки
    }
    ui_close_normal.x = frame.x + 200;
    ui_close_hover.x = frame.x + 200;
    ui_close.draw(); //кнопка закрытия попапа с подарком
    all_style_txt(gift_coin_num, width / 2 - 10, height / 2 + 50, "black", 50, 1); //coin num
    all_style_txt(gift_bullet_num, width / 2 - 93, height / 2 - 80, "black", 50, 1); //bullet_num

    //отрисовка в подарке
    gift_bullet_img.draw();
    gift_coin_img.draw();
    gift_buy_gun_bullet.draw();
  }

  //при нажатии на кнопку выхода
  if (mouse.isInStatic(ui_close_normal.getStaticBox()) && mouse.isPress("LEFT") || key.isDown("SPACE")) {
    if (gift_buy_gun_bullet.alpha == 1) { //если выпала пушка
      bullet_sum += 3; //то +3 пули
    }
    game.setLoop('home'); //выход в лобби
    bullet_sum += gift_bullet_num; //пули в подарке добавляются к общим пулям
    coin_counter += gift_coin_num;//монеты в подарке добавляются к общим монетам
  }
})