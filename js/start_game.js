//столкновение объекта(зайца) с преградой 
function bunny_intersect(person) {
  if ((bunny_run.isVisible(true) && bunny_run.isIntersect(person))
    || bunny_jump.isVisible(true) && bunny_jump.isIntersect(person)
    || bunny_gun_run.isVisible(true) && bunny_gun_run.isIntersect(person)
    || bunny_double_gun.isVisible(true) && bunny_double_gun.isIntersect(person)
    || bunny_gun_up.isVisible(true) && bunny_gun_up.isIntersect(person)
    || bunny_down.isVisible(true) && bunny_down.isIntersect(person)) {
    //после столкновения с приградой
    bg_base.x = 0; //позиция фона обнуляется
    game.setLoop('home'); //переход домой(лобби)
  }
}

//изменения скорости движения intersect - (подарка, монеты, куста, лисицы, орла),
//когда счет достигает определенного значения
function speed_intersect(intersect, num_1, num_2, num_3, num_4) {
  if (counter >= 0 && counter <= 700) {
    intersect.x -= num_1;
  } else if (counter > 700 && counter <= 6000) {
    intersect.x -= num_2;
  } else if (counter > 6000 && counter <= 7000) {
    intersect.x -= num_3;
  } else if (counter > 7000) {
    intersect.x -= num_4;
  }
}

//увеличение скорости пули, когда счет достигает определенного значения
function speed_bullet(bullet) {
  if (counter >= 0 && counter <= 700) {
    bullet.x += 25;
    bullet.y -= 7;
  } else if (counter > 700 && counter <= 6000) {
    bullet.x += 30;
    bullet.y -= 8;
  } else if (counter > 6000 && counter <= 7000) {
    bullet.x += 35;
    bullet.y -= 10;
  } else {
    bullet.x += 40;
    bullet.y -= 8;
  }
}

//начало игрового цикла
game.newLoop('start', function () {
  //переменные, по которым можем менять значения пуль внутри функции
  var bullet_name_up;

  //при нажатии на клавишу, будет происходить смена анимаций зайца
  key_touch();

  // счет очков за игру
  var counter_run = 1 / 2;
  counter += counter_run;

  //условие для записи в лучшый счет при старте игры
  if (counter > best_counter) {
    best_counter = counter;
    localStorage.setItem('best_counter', best_counter); //сохранение лучшего счета
  }

  //смена фона
  if (counter >= 0 && counter <= 500 ||
    counter >= 1301 && counter <= 2000 ||
    counter >= 3001 && counter <= 4000 ||
    counter >= 5501 && counter <= 7000) {
    bg_base.file = "img/bg_base.jpg";
  } else if (counter >= 501 && counter <= 1300 ||
    counter >= 2001 && counter <= 3000 ||
    counter >= 4001 && counter <= 5500 ||
    counter >= 7001 && counter <= 9500) {
    bg_base.file = "img/bg_night.jpg"
  }

  //цыкл и скорость фона
  if (counter >= 0 && counter <= 700) {
    presets.bgCycle(bg_base, -10);
  } else if (counter > 700 && counter <= 6000) {
    presets.bgCycle(bg_base, -15);
  } else if (counter > 6000 && counter <= 7000) {
    presets.bgCycle(bg_base, -18);
  } else if (counter > 7000) {
    presets.bgCycle(bg_base, -20);
  }

  bg_base.draw(); // отрисовка фона

  //неактивные кнопки меню(+) и подарка во время игры
  ui_gift_normal.alpha = 0;
  ui_gift_noactive.alpha = 1;
  ui_plus_noactive.alpha = 1;
  ui_plus_noactive.draw();

  //позиция вылета пули для разных размерах экрана после столкновения с преградой
  function bullet_up_y_change_width_screen(bullet_name_up, bullet_x) {
    if (width >= 1441 && width <= 2560) {
      bullet_name_up.y = 670;
    } else if (width >= 1025 && width <= 1440) {
      bullet_name_up.y = 640;
    } else {
      bullet_name_up.y = 620;
    }
    bullet_name_up.x = bullet_x;
  }

  //попадание пули в преграду (куст, орел, лисица) или коснется правого края экрана
  function shot_bullet_intersect(bullet_name) {
    //если пуля коснется правого края экрана
    if (bullet_name.x + bullet_name.w > width) {
      bullet_up_y_change_width_screen(bullet_name_up, bullet_x); //станет на свое исходное место,
      bullet_sum -= 1; //-1 пуля
    }

    if (bullet_name.isVisible(true) && bullet_name.isIntersect(bush[i])) {
      counter += 3; //+3 очка
      bullet_sum -= 1; //-1 пуля
      bullet_up_y_change_width_screen(bullet_name_up, bullet_x); //позиция пули 
      bush[i].setVisible(false); //пропадание преграды
      bush[i].alpha = 0; //пропадание преграды
    } else if ((bullet_name.isVisible(true) && bullet_name.isIntersect(eagle[i]))) {
      counter += 6;
      bullet_sum -= 1;
      bullet_up_y_change_width_screen(bullet_name_up, bullet_x)
      eagle[i].setVisible(false);
      eagle[i].alpha = 0;
    } else if ((bullet_name.isVisible(true) && bullet_name.isIntersect(fox[i]))) {
      counter += 9;
      bullet_sum -= 1;
      bullet_up_y_change_width_screen(bullet_name_up, bullet_x)
      fox[i].setVisible(false);
      fox[i].alpha = 0;
    }
  }

  //появление преграды после того как она перешла за границы экрана
  function appearance_obstacle(name_block, number, counter_plus) {
    if (name_block.x + name_block.w < 0) {
      // добавление очков, если заяц не столкнулся с преградой и преграда не была убита пушкой
      if (name_block.alpha == 1) {
        counter += counter_plus;
      }
      //отображаем нашу преграду, что бы она смогла появиться
      name_block.setVisible(true);
      name_block.alpha = 1;

      //после того как преграда оказалась в координате 0,
      //указываем позицию, с которой она должна появится в определенном счете
      if (counter <= 699) {
        name_block.x = number;
      } else if (counter >= 700 && counter <= 1649) {
        name_block.x = number + 1000;
      } else if (counter >= 1650 && counter <= 1899) {
        name_block.x = number + 2000;
      } else if (counter >= 1900 && counter <= 1999) {
        name_block.x = number + 800;
      } else if (counter >= 2000 && counter <= 2499) {
        name_block.x = number + 2800;
      } else if (counter >= 2500 && counter <= 2999) {
        name_block.x = number + 3300;
      } else if (counter >= 3000) {
        name_block.x = number + 3700; //что бы нормально поялялись после прохода цикла
      }
    }
  }

  //повторное появление после попадания за пределы окна
  function gift_and_coin_screen(prize, number_x) {
    if (prize.x + prize.w < 0) {
      prize.x = number_x;
      prize.setVisible(true);
    }
  }
  function bunny_intersect_coin_gift(intersect, plus_counter_coin, plus_counter_gift, counter_plus) {
    if ((bunny_run.isVisible(true) && bunny_run.isIntersect(intersect))
      || bunny_jump.isVisible(true) && bunny_jump.isIntersect(intersect)
      || bunny_idle.isVisible(true) && bunny_idle.isIntersect(intersect)
      || bunny_gun_run.isVisible(true) && bunny_gun_run.isIntersect(intersect)
      || bunny_double_gun.isVisible(true) && bunny_double_gun.isIntersect(intersect)
      || bunny_gun_up.isVisible(true) && bunny_gun_up.isIntersect(intersect)
      || bunny_down.isVisible(true) && bunny_down.isIntersect(intersect)) {
      coin_counter += plus_counter_coin;
      gift_counter += plus_counter_gift;
      intersect.setVisible(false);
      counter += counter_plus;
    }
  }

  // Если пушка активна и если у нас больше одной пули, то можно стрелять
  if (bunny_gun_up_buy === true && bullet_sum >= 1 && key.isDown("SPACE") && key.isDown("D") ||
    key.isDown("SPACE") && key.isDown("RIGHT")) {

    //цикл прямой одинарной пули
    for (var i in bullet_run) {
      bullet_run[i].y = 630
      // меняем значения параметров в функции bullet_up_y_change_width_screen
      bullet_name_up = bullet_run[i];
      bullet_x = 200;
      bullet_run[i].setVisible(true);

      if (bunny_gun_up_buy === true) {
        bullet_run[i].setVisible(true);
      } else {
        bullet_run[i].setVisible(false);
        bullet_up_y_change_width_screen(bullet_run[i], 630);
      }

      //скорость пули
      if (counter >= 0 && counter <= 700) {
        bullet_run[i].x += 25;
      } else if (counter > 700 && counter <= 6000) {
        bullet_run[i].x += 30;
      } else if (counter > 6000 && counter <= 7000) {
        bullet_run[i].x += 35;
      } else {
        bullet_run[i].x += 40;
      }
      //попадания пули в преграду или о край экрана
      shot_bullet_intersect(bullet_run[i]);
    }
    bullet_run[i].draw(); //отрисовка пули

    //появление вверхней пули
  } else if (bullet_sum >= 1 && key.isDown("SPACE") && key.isDown("W") ||
    key.isDown("SPACE") && key.isDown("UP")) {

    // BULLET UP
    for (var i in bullet_up) {
      // меняем значения в функции bullet_up_y_change_width_screen
      bullet_name_up = bullet_up[i];
      bullet_x = 110;

      // Если пушка не активна, то пули не выходят
      if (bunny_gun_up_buy === true) {
        bullet_up[i].setVisible(true);
      } else {
        bullet_up[i].setVisible(false);
        bullet_up_y_change_width_screen(bullet_up[i], 110);
      }
      speed_bullet(bullet_up[i]);//скорость пули
      shot_bullet_intersect(bullet_up[i]); //попадания пули в преграду или о край экрана
    }
    bullet_up[i].draw(); //отрисовка пули
  }

  //двойная пуля
  if (bullet_sum >= 1 && double_gun_buy == true && key.isDown("SPACE") &&
    key.isDown("W") && key.isDown("D") || double_gun_buy == true &&
    key.isDown("SPACE") && key.isDown("UP") && key.isDown("RIGHT")) {

    for (var i in double_bullet) {
      // меняем значения в функции bullet_up_y_change_width_screen
      bullet_name_up = double_bullet[i];
      bullet_x = 200;

      // Если пушка не активна, то пули не отображаются
      if (double_gun_buy === true) {
        double_bullet[i].setVisible(true);
      } else {
        double_bullet[i].setVisible(false);
        bullet_up_y_change_width_screen(double_bullet[i], 200);
      }
      speed_bullet(double_bullet[i]); //speed
      shot_bullet_intersect(double_bullet[i]);//попадания пули в преграду или о край экрана
    }
    double_bullet[i].draw();//отрисовка пули
  }
  //если есть двойная пушка и пули и нажать комбирацию клавиш, то появится заяц с пушкой
  //начальная позиция пуль при нажатии, после того как отпустили кнопку выстрела
  if (!((double_gun_buy == true && key.isDown("SPACE") && key.isDown("W") && key.isDown("D")) ||
    double_gun_buy == true && key.isDown("SPACE") && key.isDown("UP") && key.isDown("RIGHT"))) {
    for (var i in double_bullet) {
      bullet_up_y_change_width_screen(double_bullet[i], 200);
    }
  }
  if (!(key.isDown("SPACE") && key.isDown("W") || key.isDown("SPACE") && key.isDown("UP"))) {
    for (var i in bullet_up) {
      bullet_up_y_change_width_screen(bullet_up[i], 110);
    }
  }
  if (!(key.isDown("SPACE") && key.isDown("D") || key.isDown("SPACE") && key.isDown("RIGHT"))) {
    for (var i in bullet_run) {
      bullet_run[i].x = 200;
    }
  }

  for (var i in Platforms) {//невидимая платформа на которой стоит заяц(для прыжка)
    presets.physicsMoveCollision(Platforms[i]);
  }

  bunny.draw(); //отрисовка зайца
  all_draw(); //отрисовка ui

  // подарок
  for (var i in gift) {
    speed_intersect(gift[i], 10, 15, 18, 20); //скорость подарка    
    gift_and_coin_screen(gift[i], 17500);//повторное появление после попадания за пределы окна
    bunny_intersect_coin_gift(gift[i], 0, 1, 10); //столкновение с преградой

    gift[i].draw(); //отрисовка подарка
  }
  // coin
  for (var i in coin) {
    speed_intersect(coin[i], 10, 15, 18, 20); //скорость монеты
    gift_and_coin_screen(coin[i], 2500);//повторное появление после попадания за пределы окна
    bunny_intersect_coin_gift(coin[i], 1, 0, 5); //столкновение с преградой
    coin[i].draw(); //отрисовка монеты
  }

  // bush
  for (var i in bush) {
    //когда будет на координате 0, станет на позицию 4500, +3 очка
    appearance_obstacle(bush[i], 4500, 3);
    speed_intersect(bush[i], 10, 15, 18, 20); //скорость bush при смене счета
    bunny_intersect(bush[i]);//столкновение с преградой
    bush[i].draw(); //отрисовка куста
  }
  // fox
  for (var i in fox) {
    //когда будет на координате 0, станет на позицию 4700, +9 очка
    appearance_obstacle(fox[i], 4700, 9);
    speed_intersect(fox[i], 10, 15, 18, 20);//скорость fox при смене счета
    bunny_intersect(fox[i]);// столкновение с зайцем
    fox[i].draw(); //отрисовка лисицы
  }
  // eagle
  for (var i in eagle) {
    //когда будет на координате 0, станет на позицию 6800, +6 очка
    appearance_obstacle(eagle[i], 6800, 6);
    speed_intersect(eagle[i], 14, 21.2, 23, 25);////скорость преграды при смене счета
    bunny_intersect(eagle[i])//столкновение с преградой
    eagle[i].draw();//отрисовка орла
  }
});