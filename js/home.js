game.newLoop('home', function() {
    default_home(); //отрисовка всего, что должно быть в лобби(заяц, фон, ui)

    hover_on_btn(btn_start_normal, btn_start_hover, btn_start_noactive);
    hover_on_btn(ui_plus_normal, ui_plus_hover, ui_plus_noactive);
    hover_on_btn(ui_info_normal, ui_info_hover, ui_info_noactive);
    hover_on_btn(ui_soundOn_normal, ui_soundOn_hover, ui_soundOn_noactive);
    hover_on_btn(ui_store_normal, ui_store_hover, ui_store_noactive);
    hover_on_btn(ui_home_normal, ui_home_hover, ui_home_noactive);

    ui_close_normal.x = frame.x + 30;
    ui_close_hover.x = frame.x + 30;
    // запуск игрового цикла по клику
    if (mouse.isInStatic(btn_start_normal.getStaticBox()) && mouse.isPress("LEFT") || key.isDown("SPACE")) {

        counter = 0; //обнуляем счет за игру
        gift = []; //очищаем массив подарка
        coin = []; //очищаем массив монет
        bush = []; //очищаем массив преград
        eagle = [];
        fox = [];
        bullet_run = []; //очищаем массив пуль
        bullet_up = [];
        double_bullet = [];

        //очищаем позиции появления куста, монет, подаока
        bush_dx = 0;
        bush_dy = 0;
        coin_dx = 0;
        coin_dy = 0;
        gift_dx = 0;
        gift_dy = 0;
        bunny_jump.y = 484; //сброс прыжка
        generate_game(); //цыкл появления преград, монет, подарков, пуль
        game.setLoop('start'); //запуск игрового цикла 
    }

    function ui_hide_show(boolean) {
        ui_info_normal.setVisible(boolean);
        ui_info_hover.setVisible(boolean);
        ui_soundOn_normal.setVisible(boolean);
        ui_soundOn_hover.setVisible(boolean);
        ui_store_normal.setVisible(boolean);
        ui_store_hover.setVisible(boolean);
        ui_home_normal.setVisible(boolean);
        ui_home_hover.setVisible(boolean);
    }
    //  UI ui_plus_normal
    if (mouse.isInStatic(ui_plus_normal.getStaticBox()) && mouse.isPress("LEFT")) {
        if (ui_plus_hover.file == "https://worldinformation.ru/game/img/ui/ui_plus_hover.png") { //при нажатии кнопки будут меняться
            ui_plus_hover.file = "https://worldinformation.ru/game/img/ui/ui_minus_hover.png"; //замена картинок
            ui_plus_normal.file = "https://worldinformation.ru/game/img/ui/ui_minus_normal.png";
            ui_hide_show(true); //видимые кнопки
        } else if (ui_plus_hover.file == "https://worldinformation.ru/game/img/ui/ui_minus_hover.png") {
            ui_plus_hover.file = "https://worldinformation.ru/game/img/ui/ui_plus_hover.png";
            ui_plus_normal.file = "https://worldinformation.ru/game/img/ui/ui_plus_normal.png";
            ui_hide_show(false); //скрытие кнопок
        }
    }

    //открыть инфо
    if (ui_info_normal.isVisible(true) && mouse.isInStatic(ui_info_normal.getStaticBox()) && mouse.isPress("LEFT")) {
        game.setLoop('specification_page_1');
    }

    //вкл, выкл музыки
    if (ui_soundOn_normal.isVisible(true) && mouse.isInStatic(ui_soundOn_normal.getStaticBox()) && mouse.isPress("LEFT")) {
        if (ui_soundOn_hover.file == "https://worldinformation.ru/game/img/ui/ui_soundOn_hover.png") {
            ui_soundOn_hover.file = "https://worldinformation.ru/game/img/ui/ui_soundOff_hover.png";
            ui_soundOn_normal.file = "https://worldinformation.ru/game/img/ui/ui_soundOff_normal.png";
            console.log("music off");
        } else if (ui_soundOn_hover.file == "https://worldinformation.ru/game/img/ui/ui_soundOff_hover.png") {
            ui_soundOn_hover.file = "https://worldinformation.ru/game/img/ui/ui_soundOn_hover.png";
            ui_soundOn_normal.file = "https://worldinformation.ru/game/img/ui/ui_soundOn_normal.png";
            console.log("music on");
        }
    }

    // открыть магазин
    if (ui_store_normal.isVisible(true) && mouse.isInStatic(ui_store_normal.getStaticBox()) && mouse.isPress("LEFT")) {
        game.setLoop('buy');
    }

    // вернуться домой
    if (mouse.isInStatic(ui_home_normal.getStaticBox()) && mouse.isPress("LEFT")) {
        document.location.href = "https://worldinformation.ru/"
    }

    //если у нас есть пушка, то тогда она не будет появляться
    if (bunny_gun_up_buy == true) {
        gift_buy_gun_bullet.alpha = 0;
    }

    hover_on_btn(ui_gift_normal, gift_hover, ui_gift_noactive);

    gift_bullet_num = 0; //обнуляем то, что попадается в подарке
    gift_coin_num = 0;
    gift_gun_base = 0;

    if (gift_counter == 0) { //если нет подарков, тогда открыть подарок нельзя
        ui_gift_normal.alpha = 0;
        ui_gift_noactive.alpha = 1;
    } else {
        ui_gift_normal.alpha = 1;
        ui_gift_noactive.alpha = 0;
    }

    //открытие подарка
    if (gift_counter >= 1 && mouse.isInStatic(ui_gift_normal.getStaticBox()) && mouse.isPress("LEFT")) {
        gift_open_anim.setFrame(0); //текущий кадр
        gift_bullet_num += random(1, 10); //рандом внутри подарка
        gift_coin_num += random(1, 15);
        gift_gun_base += random(0, 3);
        game.setLoop('gift'); //цыкл подарка
        gift_counter -= 1; //минус один подарок
    }

});
game.setLoop('home'); //цикл загрузки
game.start(); //начало будет с загрузки