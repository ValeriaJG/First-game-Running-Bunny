var key_touch = function () {

  function bunny_visible_false() { //скрытие всех анимаций зайца
    bunny_double_gun.setVisible(false);
    bunny_gun_run.setVisible(false);
    bunny_gun_up.setVisible(false);
    bunny_down.setVisible(false);
    bunny_jump.setVisible(false);
    bunny_run.setVisible(false);
  }
  bunny_idle.setVisible(false); //скрытие айдл зайца

  if (double_gun_buy == true && bullet_sum >= 1 && key.isDown("SPACE") && key.isDown("W") &&
    key.isDown("D") || bullet_sum >= 1 && double_gun_buy == true && key.isDown("SPACE") &&
    key.isDown("UP") && key.isDown("RIGHT")) {
    bunny_visible_false();
    bunny_double_gun.setVisible(true);

  } else if (bunny_gun_up_buy == true && bullet_sum >= 1 && key.isDown("SPACE") && key.isDown("D") ||
    bullet_sum >= 1 && bunny_gun_up_buy == true && key.isDown("SPACE") && key.isDown("RIGHT")) {
    bunny_visible_false();
    bunny_gun_run.setVisible(true);

  } else if (bunny_gun_up_buy == true && bullet_sum >= 1 && key.isDown("SPACE") && key.isDown("W") ||
    bullet_sum >= 1 && bunny_gun_up_buy == true && key.isDown("SPACE") && key.isDown("UP")) {
    bunny_visible_false();
    bunny_gun_up.setVisible(true);

  } else if (key.isDown("S") || key.isDown("DOWN")) {
    bunny_visible_false();
    bunny_down.setVisible(true);

  } else if (key.isDown("W") || key.isDown("UP")) {
    bunny_visible_false();
    bunny_jump.setVisible(true);

  } else if (bunny_jump.y == bunny_jump_y) { //отображение зайца, только после того как прыжок окончится
    bunny_visible_false();
    bunny_run.setVisible(true);
  }

  if (counter >= 0 && counter <= 710) { //скорость прыжка зайца
    presets.physicsMoveInit(bunny_jump, 3, 11.5, 0.01, 0, 0, 0.5, 0, 0, -1, [], [], ['W', 'UP'], []);
  } else if (counter > 710 && counter <= 4000) {
    presets.physicsMoveInit(bunny_jump, 4, 11.5, 0.01, 0, 0, 0.5, 0, 0, -11, [], [], ['W', 'UP'], []);
  } else if (counter > 4000) {
    presets.physicsMoveInit(bunny_jump, 5, 11.5, 0.01, 0, 0, 0.5, 0, 0, -11, [], [], ['W', 'UP'], []);
  }
  // physicsMoveInit(name, speed, gravity, density, bounce, sticking, minBounce, speedRotation, stopRotation, accelerationDown, D,
  // gravity - Гравитация; density - Плотность среды 
  // bounce - Количество отскоков от земли; sticking - Прилипание к потолку
  //minBounce - Величина минимального отскока от земли 
  //speedRotation - скорость вращения игрока (положительное значение). При значении 0 вращаться не будет 
  //stopRotation - Принимает значения 0 или 1. Останавливать вращение если уперлись в стенку. Значение 1 - остановить. 
  //accelerationDown - Параметр помогает задать ускорение при падении персонажа чтобы правильно согласовать 
  //скорость движения персонажа, его размер и соответсвенно падение. Параметр принимает отрицательные величины! 
};