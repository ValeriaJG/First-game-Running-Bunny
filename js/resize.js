//центрирование
hp_frame.x = width - 0 - hp_frame.w;
hi_frame.x = width - 63 - hp_frame.w - hi_frame.w;
coin_frame.x = width - 140 - hi_frame.w - hi_frame.w - coin_frame.w;
btn_start_normal.x = width / 2 - 190.5;
btn_start_normal.y = bg_base.h / 1.9;
btn_start_hover.x = width / 2 - 190.5;
btn_start_hover.y = bg_base.h / 1.9;

coin_frame.x = width - 140 - hi_frame.w - hi_frame.w - coin_frame.w;
bullet_frame.x = width - 230 - coin_frame.w - hi_frame.w - hp_frame.w - bullet_frame.w;
gift_frame.x = width - 315 - coin_frame.w - hi_frame.w - hp_frame.w - bullet_frame.w - gift_frame.w;

if (width >= 2561) {
  bg_base.scale(1.5);
} else if (width >= 1441 && width <= 2560) {
  bunny_jump_y = 480.79999999999995;
  bullet_run_y = 155;
  btn_start_normal.y = bg_base.h / 1.3;
  btn_start_hover.y = bg_base.h / 1.3;

  bg_base.scale = 1.4;

  bunny_idle.scale(1.2);
  bunny_idle.y = 450;

  bunny_down.scale(1.2);
  bunny_run.scale(1.2);
  bunny_down.y = 534;
  bunny_down.x = 120;

  bunny_jump.scale(1.2);
  bunny_jump.y = 450;
  bunny_jump.x = 85;

  bunny_gun_run.scale(1.2);
  bunny_gun_run.y = 500;
  bunny_gun_run.x = 75;

  bunny_gun_up.scale(1.2);
  bunny_gun_up.y = 500;
  bunny_gun_up.x = 75;

  bunny_double_gun.scale(1.2);
  bunny_double_gun.y = 500;
  bunny_double_gun.x = 75;

  bush_pos_y = bush_pos_y + 80

} else if (width >= 1080 && width <= 1440) {
  coin_frame.x = width - 130 - hi_frame.w - hi_frame.w - coin_frame.w;
  bullet_frame.x = width - 220 - coin_frame.w - hi_frame.w - hp_frame.w - bullet_frame.w;
  gift_frame.x = width - 305 - coin_frame.w - hi_frame.w - hp_frame.w - bullet_frame.w - gift_frame.w;
} else if (width <= 1079) {
  coin_frame.x = width - 50 - hi_frame.w - hi_frame.w - coin_frame.w;
  bullet_frame.x = width - 100 - coin_frame.w - hi_frame.w - hp_frame.w - bullet_frame.w;
  gift_frame.x = width - 190 - coin_frame.w - hi_frame.w - hp_frame.w - bullet_frame.w - gift_frame.w;

  coin_w = 116 / 2.3;
  coin_h = 111 / 2.3;

  ui_gift_normal.x = 155
  ui_gift_noactive.x = 155
  gift_hover.x = 155

  hp_frame.w = 327 / 2.5;
  hp_frame.x = width - 0 - hp_frame.w;
  hi_frame.x = width - 33 - hp_frame.w - hi_frame.w;

  hi_frame.w = 327 / 2.5;
  coin_frame.w = 327 / 2.2;
  bullet_frame.w = 327 / 4;
  gift_frame.w = 327 / 4;
  gift_frame.y = 0;
  bunny_idle.scale(1);
  bunny_idle.scale(1);
  bunny_run.scale(1);
  bunny_jump.scale(1);
  bunny_down.scale(1);
  bunny_gun_run.scale(1);
  bunny_gun_up.scale(1);
  bunny_double_gun.scale(1);

  bunny_idle.x = 30;
  bunny_run.x = 24;
  bunny_jump.x = 20;
  bunny_down.x = 30;
  bunny_gun_run.x = 7;
  bunny_gun_up.x = 13;
  bunny_double_gun.x = 7;

  bush_scale_x = bush_scale_x / 1.15;
  bush_scale_y = bush_scale_y / 1.15;
  bush_pos_y = bush_pos_y + 40
} if (width < 1024) {
  game.setLoop('dont_PC');
  bunny_idle.scale(0.7);
  bunny_idle.y = 500;
}
