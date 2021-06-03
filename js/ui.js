//ховер при наведении на кнопку и при отпускании кнопки
function hover_on_btn(btn_normal, btn_hover, btn_noactive) {
  if (btn_noactive.alpha == 0 && mouse.isInStatic(btn_normal.getStaticBox())) {
    if (btn_hover.alpha <= 1) { //ховер при наведении
      btn_hover.alpha += 0.11;
    }
  } else { //отмена ховера при отпускании
    if (btn_hover.alpha >= 0.11) btn_hover.alpha -= 0.11;
  }
}

var ui_plus_normal = game.newImageObject({
  file: "img/ui/ui_plus_normal.png",
  x: 10, y: 5,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 1
});
var ui_plus_hover = game.newImageObject({
  file: "img/ui/ui_plus_hover.png",
  x: 10, y: 5,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 0
});
var ui_plus_noactive = game.newImageObject({
  file: "img/ui/ui_plus_noactive.png",
  x: 10, y: 5,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 0
});
var ui_plus = game.newMesh({
  add: [ui_plus_normal, ui_plus_hover, ui_plus_noactive]
});

// ui_minus_normal
var ui_minus_normal = game.newImageObject({
  file: "img/ui/ui_minus_normal.png",
  x: 10, y: 5,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 1
});
var ui_minus_hover = game.newImageObject({
  file: "img/ui/ui_minus_hover.png",
  x: 10, y: 5,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 0
});
var ui_minus = game.newMesh({
  add: [ui_minus_normal, ui_minus_hover]
});

var ui_info_normal = game.newImageObject({
  file: "img/ui/ui_info_normal.png",
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 1, visible: false
});
var ui_info_hover = game.newImageObject({
  file: "img/ui/ui_info_hover.png",
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 0, visible: false
});
var ui_info_noactive = game.newImageObject({
  file: "img/ui/ui_info_hover.png",
  alpha: 0, visible: false
});
var ui_info = game.newMesh({
  add: [ui_info_normal, ui_info_hover, ui_info_noactive],
  x: 10, y: ui_minus_normal.y + 100
});

// ui_soundOn_normal
var ui_soundOn_normal = game.newImageObject({
  file: "img/ui/ui_soundOn_normal.png",
  x: 10, y: ui_info_normal.y + 100,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 1, visible: false
});
var ui_soundOn_hover = game.newImageObject({
  file: "img/ui/ui_soundOn_hover.png",
  x: 10, y: ui_info_normal.y + 100,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 0, visible: false
});
var ui_soundOn_noactive = game.newImageObject({
  file: "img/ui/ui_soundOn_hover.png",
  alpha: 0, visible: false
});
var ui_soundOff_normal = game.newImageObject({
  file: "img/ui/ui_soundOff_normal.png",
  x: 10, y: ui_info_normal.y + 100,
  w: 125 / 2, h: 126 / 2,
  alpha: 1, visible: false
});
var ui_soundOff_hover = game.newImageObject({
  file: "img/ui/ui_soundOff_hover.png",
  x: 10, y: ui_info_normal.y + 100,
  w: 125 / 1.3, h: 125 / 1.3,
  alpha: 0, visible: false
});
var ui_sound = game.newMesh({
  add: [ui_soundOn_normal, ui_soundOn_hover, ui_soundOn_noactive, ui_soundOff_hover, ui_soundOff_normal]
});

// ui_store_normal
var ui_store_normal = game.newImageObject({
  file: "img/ui/ui_store_normal.png",
  x: 10, y: ui_soundOn_normal.y + 100,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 1, visible: false
});
var ui_store_hover = game.newImageObject({
  file: "img/ui/ui_store_hover.png",
  x: 10, y: ui_soundOn_normal.y + 100,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 0, visible: false
});
var ui_store_noactive = game.newImageObject({
  file: "img/ui/ui_store_hover.png",
  alpha: 0, visible: false
});
var ui_store = game.newMesh({
  add: [ui_store_normal, ui_store_hover, ui_store_noactive]
});

var ui_home_normal = game.newImageObject({
  file: "img/ui/ui_home_normal.png",
  x: 10, y: ui_store_normal.y + 100,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 1, visible: false
});
var ui_home_hover = game.newImageObject({
  file: "img/ui/ui_home_hover.png",
  x: 10, y: ui_store_normal.y + 100,
  w: 125 / 1.3, h: 126 / 1.3,
  alpha: 0, visible: false
});
var ui_home_noactive = game.newImageObject({
  file: "img/ui/ui_home_hover.png",
  alpha: 0, visible: false
});
var ui_home = game.newMesh({
  add: [ui_home_normal, ui_home_hover, ui_home_noactive]
});

//BUY
var ui_close_normal = game.newImageObject({
  file: "img/ui/ui_buy_close_normal.png",
  alpha: 1
});
var ui_close_hover = game.newImageObject({
  file: "img/ui/ui_buy_close_hover.png",
  alpha: 0
});
var ui_close_noactive = game.newImageObject({
  file: "img/ui/ui_buy_close_hover.png",
  alpha: 0
});
var ui_close = game.newMesh({
  add: [ui_close_normal, ui_close_hover, ui_close_noactive],
  y: frame.y + 27,
  w: 83, h: 86,
});

//btn_buy_gun
var btn_buy_normal = game.newImageObject({
  file: "img/ui/btn_buy_normal.png",
  alpha: 1
});
var btn_buy_hover = game.newImageObject({
  file: "img/ui/btn_buy_hover.png",
  alpha: 0
});
var btn_buy_noactive = game.newImageObject({
  file: "img/ui/btn_buy_noactive.png",
  alpha: 0
});
var btn_buy = game.newMesh({
  add: [btn_buy_normal, btn_buy_hover, btn_buy_noactive],
  x: frame.x + 350, y: frame.y + 230,
  w: 208, h: 71
});

btn_buy_double_gun
var btn_buy_double_gun_normal = game.newImageObject({
  file: "img/ui/btn_buy_normal.png",
  alpha: 1
});
var btn_buy_double_gun_hover = game.newImageObject({
  file: "img/ui/btn_buy_hover.png",
  alpha: 0
});
var btn_buy_double_gun_noactive = game.newImageObject({
  file: "img/ui/btn_buy_noactive.png",
  alpha: 0
});
var btn_buy_double_gun = game.newMesh({
  add: [btn_buy_double_gun_normal, btn_buy_double_gun_hover, btn_buy_double_gun_noactive],
  x: frame.x + 920, y: frame.y + 230,
  w: 208, h: 71
});

// buy_only_bullet
var buy_bullet_img = game.newImageObject({
  file: "img/buy_bullet.png",
  x: frame.x + 40, y: frame.y + 420,
  w: 183, h: 121
});

var buy_bullet_x = game.newTextObject({
  text: "x10",
  x: frame.x + 240, y: frame.y + 480,
  color: "black",
  font: "Comic Sans MS",
  style: "bold", size: 50
});

//MINUS
var buy_ui_minus_normal = game.newImageObject({
  file: "img/ui/ui_minus_normal.png",
  alpha: 0
});
var buy_ui_minus_hover = game.newImageObject({
  file: "img/ui/ui_minus_hover.png",
  alpha: 0
});
var buy_ui_minus_noactive = game.newImageObject({
  file: "img/ui/ui_minus_noactive.png",
  alpha: 1
});
var buy_ui_minus = game.newMesh({
  add: [buy_ui_minus_normal, buy_ui_minus_hover, buy_ui_minus_noactive],
  x: frame.x + 355, y: frame.y + 432,
  w: 113, h: 113
});

var buy_bullet_price = game.newTextObject({
  text: 50,
  x: buy_ui_minus.x + 140, y: frame.y + 480,
  color: "black", font: "Comic Sans MS",
  style: "bold", size: 50
})

//PLUS
var buy_ui_plus_normal = game.newImageObject({
  file: "img/ui/ui_plus_normal.png"
});
var buy_ui_plus_hover = game.newImageObject({
  file: "img/ui/ui_plus_hover.png",
  alpha: 0
});
var buy_ui_plus_noactive = game.newImageObject({
  file: "img/ui/ui_plus_noactive.png",
  alpha: 0
});
var buy_ui_plus = game.newMesh({
  add: [buy_ui_plus_normal, buy_ui_plus_hover, buy_ui_plus_noactive],
  x: buy_bullet_price.x + 95, y: frame.y + 432,
  w: 113, h: 113
});

var buy_only_bullet_btn_normal = game.newImageObject({
  file: "img/ui/btn_buy_normal.png",
  alpha: 0
});
var buy_only_bullet_btn_hover = game.newImageObject({
  file: "img/ui/btn_buy_hover.png",
  alpha: 0
});
var buy_only_bullet_btn_noactive = game.newImageObject({
  file: "img/ui/btn_buy_noactive.png",
  alpha: 1
});

var buy_only_bullet = game.newMesh({
  add: [buy_only_bullet_btn_normal, buy_only_bullet_btn_hover, buy_only_bullet_btn_noactive],
  x: buy_ui_plus_normal.x + 150, y: buy_ui_plus_normal.y + 25,
  w: 208, h: 71
});

var buy_bullet_btn_play_video_normal = game.newImageObject({
  file: "img/ui/ui_play_normal.png",
  alpha: 0
});
var buy_bullet_btn_play_video_hover = game.newImageObject({
  file: "img/ui/ui_play_hover.png",
  alpha: 0
});
var buy_bullet_btn_play_video_noactive = game.newImageObject({
  file: "img/ui/ui_play_noactive.png",
  alpha: 1
});

var buy_only_bullet_play_video = game.newMesh({
  add: [buy_bullet_btn_play_video_normal, buy_bullet_btn_play_video_hover, buy_bullet_btn_play_video_noactive],
  x: buy_only_bullet.x + 245, y: frame.y + 432,
  w: 125, h: 125
});

var buy_bg = game.newImageObject({
  file: "img/buy_bg.png",
  x: 0, y: 0,
  w: width, h: height,
  alpha: 0.34
});