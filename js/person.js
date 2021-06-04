var pjs;
var njs;

//под разный размер экрана
if (window.innerWidth >= 2560) {
  pjs = new PointJS(2560, 1080, { backgroundColor: "" });
} else if (window.innerWidth >= 1440 && window.innerWidth <= 2559) {
  pjs = new PointJS(1440, 800, { backgroundColor: "" });
} else if (window.innerWidth >= 1024 && window.innerWidth <= 1439) {
  pjs = new PointJS(1024, 900, { backgroundColor: "" });
} else if (window.innerWidth >= 0 && window.innerWidth <= 1023) { 
  njs = new PointJS(window.innerWidth, window.innerHeight, { backgroundColor: "white" });
  njs.brush.drawMultiText({
    text: "Sorry, this game is\nfor wide screens only",
    x: window.innerWidth / 2, y: window.innerHeight / 2,
    color: "white", align: "center",
    font: "Comic Sans MS",
    style: "bold", size: 30,
    strokeColor: "#000", strokeWidth: 2
  })
}

pjs.system.setSettings({ isAutoClear: true, isShowError: true, isStopForError: true });

var game = pjs.game; //для взаимодействия с движком
var tiles = pjs.tiles; //для анимации

var key = pjs.keyControl;
key.initKeyControl(); //подключение клавиатуры
var mouse = pjs.mouseControl;
mouse.initControl(); //подключение мыши

//центрирование
var WH = game.getWH();
var width = WH.w;
var height = WH.h;

var presets = pjs.presets; //для цыкла фона
var random = pjs.math.random; //для рандома

var counter = 0; //ui текущий счет
var best_counter = 0; //ui лучший счет
var coin_counter = 0; //ui монеты
var gift_counter = 0; //ui подарок
var bullet_sum = 0; //ui пули

var bunny_gun_up_buy = false; //активность пушек
var double_gun_buy = false; //активность пушек

var gift_coin_num = 0; //значение монеты в сундуке
var gift_bullet_num = 0;//значение пуль в сундуке

//сохранение лучшего счета
localStorage.getItem('best_counter') > 0 ? best_counter = localStorage.getItem('best_counter') : best_counter = 0

//BUNNY animation
var bunny_idle = game.newAnimationObject({
  animation: tiles.newImage("img/bunny_idle.png").getAnimation(0.3, 0, 189.5, 239, 10),
  x: 100, y: 160,
  w: 189.5, h: 239,
  delay: 7
});
var bunny_down = game.newAnimationObject({
  animation: tiles.newImage("img/bunny_down.png").getAnimation(0, 0, 188, 208, 7),
  x: 98, y: 203,
  w: 188, h: 208,
  delay: 1.3,
  visible: false
});
var bunny_run = game.newAnimationObject({
  animation: tiles.newImage("img/bunny_run.png").getAnimation(0, 0, 201.5, 244, 10),
  x: 94, y: 170,
  w: 201.5, h: 244,
  delay: 1.3,
  visible: false
});
var bunny_jump = game.newAnimationObject({
  animation: tiles.newImage("img/bunny_jump.png").getAnimation(0, 0, 216.53, 255, 15),
  x: 87, y: 160,
  w: 216.53, h: 255,
  delay: 5.3,
  visible: false
});
var bunny_gun_run = game.newAnimationObject({
  animation: tiles.newImage("img/bunny_gun_run.png").getAnimation(0, 0, 235.5, 244, 6),
  x: 77, y: 170,
  w: 235.5, h: 244,
  delay: 1.3,
  visible: false
});
var bunny_gun_up = game.newAnimationObject({
  animation: tiles.newImage("img/bunny_gun_up.png").getAnimation(0, 0, 226, 244, 6),
  x: 82, y: 170,
  w: 226, h: 244,
  delay: 1.3,
  visible: false
});
var bunny_double_gun = game.newAnimationObject({
  animation: tiles.newImage("img/bunny_double_gun.png").getAnimation(0, 0, 235, 244, 10),
  x: 78, y: 170,
  w: 235, h: 244,
  delay: 1.3,
  visible: false
});
var bunny = game.newMesh({
  add: [bunny_idle, bunny_run, bunny_jump, bunny_down, bunny_gun_run, bunny_gun_up, bunny_double_gun],
  y: 330
})

var bg_base = game.newImageObject({ //фон
  file: "img/bg_base.jpg",
  x: 0, y: 0,
  w: 2599, h: 1179,
  alpha: 1
});

var btn_start_normal = game.newImageObject({ //кнопка старт
  file: "img/ui/play_normal.png",
  x: 450, y: 0,
  w: 381, h: 98,
  alpha: 1
});
var btn_start_hover = game.newImageObject({
  file: "img/ui/play_hover.png",
  x: 450, y: 0,
  w: 381, h: 98,
  alpha: 0
});
var btn_start_noactive = game.newImageObject({
  file: "img/ui/play_hover.png",
  x: 450, y: 0,
  w: 381, h: 98,
  alpha: 0
});
var btn_start = game.newMesh({
  add: [btn_start_normal, btn_start_hover, btn_start_noactive]
});

// ui
var hp_frame = game.newImageObject({ //фон для каунтера счета
  file: "img/hp_frame.png",
  x: 0, y: 0,
  w: 327 / 2,
  h: 111 / 1.7
});
var hi_frame = game.newImageObject({//фон для каунтера лучшего счета
  file: "img/hp_frame.png",
  x: 0, y: 0,
  w: 327 / 2,
  h: 111 / 1.7
});
var coin_frame = game.newImageObject({ //фон для каунтера монет
  file: "img/hp_frame.png",
  x: 0, y: 0,
  w: 327 / 3,
  h: 111 / 1.7
});
var bullet_frame = game.newImageObject({ //фон для каунтера пули
  file: "img/hp_frame.png",
  x: 0, y: 0,
  w: 327 / 3,
  h: 111 / 1.7
});
var gift_frame = game.newImageObject({//фон для каунтера подарка
  file: "img/hp_frame.png",
  x: 0, y: 0,
  w: 327 / 4.5,
  h: 111 / 1.7
});

var ui_gift_normal = game.newImageObject({ //подарок
  file: "img/gift.png",
  w: 116 / 2.2, h: 111 / 2.2
});
var ui_gift_noactive = game.newImageObject({
  file: "img/gift_noactive.png",
  w: 116 / 2.2, h: 111 / 2.2,
  alpha: 0
});
var gift_hover = game.newImageObject({
  file: "img/gift_hover.png",
  w: 116 / 2.2, h: 111 / 2.2,
  alpha: 0
});
var ui_gift = game.newMesh({
  add: [ui_gift_normal, gift_hover, ui_gift_noactive],
  x: width - 982,
  y: 6, alpha: 1
});

var gift_open_anim = game.newAnimationObject({ //анимация открытия подарка
  animation: tiles.newImage("img/gift_open.png").getAnimation(0, 0, 1506, 1645, 14),
  w: 1974, h: 1807,
  x: width / 2 - 590,
  y: height / 2 - 910,
  delay: 3
});
var gift_last_frame = gift_open_anim.getLastFrame();

var gift_bullet_img = game.newImageObject({ //пуля в подарке
  file: "img/bullet.png",
  x: width / 2 - 180, y: height / 2 - 100,
  w: 154 / 1.5, h: 57 / 1.5,
  angle: -30, alpha: 1
});
var gift_coin_img = game.newImageObject({ //монета в подарке
  file: "img/coin.png",
  x: width / 2 - 100, y: height / 2 + 20,
  w: 116 / 1.5, h: 111 / 1.5,
  alpha: 1
});
var gift_buy_gun_bullet = game.newImageObject({ //пушка в подарке
  file: "img/buy_gun_bullet.png",
  x: width / 2 + 40, y: height / 2 - 70,
  w: 189 / 1.5, h: 179 / 1.5,
  alpha: 0
});

//массивы пуль, преград, подарка и монет
var gift = [];
var coin = [];
var bush = [];
var eagle = [];
var fox = [];
var bullet_run = [];
var bullet_up = [];
var double_bullet = [];
var Platforms = []
//для рандома
var bush_dx = 0;
var bush_dy = 0;
var coin_dx = 0;
var coin_dy = 0;
var gift_dx = 0;
var gift_dy = 0;

//в переменных, что бы потом можно было изменять размеры/позиции
var coin_w = 116 / 2; //ширина монеты
var coin_h = 111 / 2;//высота монеты

var bullet_x = 130;
var bullet_run_y = 130;
var bullet_double_y = 640;

var bush_scale_x = 202;
var bush_scale_y = 172;
var bush_pos_y = 550;
var bunny_jump_y = 484;

//стиль для всех текстов
function all_style_txt(txt, x, y, color, size, alpha) {
  pjs.brush.drawText({
    text: txt,
    x: x, y: y,
    color: color,
    font: "Comic Sans MS",
    style: "bold",
    size: size,
    alpha: alpha
  });
}

function txt_paragraph(bullet, txt, x, y, align, size) { // что бы не дублировать, когда нужен абзац
  pjs.brush.drawMultiText({
    text: txt,
    x: bullet.x + 200 + x, y: bullet.y + 25 + y,
    align: align,
    color: "black", font: "Comic Sans MS",
    style: "bold", size: size
  });
}

var store_style_txt = game.newTextObject({//стиль для магазина
  color: "black",
  font: "Comic Sans MS",
  style: "bold",
  size: 50, alpha: 0
});

var frame = game.newImageObject({ //фрейм фона магазина
  file: "img/frame.png",
  w: 1165, h: 629
});
frame.x = (width / 2) - frame.w / 2;
frame.y = (height / 2) - frame.h / 2;
var store_txt = game.newImageObject({ //заголовок магазина
  file: "img/store_txt.png",
  x: (width / 2) - 104.5,
  y: (height / 2) - 280
});
var specification_txt = game.newImageObject({ //заголовок правил
  file: "img/specification.png",
  x: (width / 2) - 234.5,
  y: (height / 2) - 280
});

// draw + ui 
function all_draw() {
  var ui_coin = game.newImageObject({
    file: "img/coin.png",
    x: coin_frame.x - 60,
    y: 2,
    w: coin_w, h: coin_h
  });

  if (coin_counter <= 9999) {
    coin_frame.w = 327 / 3.3;
  } else if (coin_counter >= 10000) {
    coin_frame.w = 327 / 2.4;
  }

  if (coin_counter <= 9999) {
    coin_frame.w = 327 / 3.3;
  } else if (coin_counter >= 10000) {
    coin_frame.w = 327 / 2.4;
  }

  var ui_bullet = game.newImageObject({
    file: "img/bullet.png",
    x: bullet_frame.x - 70,
    y: 12,
    w: 154 / 2.2,
    h: 57 / 2.2,
    angle: -30
  });

  ui_bullet.draw();
  ui_coin.draw();
  ui_gift.draw();
  hp_frame.draw();
  hi_frame.draw();
  coin_frame.draw();
  bullet_frame.draw();
  gift_frame.draw();
  store_style_txt.draw();

  all_style_txt("HI:", hi_frame.x - 43, 21, "black", 30, 1); //отрисовка текста HI
  all_style_txt("HP:", hp_frame.x - 43, 21, "black", 30, 1); //отрисовка текста HP
  all_style_txt(counter, hp_frame.x + 21, 19, "white", 30, 1); //отрисовка HP counter
  all_style_txt(best_counter, hi_frame.x + 20, 19, "white", 30, 1); //отрисовка HI counter
  all_style_txt(coin_counter, coin_frame.x + 13, 19, "white", 30, 1); //отрисовка coin_counter
  all_style_txt(bullet_sum, bullet_frame.x + 13, 19, "white", 30, 1); //отрисовка bullet_sum
  all_style_txt(gift_counter, bullet_frame.x - 150, 22, "white", 30, 1); //отрисовка gift_counter_txt
}

function default_home() { //отрисовка всего, что должно быть в лобби
  bunny_idle.y = 500; //позиция зайца
  bunny_idle.setVisible(true);//отображение айдл анимации зайца

  bg_base.draw(); //отрисовка фона
  all_draw(); //отрисовка ui сверху(счет и тд)
  btn_start.draw(); //отрисовка кнопки старт
  ui_plus.draw(); //отрисовка ui кнопок
  ui_info.draw();
  ui_sound.draw();
  ui_store.draw();
  ui_home.draw();
  ui_plus_noactive.alpha = 0;
  bunny_idle.draw(); //отрисовка зайца
  ui_gift_normal.alpha = 1;//видимость подарка сверху
}

function generate_game() { //цыкл подарка, монеты, пуль и преград
  // gift
  for (var i = 0; i < 1; i++) { //1 штука за цыкл
    gift_dx += random(2200, 2600) //рандом позиции по x в каком месте будет появляться
    gift_dy += random(1, 4) //рандом позиции по y в каком месте будет появляться
    gift.push( //отображение объекта
      game.newImageObject({
        file: "img/gift.png",
        x: gift_dx + width,
        y: 350 - gift_dy,
        w: 280 / 2,
        h: 275 / 2,
        delay: 1,
        visible: true
      })
    )
  }
  // coin
  for (var i = 0; i < 3; i++) {
    coin_dx += random(500, 1600)
    coin_dy += random(0, 95)
    coin.push(
      game.newImageObject({
        file: "img/coin.png",
        x: coin_dx + width,
        y: 550 - coin_dy,
        w: 116,
        h: 111,
        delay: 1,
        visible: true
      })
    )
  }

  // bullet_run
  for (var i = 0; i < 1; i++) {
    bullet_run.push(
      game.newImageObject({
        file: "img/bullet.png",
        y: bunny_gun_run.y + bullet_run_y,
        w: 154, h: 45,
        angle: -4,
        delay: 1
      })
    )
  }
  // bullet_up
  for (var i = 0; i < 1; i++) {
    bullet_up.push(
      game.newImageObject({
        file: "img/bullet.png",
        w: 154, h: 45,
        angle: -15,
        delay: 1
      })
    )
  }
  // double_bullet
  for (var i = 0; i < 1; i++) {
    double_bullet.push(
      game.newImageObject({
        file: "img/bullet.png",
        x: bullet_x,
        y: bullet_double_y,
        w: 154, h: 45,
        angle: -13,
        delay: 1
      })
    )
  }

  // bush
  for (var i = 0; i < 1; i++) {
    bush_dx += random(500, 600)
    bush_dy += random(0, 5)
    bush.push(
      game.newImageObject({
        file: "img/bush.png",
        x: bush_dx + width,
        y: bush_pos_y - bush_dy,
        w: bush_scale_x,
        h: bush_scale_y,
        delay: 1
      })
    )
  }
  // fox
  for (var i = 0; i < 1; i++) {
    bush_dx += random(1400, 1450)
    bush_dy += random(0, 5)
    fox.push(
      game.newImageObject({
        file: "img/fox.png",
        x: bush_dx + width,
        y: 520 - bush_dy,
        w: 233, h: 247,
        delay: 1
      })
    )
  }
  // eagle
  for (var i = 0; i < 1; i++) {
    bush_dx += random(2100, 2150) //num + num /2 * количество
    bush_dy += random(0, 15)
    eagle.push(
      game.newAnimationObject({
        animation: tiles.newImage("img/eagle.png").getAnimation(0, 0, 488.5, 234, 16),
        x: bush_dx + width,
        y: 290 - bush_dy,
        w: 488.5, h: 234,
        delay: 1
      })
    )
  }
  //платформа под зайцем для прыжка
  for (var i = 0; i < 1; i++) {
    Platforms.push(
      game.newRectObject({
        x: 50, y: bunny_idle.h + 500,
        w: 225, h: 25, radius: 10
      })
    );
  }
}