game.newLoop('buy', function () { //начало игрового цыкла
  default_home(); //ui, фон, заяц
  buy_bg.draw(); //темный фон
  frame.draw(); //фрейм
  store_txt.draw();
  ui_close.draw(); // кнопка закрытия окна покупки
  ui_close_normal.x = frame.x + 30;
  ui_close_hover.x = frame.x + 30;
  //buy base gun
  var buy_gun_bullet = game.newImageObject({ //базовая пушка
    file: "img/buy_gun_bullet.png",
    x: frame.x + 40, y: frame.y + 120
  });
  //buy_doublegun_bullet
  var buy_doublegun_bullet = game.newImageObject({
    file: "img/buy_doublegun_bullet.png",
    x: frame.x + 610, y: frame.y + 120
  });

  store_style_txt.alpha = 1; //включаем видимость на стиле
  store_style_txt.size = 50; // задаем размер стилю

  var price_base_gun = store_style_txt; //копируем стиль из переменной
  price_base_gun.text = "200";//цена за покупку одинарной пушки
  price_base_gun.x = buy_gun_bullet.x + 343; //задаем позицию по х
  price_base_gun.y = buy_gun_bullet.y + 50; //задаем позицию по y

  var btn_buy_coin = game.newImageObject({ //монета
    file: "img/coin.png",
    x: price_base_gun.x + 103, y: price_base_gun.y - 10,
    w: 116 / 2.5, h: 111 / 2.5
  });

  var base_gun_coin = btn_buy_coin; //монета для базовой пушки
  base_gun_coin.x = price_base_gun.x + 103; // меняем позицию монеты

  price_base_gun.draw(); //отрисовка цены базовой бушки
  base_gun_coin.draw(); //отрисовка монеты базовой бушки
  txt_paragraph(buy_gun_bullet, "x1\n\nx30", 0, 0, "left", 50); //количество при покупке базовой пушки

  var price_double_gun = store_style_txt;  //цена двойной пушки
  price_double_gun.text = "400";
  price_double_gun.x = buy_doublegun_bullet.x + 339;
  price_double_gun.y = buy_doublegun_bullet.y + 50;

  var double_gun_coin = btn_buy_coin; //монета возле цены двойной пушки
  double_gun_coin.x = price_double_gun.x + 103;

  txt_paragraph(buy_doublegun_bullet, "x1\n\nx30", 0, 0, "left", 50);//количество при покупке двойной пушки

  buy_gun_bullet.draw(); //отрисовка базовой пушки 
  btn_buy_coin.draw(); // отрисовка монеты
  btn_buy.draw();//отрисовка кнопки

  buy_doublegun_bullet.draw();//отрисовка количества при покупке двойной пушки
  price_double_gun.draw();//отрисовка цены двойной пушки
  btn_buy_double_gun.draw(); //отрисовка кнопки

  buy_ui_minus.draw(); //отрисовка кнопок
  buy_ui_plus.draw(); //отрисовка кнопок
  buy_bullet_price.draw(); //отрисовка цены за пули
  buy_bullet_img.draw();//отрисовка пули
  buy_only_bullet_play_video.draw();//отрисовка кнопки просмотра видео
  buy_only_bullet.draw(); //отрисовка кнопки
  buy_bullet_x.draw(); //отрисовка множителя пуль

  // ховер кнопок
  hover_on_btn(ui_close_normal, ui_close_hover, ui_close_noactive);//выхода
  hover_on_btn(btn_buy_normal, btn_buy_hover, btn_buy_noactive); //покупка базовой пушки
  hover_on_btn(btn_buy_double_gun_normal, btn_buy_double_gun_hover, btn_buy_double_gun_noactive); //покупка двойной пушки
  hover_on_btn(buy_ui_plus_normal, buy_ui_plus_hover, buy_ui_plus_noactive); //покупка двойной пушки
  hover_on_btn(buy_ui_minus_normal, buy_ui_minus_hover, buy_ui_minus_noactive); //покупка двойной пушки
  hover_on_btn(buy_only_bullet_btn_normal, buy_only_bullet_btn_hover, buy_only_bullet_btn_noactive); //покупка двойной пушки
  hover_on_btn(buy_bullet_btn_play_video_normal, buy_bullet_btn_play_video_hover, buy_bullet_btn_play_video_noactive); //покупка двойной пушки

  // закрыть окно покупки
  if (mouse.isInStatic(ui_close_normal.getStaticBox()) && mouse.isPress("LEFT") || key.isDown("SPACE")) {
    price_double_gun.alpha = 0;
    game.setLoop('home');
  }

  //BASE GUN
  // если нету достаточного количества монет, то купить будет невозможно
  if (coin_counter < 200 || bunny_gun_up_buy == true) {
    btn_buy_noactive.alpha = 1;
    btn_buy_hover.alpha = 0;
    btn_buy_normal.alpha = 0;
  } else {
    btn_buy_normal.alpha = 1;
    btn_buy_noactive.alpha = 0;
  }
  //кнопка покупки базовой пушки
  if (btn_buy_noactive.alpha == 0 && mouse.isInStatic(btn_buy_normal.getStaticBox()) && mouse.isPress("LEFT") && coin_counter >= 200) {
    btn_buy_noactive.alpha = 1;
    if (btn_buy_noactive.alpha == 1) {
      btn_buy_hover.alpha = 0;
      btn_buy_normal.alpha = 0;
      coin_counter -= 200;
      bullet_sum += 30;
      bunny_gun_up_buy = true;
    }
  }

  //DOUBLE GUN
  //если не хватает монет или если у нас активка пушка или если базовая пушка не активна
  //тогда мы не можем купить пушку, в противном случае, можем
  if (coin_counter < 400 || double_gun_buy == true || bunny_gun_up_buy == false) {
    btn_buy_double_gun_noactive.alpha = 1;
  } else {
    btn_buy_double_gun_normal.alpha = 1;
    btn_buy_double_gun_noactive.alpha = 0;
  }
  //кнопка покупки пушки и сразу деактивируем ее, что бы больше не покупать
  if (btn_buy_double_gun_noactive.alpha == 0 && mouse.isInStatic(btn_buy_double_gun_normal.getStaticBox()) && mouse.isPress("LEFT") && coin_counter >= 400) {
    btn_buy_double_gun_noactive.alpha = 1;
    if (btn_buy_double_gun_noactive.alpha == 1) {
      btn_buy_double_gun_hover.alpha = 0;
      btn_buy_double_gun_normal.alpha = 0;
      coin_counter -= 400;
      bullet_sum += 30;
      double_gun_buy = true;
    }
  }

  //BUY ONLY BULLET
  //если уже есть базовая пушка, тогда можно покупать пули
  if (bunny_gun_up_buy == true) {
    buy_ui_plus_normal.alpha = 1;
    buy_ui_plus_noactive.alpha = 0;
    buy_only_bullet_btn_normal.alpha = 1;
    buy_only_bullet_btn_noactive.alpha = 0;
    buy_bullet_btn_play_video_normal.alpha = 1
    buy_bullet_btn_play_video_noactive.alpha = 0
  } else {
    buy_ui_plus_noactive.alpha = 1;
    buy_only_bullet_btn_noactive.alpha = 1;
    buy_bullet_btn_play_video_noactive.alpha = 1
  }

  //изменения множителя пуль и кнопок(актив не актив) при определенной цене
  if (buy_bullet_price.text == 50 && coin_counter >= 50) {
    buy_bullet_price.x = buy_ui_minus.x + 140;
    buy_ui_minus_noactive.alpha = 1;
    buy_ui_minus_normal.alpha = 0;
    buy_bullet_x.text = "x10";
  } else if (buy_bullet_price.text == 100 && coin_counter >= 100) {
    buy_ui_minus_noactive.alpha = 0;
    buy_ui_minus_normal.alpha = 1;
    buy_bullet_price.x = buy_ui_minus.x + 125;
    buy_bullet_x.text = "x20";
  } else if (buy_bullet_price.text == 150 && coin_counter >= 150) {
    buy_ui_plus_normal.alpha = 1;
    buy_ui_plus_noactive.alpha = 0;
    buy_bullet_x.text = "x30";
  } else if (buy_bullet_price.text == 200 && coin_counter >= 200) {
    buy_ui_plus_normal.alpha = 0;
    buy_ui_plus_noactive.alpha = 1;
    buy_bullet_x.text = "x40";
  } else if (buy_bullet_price.text >= 50 && coin_counter < 50) {
    //если у нас меньше монет, чем стоит пушка, то тогда кнопки +- неактивны
    buy_bullet_price.x = buy_ui_minus.x + 140;
    buy_ui_minus_noactive.alpha = 1;
    buy_ui_minus_normal.alpha = 0;
    buy_ui_plus_normal.alpha = 0;
    buy_ui_plus_noactive.alpha = 1;
    buy_bullet_x.text = "x10";
    buy_bullet_price.text = "50";
  }

  //если у нас меньше денег чем нужно заплатить, то дальше увеличивать количество пуль нельзя
  if (buy_bullet_price.text == 50 && coin_counter < 100 ||
    buy_bullet_price.text == 100 && coin_counter < 150 ||
    buy_bullet_price.text == 150 && coin_counter < 200 ||
    buy_bullet_price.text == 200 && coin_counter < 201) {
    buy_ui_plus_noactive.alpha = 1;
  }

  //PLUS меняем значение цены по клику
  if (mouse.isInStatic(buy_ui_plus_normal.getStaticBox()) && buy_ui_plus_noactive.alpha == 0 && mouse.isPress("LEFT") && coin_counter >= 50) {
    if (buy_bullet_price.text == 50) {
      buy_bullet_price.text = 100;
      buy_bullet_price.x = buy_ui_minus.x + 125; //меняем позицию, что бы 50 было по центру
      //если у нас меньше или = 200, тогда при нажатии на плюс, цифры будет меняться на +50
    } else if (buy_bullet_price.text <= 200) {
      buy_bullet_price.text += 50
    }
  }

  // TOUCH minus меняем значение цены по клику
  if (buy_ui_minus_noactive.alpha == 0 && mouse.isInStatic(buy_ui_minus_normal.getStaticBox()) && mouse.isPress("LEFT") && coin_counter >= 50) {
    buy_ui_plus_normal.alpha = 1;
    buy_ui_plus_noactive.alpha = 0;
    if (buy_bullet_price.text == 100) {
      buy_bullet_price.text = 50;
      buy_bullet_price.x = buy_ui_minus.x + 140;
    } else if (buy_bullet_price.text <= 250) {
      buy_bullet_price.text -= 50;
    }
  }

  // если у нас меньше монет чем стоит пул, тогда кнопка покупки не активна
  if (buy_bullet_price.text > coin_counter) {
    buy_only_bullet_btn_noactive.alpha = 1;
  }

  // кнопка покупки пуль
  if (buy_only_bullet_btn_noactive.alpha == 0 && mouse.isInStatic(buy_only_bullet_btn_normal.getStaticBox()) && mouse.isPress("LEFT") && coin_counter >= 50) {
    if (buy_bullet_price.text == 50) {
      coin_counter -= 50;
      bullet_sum += 10;
    } else if (buy_bullet_price.text == 100) {
      coin_counter -= 100;
      bullet_sum += 20;
    } else if (buy_bullet_price.text == 150) {
      coin_counter -= 150;
      bullet_sum += 30;
    } else if (buy_bullet_price.text == 200) {
      coin_counter -= 200;
      bullet_sum += 40;
    }
  }

  // BTN PLAY VIDEO
  if (mouse.isInStatic(buy_bullet_btn_play_video_normal.getStaticBox()) && buy_bullet_btn_play_video_noactive.alpha == 0 && mouse.isPress("LEFT")) {
    //будет условие для видео
  }
});