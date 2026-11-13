/* Рефлекшн: окно чата + бот без сервера. One Reply */
/* Бот «Рефлекшн» без сервера: вся логика работает в браузере посетителя.
   Ничего не отправляет и не сохраняет: переписка живёт только в открытой вкладке.
   Данные (прайс, ответы, ссылки) — в объекте D ниже. */
var HKBot = (function () {
  "use strict";
  var D = {"greeting": "Здравствуйте! Я онлайн-помощник ногтевой студии «Рефлекшн» в Химках. Подскажу цены, помогу выбрать процедуру и открою онлайн-запись.", "menu": ["Услуги и цены", "Записаться", "Задать вопрос"], "services": [{"name": "Аппаратный / комбинированный маникюр без покрытия", "price": "2 000 ₽", "group": "Маникюр"}, {"name": "Маникюр с покрытием (укрепление гелем входит)", "price": "3 600 ₽", "group": "Маникюр"}, {"name": "Маникюр с покрытием и дизайном", "price": "4 100 ₽", "group": "Маникюр"}, {"name": "Маникюр + кошачий глаз, втирка или белый френч", "price": "4 100 ₽", "group": "Маникюр"}, {"name": "Маникюр с DIP-системой", "price": "3 700 ₽", "group": "Маникюр"}, {"name": "Маникюр + витаминное бандирование", "price": "2 500 ₽", "group": "Маникюр"}, {"name": "Снятие + маникюр без покрытия", "price": "2 500 ₽", "group": "Маникюр"}, {"name": "Smart-педикюр без покрытия", "price": "3 000 ₽", "group": "Педикюр"}, {"name": "Smart-педикюр с покрытием гель-лаком", "price": "4 000 ₽", "group": "Педикюр"}, {"name": "Снятие + педикюр без покрытия", "price": "3 200 ₽", "group": "Педикюр"}, {"name": "Фруктовый педикюр без покрытия", "price": "4 000 ₽", "group": "Педикюр"}, {"name": "Фруктовый педикюр с покрытием гель-лаком", "price": "5 000 ₽", "group": "Педикюр"}, {"name": "Покрытие обычным цветным лаком", "price": "700 ₽", "group": "Педикюр"}, {"name": "Наращивание ногтей", "price": "5 000 ₽", "group": "Наращивание и моделирование"}, {"name": "Коррекция наращивания", "price": "4 200 ₽", "group": "Наращивание и моделирование"}, {"name": "Моделирование ногтей гелем / полигелем", "price": "1 000 ₽", "group": "Наращивание и моделирование"}, {"name": "Наращивание одного ногтя (к маникюру с покрытием)", "price": "250 ₽", "group": "Наращивание и моделирование"}, {"name": "Покрытие плёнками", "price": "1 500 ₽", "group": "Уход и дополнения"}, {"name": "Экоглянцевание (к маникюру или педикюру)", "price": "500 ₽", "group": "Уход и дополнения"}, {"name": "Витаминное восстановление ногтей", "price": "500 ₽", "group": "Уход и дополнения"}, {"name": "Парафинотерапия рук", "price": "500 ₽", "group": "Уход и дополнения"}, {"name": "Парафинотерапия ног", "price": "500 ₽", "group": "Уход и дополнения"}, {"name": "Умная свеча", "price": "300 ₽", "group": "Уход и дополнения"}, {"name": "Снятие геля без процедуры", "price": "800 ₽", "group": "Снятие и ремонт"}, {"name": "Снятие без процедуры (ножки, мягкие системы, плёнки)", "price": "500 ₽", "group": "Снятие и ремонт"}, {"name": "Ремонт без процедуры", "price": "500 ₽", "group": "Снятие и ремонт"}, {"name": "Зачистка онихолизиса, 1 ноготь", "price": "300 ₽", "group": "Снятие и ремонт"}], "groups": ["Маникюр", "Педикюр", "Наращивание и моделирование", "Уход и дополнения", "Снятие и ремонт"], "servicesPrompt": "Выберите процедуры, можно несколько.", "kb": [{"topic": "Маникюр", "answer": "Аппаратный или комбинированный маникюр без покрытия — 2 000 ₽. Маникюр с покрытием — 3 600 ₽: это процедура под ключ, снятие, архитектура и укрепление гелем уже входят. С дизайном — 4 100 ₽, с кошачьим глазом, втиркой или белым френчем — 4 100 ₽. Маникюр с DIP-системой — 3 700 ₽, маникюр с витаминным бандированием — 2 500 ₽, снятие + маникюр без покрытия — 2 500 ₽."}, {"topic": "Педикюр", "answer": "Smart-педикюр без покрытия — 3 000 ₽, с покрытием гель-лаком — 4 000 ₽. Снятие + педикюр без покрытия — 3 200 ₽. Фруктовый педикюр на натуральных АНА-кислотах: без покрытия — 4 000 ₽, с гель-лаком — 5 000 ₽. Покрытие обычным цветным лаком — 700 ₽, парафинотерапия ног — 500 ₽."}, {"topic": "Наращивание и моделирование", "answer": "Наращивание ногтей — 5 000 ₽, коррекция наращивания — 4 200 ₽. Моделирование гелем или полигелем — 1 000 ₽: исправляем клюющие, скручивающиеся и смотрящие в сторону ногти, достраиваем боковые стенки. Наращивание одного ногтя — 250 ₽, только вместе с маникюром с покрытием."}, {"topic": "Уход и дополнения", "answer": "Экоглянцевание и витаминное восстановление ногтей — по 500 ₽, делаются вместе с маникюром или педикюром без покрытия. Парафинотерапия рук или ног — 500 ₽. Покрытие плёнками — 1 500 ₽. Умная свеча — 300 ₽."}, {"topic": "Снятие и ремонт", "answer": "Снятие геля без процедуры — 800 ₽. Снятие без процедуры (на ножках, мягкие системы на руках, плёнки) — 500 ₽. Ремонт без процедуры — 500 ₽. Зачистка онихолизиса — 300 ₽ за ноготь вместе с процедурой. Ремонт в течение 7 дней после процедуры — бесплатно, кроме сколов и трещин от механических повреждений."}, {"topic": "Процедура под ключ", "answer": "Маникюр с покрытием у нас — процедура под ключ: мастер снимает старое покрытие, смотрит руки и ногти, подбирает метод работы, при необходимости доклеивает боковые стенки и поднимает клюющие ногти. Укрепление гелем входит в стоимость — 3 600 ₽."}, {"topic": "Гарантия", "answer": "Если в течение 7 дней после процедуры что-то пошло не так — исправим бесплатно. Гарантия не распространяется на сколы и трещины от механических повреждений."}, {"topic": "DIP-система", "answer": "DIP-система — укрепление натуральных ногтей акриловой пудрой без УФ-сушки, запаха и агрессивного опила. Покрытие прочное, но гибкое. Маникюр с DIP-системой — 3 700 ₽."}, {"topic": "Плёнки", "answer": "Плёнки — альтернатива гель-лаку: не истончают ноготь, не вызывают аллергию, в педикюре их можно носить круглый год. Покрытие плёнками — 1 500 ₽."}, {"topic": "Бандирование", "answer": "Витаминное бандирование — восстановление ногтевой пластины биогелем с витаминами, кератином и кальцием. Это не наращивание и не покрытие, а лечебный слой, который работает круглые сутки. Маникюр с бандированием — 2 500 ₽."}, {"topic": "Сложные ногти", "answer": "Беремся за сложные случаи: клюющие и слоящиеся ногти, онихолизис, повреждённые точки роста. Мастер подберёт материалы и метод работы на процедуре. Для слоящихся ногтей подойдёт витаминное бандирование или DIP-система."}, {"topic": "Адрес", "answer": "Мы в Химках: Совхозная улица, 2. Рядом есть парковка, на входе пандус. Телефон: +7 977 851-87-48, Telegram: @studio_reflection."}, {"topic": "Часы работы", "answer": "Работаем до 21:00. Свободное время всех мастеров видно в онлайн-записи студии — там же запись сразу подтверждается."}, {"topic": "Мастера", "answer": "Все мастера студии постоянно учатся и повышают квалификацию, мы работаем больше пяти лет. Выбрать мастера и время можно в онлайн-записи."}, {"topic": "Опоздание", "answer": "Опоздание до 30 минут — без доплаты. Опоздание на вечернюю процедуру от 30 до 45 минут — 500 ₽. Если не успеваете, лучше предупредите администратора."}, {"topic": "Удобства", "answer": "Во время процедуры — кофе, чай и конфеты. Есть Wi-Fi и парковка, вход с пандусом. Можно прийти с собакой ростом до 35 см."}, {"topic": "Подарочный сертификат", "answer": "Подарочные сертификаты есть — номинал и оформление подскажет администратор: +7 977 851-87-48 или Telegram @studio_reflection."}, {"topic": "Перенос и отмена записи", "answer": "Перенести или отменить запись можно через администратора: позвоните +7 977 851-87-48 или напишите в Telegram @studio_reflection."}, {"topic": "Брови, ресницы, мужской и детский маникюр", "answer": "Эти услуги есть, но цены уточните у администратора: +7 977 851-87-48 или Telegram @studio_reflection."}], "objection": "Понимаю. Маникюр с покрытием у нас под ключ: снятие, архитектура и укрепление гелем уже входят в 3 600 ₽, а на ремонт — 7 дней гарантии. Можно начать с маникюра без покрытия за 2 000 ₽.", "booking": "https://dikidi.net/402901", "admin": "https://t.me/studio_reflection", "phone": "+7 977 851-87-48", "address": "Химки, Совхозная улица, 2", "wa": "https://wa.me/79778518748", "tg": "https://t.me/studio_reflection"};

  // ---------- текст: те же правила, что в серверном движке ----------
  var STOP = ["здрав", "добры", "добро", "вечер", "подск", "пожал", "скаж", "сколь", "можно", "какие", "какой", "какая", "есть", "если",
    "хочу", "нужно", "нужен", "нужна", "тоже", "меня", "мне", "вас", "ваши", "ваш", "это", "для", "или", "как", "что", "где", "когда",
    "уже", "еще", "очень", "спаси"];
  var SYNONYMS = [
    [/(^|[^a-zа-яё])(дип\S*|dip)/i, "пудра система"],
    [/(где|адрес|находит|добрат|пройти|доехать|метро|локац)/i, "адрес"],
    [/(во сколько|часы работы|работаете|открыт|график|до скольки|режим работы|выходн)/i, "график работаем"],
    [/(оплат|карт[аоуй]|налич|сбп|перевод)/i, "оплата"],
    [/(скидк|акци|промокод|подешевле|бонус)/i, "акции скидка"],
    [/(отмен|перенес|перенос)/i, "отмена перенос"],
    [/(мастер|специалист|кто делает)/i, "мастера"],
    [/наращ\S*\s+ногт|нарастить ногт/i, "маникюр"],
    [/(вместе|комплекс|за один визит|за раз)/i, "комплексы один визит"],
    [/гель[- ]?лак|покрыти\S* гел|шеллак/i, "маникюр укрепление"],
    [/(^|[^a-zа-яё])(spa|спа)([^a-zа-яё]|$)/i, "уход"]
  ];
  var PHONE_RE = /(^|[^\d])(\+?\d[\d\s\-()]{8,16}\d)(?!\d)/g;
  var HANDOFF_RE = /(человек|менеджер|оператор|администратор|позвон|перезвон|живой|жалоб|верните деньги)/i;
  var CANCEL_RE = /(отмен|перенес|перенос|не смогу прийти|не приду|не получится прийти)/i;
  var DURATION_RE = /(сколько длится|длительн|по времени|сколько времени|как долго|сколько час|сколько минут|долго ли)/i;
  var OBJECTION_RE = /(^|\s)(дорого|дороговато|дорогова)/i;
  var BOOK_RE = /(запиш|записат|записыв|хочу на |свободн\S* (врем|окн|окош)|есть (врем|окн|окош))/i;
  var HELLO_RE = /^(привет|здравств|добр(ый|ое|ого)|hi|hello)[\s!,.a-zа-яё]*$/i;
  var THANKS_RE = /^(спасибо|спс|благодарю|ок|окей|ok|хорошо|понятно|ясно|отлично|супер|класс|до свидания|пока)[\s!.,a-zа-яё]*$/i;
  var LIST_RE = /^(все )?(услуги( и цены)?|цены( и услуги)?|прайс|каталог|меню услуг)[.!?]*$/i;

  function priceAsked(t) {
    // «сколько» — вопрос о цене, но не «во/со/до скольки», «сколько длится», «сколько по времени»
    var x = t.toLowerCase().replace(/(во|со|до) скольк\S*/g, " ").replace(/сколько\s+(длится|времени|по времени|занима\S*|ид[её]т|ждать|часов|минут)/g, " ");
    return /(сколько|стоит|стоим|цен|прайс|почем|почём)/i.test(x);
  }
  function stems(t) {
    var out = {};
    (t || "").toLowerCase().replace(/ё/g, "е").split(/[^a-zа-я0-9]+/).forEach(function (w) {
      if (w.length < 4) return;
      var s = w.slice(0, 5);
      if (STOP.indexOf(s) >= 0 || STOP.indexOf(w.slice(0, 4)) >= 0) return;
      out[s] = 1;
    });
    return out;
  }
  function extra(text) {
    return SYNONYMS.filter(function (p) { return p[0].test(text); }).map(function (p) { return p[1]; }).join(" ");
  }
  function count(s, ch) { return s.split(ch).length - 1; }
  function kbSearch(text) {
    var q = stems(text + " " + extra(text)), price = priceAsked(text), res = [];
    D.kb.forEach(function (e, i) {
      var ts = stems(e.topic), as = stems(e.answer), sc = 0;
      Object.keys(q).forEach(function (w) { sc += (ts[w] ? 3 : 0) + (as[w] ? 1 : 0); });
      if (/мужск/i.test(e.topic) && !/муж/i.test(text)) sc -= 3;  // мужской раздел — только если спросили про мужские услуги
      var stem = sc;
      if (price) sc += count(e.answer, "₽") * 0.6 + (/цен|стоим/i.test(e.topic) ? 2 : 0);
      if (sc >= 1) res.push({ i: i, e: e, s: sc, stem: stem });
    });
    return res.sort(function (a, b) { return b.s - a.s; });
  }
  function focusAnswer(answer, text) {
    var q = stems(text + " " + extra(text));
    delete q["стоит"]; delete q["цена"]; delete q["цены"];
    var parts = (answer.trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map(function (p) { return p.trim(); }).filter(Boolean);
    if (parts.length < 2 || !Object.keys(q).length) return answer;
    var hit = function (p) { var s = stems(p); return Object.keys(q).some(function (w) { return s[w]; }); };
    var sel = parts.filter(hit);
    if (priceAsked(text) && sel.length && !sel.some(function (p) { return p.indexOf("₽") >= 0; }))
      sel = parts.filter(function (p) { return sel.indexOf(p) >= 0 || (p.indexOf("₽") >= 0 && hit(p)); });
    return sel.length > 0 && sel.length < parts.length ? sel.join(" ") : answer;
  }
  function maskPhones(t) {
    return t.replace(PHONE_RE, function (m, pre, num) {
      var n = num.replace(/\D/g, "").length;
      return pre + (n >= 10 && n <= 12 ? "[телефон]" : num);
    });
  }
  function hasPhone(t) { return maskPhones(t) !== t; }

  // ---------- переписка ----------
  var msgs = {}, nextId = 1, chosen = [], bk = null;
  function msg(role, text, buttons, extra) {
    var m = { id: nextId++, role: role, text: text, buttons: buttons && buttons.length ? buttons : null, set: null, cols: 1, kind: null, acts: null };
    for (var k in extra || {}) m[k] = extra[k];
    msgs[m.id] = m;
    return m;
  }
  function pub(m) { return { id: m.id, role: m.role, who: null, text: m.text, buttons: m.buttons, set: m.id, cols: m.cols, kind: m.kind }; }
  function user(t) { return msg("user", t); }
  function bot(t, labels, acts, extra) { var m = msg("bot", t, labels, extra); m.acts = acts || null; return m; }

  function svcLabel(sv) { return sv.price ? sv.name + " · " + sv.price : sv.name; }
  function svcLine() {
    return chosen.map(function (n) {
      var sv = D.services.filter(function (x) { return x.name === n; })[0];
      return sv && sv.price ? n + " (" + sv.price + ")" : n;
    }).join(", ");
  }
  function menu() { return [D.menu, ["prices", "book", "ask"]]; }

  // выбор услуг: одно сообщение, кнопки меняются на месте
  function pickerView(m, view) {
    var labels = [], acts = [], text;
    m.view = view;
    if (view === "groups") {
      text = (m.prefix ? m.prefix + "\n\n" : "") + D.servicesPrompt + " Сначала выберите раздел.";
      D.groups.forEach(function (g, i) { labels.push(g); acts.push("g:" + i); });
    } else {
      var g = D.groups[view];
      text = "Раздел «" + g + "». " + D.servicesPrompt;
      D.services.forEach(function (sv, i) {
        if (sv.group !== g) return;
        labels.push((chosen.indexOf(sv.name) >= 0 ? "✓ " : "") + svcLabel(sv));
        acts.push("s:" + i);
      });
      labels.push("‹ Другие разделы"); acts.push("groups");
    }
    if (chosen.length) {
      if (view !== "groups") text += "\n\nВыбрано: " + svcLine();
      labels.push("Записаться: выбрано " + chosen.length); acts.push("done");
    }
    m.text = text; m.buttons = labels; m.acts = acts;
    return m;
  }
  function picker(view, prefix) {
    var m = bot("", null, null, { kind: "svc" });
    m.prefix = prefix || "";
    return pickerView(m, view);
  }
  function groupOfTopic(i) { var t = D.kb[i].topic; var g = D.groups.indexOf(t); return g >= 0 ? g : null; }

  // ссылка YCLIENTS с уже отмеченными услугами: ...select-master?o=s123s456
  function ycIds() {
    if (!D.ycBase || !D.yc) return [];
    return chosen.map(function (n) { return D.yc[n]; }).filter(Boolean);
  }
  function bookingLink() {
    if (!D.booking) return { label: "Написать администратору →", url: D.admin };
    var ids = ycIds();
    var url = ids.length ? D.ycBase + ids.map(function (i) { return "s" + i; }).join("") : D.booking;
    return { label: "Онлайн-запись: мастер и время →", url: url };
  }
  function adminLink() { return { label: "Написать администратору →", url: D.admin }; }
  function bookMsg() {
    var s = chosen.length ? "Здравствуйте! Хочу записаться: " + chosen.join(", ") + ". Подскажите, пожалуйста, свободное время."
                          : "Здравствуйте! Хочу записаться на процедуру. Подскажите, пожалуйста, свободное время.";
    return encodeURIComponent(s);
  }
  function bookingButtons() {
    var b = [bookingLink()];
    if (D.wa) b.push({ label: "Записаться через WhatsApp →", url: D.wa + "?text=" + bookMsg() });
    if (D.tg) b.push({ label: "Записаться через Telegram →", url: D.tg + "?text=" + bookMsg() });
    return b;
  }
  function finishMsgs() { return canBook() ? startBooking() : [finish()]; }
  function finish() {
    var lead = chosen.length ? "Вы выбрали: " + svcLine() + ". " : "";
    var txt = D.booking
      ? lead + (ycIds().length
          ? "Нажмите кнопку ниже — откроется онлайн-запись студии, где эти услуги уже отмечены. Останется выбрать мастера и время."
          : "Выберите, как удобнее: онлайн-запись студии со свободным временем мастеров или сообщение администратору в WhatsApp или Telegram — текст с выбранными услугами уже подготовлен.")
      : lead + "Время подберёт администратор студии — напишите ему, кнопка ниже.";
    return bot(txt, bookingButtons());
  }


  // ---------- запись прямо в чате (через book.php на хостинге студии) ----------
  function P(x) { return Promise.resolve(x); }
  function canBook() { return !!D.api && chosen.length > 0 && ycIds().length === chosen.length; }
  function api(a, params, body) {
    var q = Object.keys(params || {}).map(function (k) { return k + "=" + encodeURIComponent(params[k]); }).join("&");
    var opt = body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : { cache: "no-store" };
    return fetch(D.api + "?a=" + a + (q ? "&" + q : ""), opt)
      .then(function (r) { return r.json(); }, function () { return { ok: false, error: "net" }; })
      .then(function (d) {
        if (!d || !d.ok) { var e = new Error((d && d.message) || ""); e.code = (d && d.error) || "api"; throw e; }
        return d.data;
      });
  }
  function cap(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }
  function fmtDate(s) {
    var p = s.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]), t = new Date();
    t.setHours(0, 0, 0, 0);
    var diff = Math.round((d - t) / 864e5);
    var day = d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
    if (diff === 0) return "Сегодня, " + day;
    if (diff === 1) return "Завтра, " + day;
    return cap(d.toLocaleDateString("ru-RU", { weekday: "short" })) + ", " + day;
  }
  function maskNum(p) { var d = p.replace(/\D/g, ""); return "+" + d.slice(0, 1) + " ••• •••-" + d.slice(-4, -2) + "-" + d.slice(-2); }
  function normPhone(t) {
    var d = String(t || "").replace(/\D/g, "");
    if (d.length === 11 && d.charAt(0) === "8") d = "7" + d.slice(1);
    if (d.length === 10 && d.charAt(0) === "9") d = "7" + d;
    return d.length >= 11 && d.length <= 15 ? d : "";
  }
  function bkWhen() { var d = fmtDate(bk.date); return d.charAt(0).toLowerCase() + d.slice(1) + " в " + bk.time; }
  function bkSummary() { return svcLine() + "\nМастер: " + bk.staffName + "\nКогда: " + bkWhen(); }
  function fail(e) {
    var code = e && e.code;
    var keep = bk;
    bk = null;
    if (code === "not_configured" || code === "net" && !keep) return [finish()];
    var why = code === "rate" ? e.message : "Не получилось связаться с онлайн-записью.";
    return [bot(why + " Можно записаться на странице онлайн-записи студии — выбранные услуги там уже отмечены.", [bookingLink()])];
  }
  function startBooking() {
    bk = { step: "staff", ids: ycIds(), list: [], dates: [], times: [] };
    return api("staff", { s: bk.ids.join(",") }).then(function (list) {
      if (!list.length) {
        bk = null;
        return [bot("Вы выбрали: " + svcLine() + ".\n\nНа эти услуги сейчас нет свободных мастеров для онлайн-записи. Администратор подберёт время.", [adminLink()])];
      }
      bk.list = list;
      var labels = list.map(function (s) { return s.name; }), acts = list.map(function (s, i) { return "bs:" + i; });
      if (list.length > 1) { labels.push("Любой мастер"); acts.push("bs:any"); }
      return [bot("Вы выбрали: " + svcLine() + ".\n\nК какому мастеру записать?", labels, acts)];
    }).catch(fail);
  }
  function askDates() {
    bk.step = "date";
    return api("dates", { s: bk.ids.join(","), staff: bk.staffId }).then(function (dates) {
      bk.dates = dates.slice(0, 10);
      if (!bk.dates.length) {
        return [bot("У мастера нет свободных дней в ближайшее время.", ["‹ Другой мастер"], ["bk:staff"])];
      }
      var labels = bk.dates.map(fmtDate), acts = bk.dates.map(function (d, i) { return "bd:" + i; });
      labels.push("‹ Другой мастер"); acts.push("bk:staff");
      return [bot("Мастер: " + bk.staffName + ". Выберите день:", labels, acts, { cols: 2 })];
    }).catch(fail);
  }
  function askTimes(prefix) {
    bk.step = "time";
    return api("times", { s: bk.ids.join(","), staff: bk.staffId, date: bk.date }).then(function (times) {
      bk.times = times.slice(0, 24);
      if (!bk.times.length) return [bot((prefix || "") + "На " + fmtDate(bk.date).toLowerCase() + " свободного времени уже нет.", ["‹ Другой день"], ["bk:dates"])];
      var labels = bk.times.map(function (t) { return t.time; }), acts = bk.times.map(function (t, i) { return "bt:" + i; });
      labels.push("‹ Другой день"); acts.push("bk:dates");
      return [bot((prefix || "") + fmtDate(bk.date) + ". Выберите время:", labels, acts, { cols: 2 })];
    }).catch(fail);
  }
  function askConfirm() {
    bk.step = "confirm";
    return [bot("Проверьте запись:\n" + bkSummary() + "\nИмя: " + bk.name + "\nТелефон: " + maskNum(bk.phone) +
      "\n\nНажимая «Подтвердить», вы даёте согласие ООО «УАЙКЛАЕНТС» (сервис онлайн-записи студии) на обработку имени и телефона для записи.",
      ["Подтвердить запись", "Изменить время", "Отменить"], ["bk:confirm", "bk:dates", "bk:cancel"])];
  }
  function doRecord() {
    bk.step = "sending";
    return api("record", {}, { s: bk.ids, staff: bk.staffId, dt: bk.dt, name: bk.name, phone: bk.phone, code: bk.code || "" })
      .then(function () {
        var text = "Готово, вы записаны!\n" + svcLine() + "\nМастер: " + bk.staffName + "\nКогда: " + bkWhen() + "\n\nЖдём вас: " + D.address + ". Если планы изменятся, напишите администратору.";
        bk = null; chosen = [];
        return [bot(text, [adminLink()])];
      })
      .catch(function (e) {
        if (e.code === "code_required" || e.code === "code_wrong") {
          var again = e.code === "code_wrong";
          return api("code", {}, { phone: bk.phone }).then(function () {
            bk.step = "code";
            return [bot((again ? "Код не подошёл — отправили новый SMS" : "Отправили SMS с кодом") + " на номер " + maskNum(bk.phone) + ". Напишите код сюда, в чат.", ["Отменить"], ["bk:cancel"])];
          }).catch(fail);
        }
        if (e.code === "busy") { bk.dt = null; return askTimes("Это время только что заняли. "); }
        if (e.code === "bad_phone") { bk.step = "phone"; bk.phone = null; return [bot("YCLIENTS не принял номер. Проверьте его и напишите ещё раз.")]; }
        if (e.code === "blocked") { bk = null; return [bot(e.message, [adminLink()])]; }
        return fail(e);
      });
  }
  function bookPress(act) {
    if (!bk) return canBook() ? startBooking() : [bot("Давайте начнём заново: выберите услуги.", ["Записаться"], ["book"])];
    var k = act.split(":"), v = k[1];
    if (act === "bk:cancel") { bk = null; return [bot("Хорошо, запись отменена. Если захотите — нажмите «Записаться».", ["Записаться"], ["book"])]; }
    if (act === "bk:staff") return startBooking();
    if (act === "bk:dates") return askDates();
    if (act === "bk:confirm") return bk.step === "confirm" ? doRecord() : [];
    if (k[0] === "bs") {
      var s = v === "any" ? null : bk.list[+v];
      bk.staffId = s ? s.id : 0; bk.staffName = s ? s.name : "любой свободный";
      return askDates();
    }
    if (k[0] === "bd" && bk.dates[+v]) { bk.date = bk.dates[+v]; return askTimes(); }
    if (k[0] === "bt" && bk.times[+v]) {
      bk.time = bk.times[+v].time; bk.dt = bk.times[+v].dt;
      if (bk.name && bk.phone) return askConfirm();
      bk.step = "name";
      return [bot("Записываю: " + bkWhen() + ", мастер " + bk.staffName + ".\n\nКак вас зовут?", ["Отменить"], ["bk:cancel"])];
    }
    return [];
  }
  function bookText(t) {  // ответы на вопросы записи; null — это не про запись
    if (!bk) return null;
    if (/^(отмена|отменить|стоп|не надо|передумал\S*)[.!]*$/i.test(t)) return bookPress("bk:cancel");
    if (bk.step === "name") {
      if (hasPhone(t)) return [bot("Сначала напишите, пожалуйста, имя.")];
      var n = t.replace(/\s+/g, " ").trim();
      if (!/[a-zа-яё]/i.test(n) || n.length < 2 || n.length > 40) return [bot("Напишите, пожалуйста, имя — например, Анна.")];
      bk.name = cap(n); bk.step = "phone";
      return [bot("Спасибо, " + bk.name + "! Оставьте номер телефона — на него придёт подтверждение записи.")];
    }
    if (bk.step === "phone") {
      var ph = normPhone(t);
      if (!ph) return [bot("Напишите номер телефона, например +7 999 123-45-67.")];
      bk.phone = ph;
      return askConfirm();
    }
    if (bk.step === "code") {
      var c = t.replace(/\D/g, "");
      if (c.length < 4 || c.length > 8) return [bot("Напишите код из SMS — только цифры.")];
      bk.code = c;
      return doRecord();
    }
    return null;
  }
  function stateOut() { return { phone: !!(bk && bk.step === "phone") }; }

  // ---------- ответ на текст ----------
  function answer(text) {
    var t = text.trim(), tl = t.toLowerCase(), out = [];
    if (!/[a-zа-яё0-9]/i.test(t)) return [bot("Напишите, пожалуйста, вопрос словами — подскажу.")];
    var bt = bookText(t);
    if (bt) return bt;
    if (hasPhone(t)) {
      return [bot("Спасибо! Номер в чате не нужен: его вы оставите в онлайн-записи студии, там же выберете время.", ["Записаться"], ["book"])];
    }
    if (THANKS_RE.test(tl)) return [bot("Пожалуйста! Если появятся вопросы — пишите.")];
    if (HELLO_RE.test(tl) && tl.length < 30) { var mm = menu(); return [bot("Здравствуйте! Подскажу цены и помогу выбрать процедуру.", mm[0], mm[1])]; }
    var hits = kbSearch(t), stemHit = hits.some(function (h) { return h.stem > 0; });
    if (CANCEL_RE.test(tl)) {
      var ce = D.kb.filter(function (e) { return /перенос|отмен/i.test(e.topic); })[0];
      return [bot((ce ? ce.answer : "Перенести или отменить запись можно через администратора студии."), [adminLink()])];
    }
    if (HANDOFF_RE.test(tl)) return [bot("Администратор студии ответит в Telegram или по телефону " + D.phone + ".", [adminLink()])];
    if (DURATION_RE.test(tl)) return [bot("Длительность зависит от процедуры и мастера — уточните у администратора, он подскажет.", [adminLink()])];
    if (OBJECTION_RE.test(tl)) return [bot(D.objection, ["Записаться"], ["book"])];
    if (LIST_RE.test(tl) || (priceAsked(tl) && !stemHit)) {
      return [bot("Вот все наши услуги с ценами. Откройте раздел и отметьте процедуры — можно несколько, из разных разделов."), picker("groups")];
    }
    if (BOOK_RE.test(tl) && !priceAsked(tl)) {
      if (chosen.length) return finishMsgs();
      var q = stems(t), gi = null;
      D.groups.forEach(function (g, i) {  // «запишите на педикюр» — сразу раздел «Педикюр»
        if (gi !== null || (/мужск/i.test(g) && !/муж/i.test(t))) return;
        if (Object.keys(stems(g)).some(function (w) { return q[w]; })) gi = i;
      });
      return [picker(gi === null ? "groups" : gi, "Отлично! Выберите процедуры, а потом — как удобнее записаться: онлайн, в WhatsApp или Telegram.")];
    }
    if (hits.length) {
      var h = hits[0], g = groupOfTopic(h.i);
      out.push(bot(focusAnswer(h.e.answer, t)));
      if (g !== null) out.push(picker(g));
      else if (!priceAsked(tl)) { var mn = menu(); out[0].buttons = mn[0]; out[0].acts = mn[1]; }
      return out;
    }
    return [bot("Точного ответа у меня нет — напишите администратору, он подскажет.", [adminLink()])];
  }

  // ---------- кнопки ----------
  function press(m, i) {
    var act = m.acts && m.acts[i], label = m.buttons && m.buttons[i];
    if (!act) return { messages: [] };
    if (m.kind === "svc") {
      if (act.indexOf("g:") === 0) return { updated: [pub(pickerView(m, +act.slice(2)))] };
      if (act === "groups") return { updated: [pub(pickerView(m, "groups"))] };
      if (act.indexOf("s:") === 0) {
        var name = D.services[+act.slice(2)].name, k = chosen.indexOf(name);
        if (k >= 0) chosen.splice(k, 1); else chosen.push(name);
        return { updated: [pub(pickerView(m, m.view))] };
      }
      if (act === "done") {
        m.buttons = null; m.acts = null;
        var u = user(label);
        return P(finishMsgs()).then(function (r) { return { messages: [pub(u)].concat(r.map(pub)), updated: [pub(m)], state: stateOut() }; });
      }
    }
    var echo = user(label), res;
    if (/^(bk|bs|bd|bt):/.test(act)) res = bookPress(act);
    else if (act === "prices") res = [bot("Вот все наши услуги с ценами. Откройте раздел и отметьте процедуры — можно несколько, из разных разделов."), picker("groups")];
    else if (act === "book") res = chosen.length ? finishMsgs() : [picker("groups", "Отлично! Выберите процедуры" + (D.api ? ", а потом мастера и время." : ", а потом — как удобнее записаться: онлайн, в WhatsApp или Telegram."))];
    else if (act === "ask") res = [bot("Напишите вопрос — про цены, процедуры, адрес или запись.")];
    else res = [];
    return P(res).then(function (r) { return { messages: [pub(echo)].concat(r.map(pub)), state: stateOut() }; });
  }

  // ---------- «сервер» для окна чата ----------
  function handle(path, data) {
    data = data || {};
    if (path === "/api/start") {
      msgs = {}; nextId = 1; chosen = []; bk = null;
      var mm = menu();
      return { sid: "local", messages: [pub(bot(D.greeting, mm[0], mm[1]))], state: {} };
    }
    if (path.indexOf("/api/poll") === 0) return { messages: [] };
    if (path === "/api/send") {
      var text = String(data.text || "").slice(0, 1000);
      var echo = user(maskPhones(text));
      return P(answer(text)).then(function (r) { return { messages: [pub(echo)].concat(r.map(pub)), state: stateOut() }; });
    }
    if (path === "/api/phone") {  // форма телефона с галочкой согласия
      var e2 = user(maskNum(normPhone(data.phone) || String(data.phone || "")));
      var rr = bk && bk.step === "phone" ? bookText(String(data.phone || "")) : [bot("Номер сейчас не нужен.")];
      return P(rr).then(function (r) { return { messages: [pub(e2)].concat(r.map(pub)), state: stateOut() }; });
    }
    if (path === "/api/button") {
      var m = msgs[data.mid] || msgs[data.set];
      return m ? press(m, +data.i) : { messages: [] };
    }
    return { messages: [] };
  }
  function settings(o) {
    if (o && typeof o.booking === "string") D.booking = o.booking.trim();
    if (o && typeof o.admin === "string" && o.admin.trim()) D.admin = o.admin.trim();
    if (o && typeof o.bookingServices === "string") D.ycBase = o.bookingServices.trim();
    if (o && o.services && typeof o.services === "object") D.yc = o.services;
    if (o && typeof o.api === "string") D.api = o.api.trim();
  }
  return { handle: handle, settings: settings, _kbSearch: kbSearch, _priceAsked: priceAsked };
})();

/* Чат AI-менеджера для сайта. Подключение: <script src="https://адрес-сервера/widget.js" async></script> */
(function () {
  "use strict";
  if (window.__standbotChat) return;
  window.__standbotChat = true;

  var CONF = {"title": "Рефлекшн · запись", "subtitle": "Онлайн-помощник · отвечает сразу", "color": "#C2185B", "position": "right", "policy": "", "teaser": "Здравствуйте! Подскажу цены и помогу записаться в «Рефлекшн».", "teaserSec": 6, "manager": "администратор"};
  var script = document.currentScript;
  var API = script && script.src ? script.src.replace(/\/widget\.js(\?.*)?$/, "") : "";
  var SID_KEY = "standbot_sid:" + API;
  var OPEN_KEY = "standbot_open:" + API;
  var TEASER_KEY = "standbot_teaser:" + API;

  function store(kind) {
    return {
      get: function (k) { try { return window[kind].getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { if (v == null) window[kind].removeItem(k); else window[kind].setItem(k, v); } catch (e) { /* приватный режим */ } }
    };
  }
  var LS = store("localStorage"), SS = store("sessionStorage");

  var S = { sid: LS.get(SID_KEY), msgs: [], byId: {}, lastId: 0, open: false, busy: false, state: {}, textMode: false,
            unread: 0, timer: null, pending: null };

  // ---------- цвета ----------
  var color = /^#[0-9a-f]{6}$/i.test(CONF.color || "") ? CONF.color : "#2F6F5E";
  function onColor(hex) {
    var r = parseInt(hex.substr(1, 2), 16), g = parseInt(hex.substr(3, 2), 16), b = parseInt(hex.substr(5, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) > 170 ? "#16181d" : "#ffffff";
  }
  var side = CONF.position === "left" ? "left" : "right";

  var CSS = [
    ":host{all:initial}",
    "*{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif}",
    ".w{--c:" + color + ";--on:" + onColor(color) + ";position:fixed;bottom:20px;" + side + ":20px;z-index:2147483000;color:#16181d;font-size:15px;line-height:1.4}",
    ".btn{width:60px;height:60px;border-radius:50%;border:0;background:var(--c);color:var(--on);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(0,0,0,.22);transition:transform .15s}",
    ".btn:hover{transform:scale(1.06)}.btn svg{width:28px;height:28px}",
    ".badge{position:absolute;top:-2px;" + (side === "left" ? "left" : "right") + ":-2px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:#e5484d;color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff}",
    ".teaser{position:absolute;bottom:74px;" + side + ":0;width:260px;background:#fff;border-radius:14px;padding:12px 30px 12px 14px;box-shadow:0 8px 30px rgba(0,0,0,.18);cursor:pointer;font-size:14px;animation:up .25s ease-out}",
    ".teaser .tx{position:absolute;top:4px;right:4px;width:24px;height:24px;border:0;background:none;color:#8a8f98;cursor:pointer;font-size:18px;line-height:1}",
    ".panel{position:absolute;bottom:76px;" + side + ":0;width:380px;height:min(620px,calc(100vh - 110px));background:#fff;border-radius:18px;box-shadow:0 12px 48px rgba(0,0,0,.24);display:flex;flex-direction:column;overflow:hidden;animation:up .2s ease-out}",
    "@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}",
    ".head{background:var(--c);color:var(--on);padding:14px 12px 14px 16px;display:flex;align-items:center;gap:12px;flex:none}",
    ".ava{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:17px;flex:none}",
    ".ht{flex:1;min-width:0}.t{font-weight:650;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".st{font-size:12.5px;opacity:.85;display:flex;align-items:center;gap:6px}.dot{width:8px;height:8px;border-radius:50%;background:#4ade80}",
    ".x{width:36px;height:36px;border:0;border-radius:10px;background:transparent;color:var(--on);cursor:pointer;display:flex;align-items:center;justify-content:center}.x:hover{background:rgba(255,255,255,.15)}.x svg{width:20px;height:20px}",
    ".body{flex:1;overflow-y:auto;padding:16px 14px 8px;background:#f5f6f8;overscroll-behavior:contain}",
    ".m{display:flex;flex-direction:column;margin-bottom:10px;max-width:86%}",
    ".m.u{margin-left:auto;align-items:flex-end}",
    ".who{font-size:12px;color:#6b7280;margin:0 0 3px 4px;font-weight:600}",
    ".b{padding:9px 13px;border-radius:16px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere}",
    ".m.bot .b{background:#fff;border-bottom-left-radius:5px;box-shadow:0 1px 2px rgba(0,0,0,.06)}",
    ".m.mgr .b{background:#fff;border-bottom-left-radius:5px;box-shadow:0 1px 2px rgba(0,0,0,.06);border-left:3px solid var(--c)}",
    ".m.u .b{background:var(--c);color:var(--on);border-bottom-right-radius:5px}",
    ".m.pend .b{opacity:.6}",
    ".bs{display:grid;gap:6px;margin-top:7px;width:100%}.bs.c2{grid-template-columns:1fr 1fr}",
    ".q{border:1.5px solid var(--c);background:#fff;color:var(--c);border-radius:12px;padding:8px 12px;font-size:14px;cursor:pointer;text-align:left;line-height:1.3;font-weight:550}",
    ".q:hover:not(:disabled){background:var(--c);color:var(--on)}.q:disabled{opacity:.5;cursor:default}",
    ".typing{display:inline-flex;gap:4px;background:#fff;padding:12px 14px;border-radius:16px;border-bottom-left-radius:5px;margin-bottom:10px;box-shadow:0 1px 2px rgba(0,0,0,.06)}",
    ".typing i{width:7px;height:7px;border-radius:50%;background:#a0a5ad;animation:bl 1.2s infinite}.typing i:nth-child(2){animation-delay:.2s}.typing i:nth-child(3){animation-delay:.4s}",
    "@keyframes bl{0%,80%,100%{opacity:.3}40%{opacity:1}}",
    ".err{background:#fdecec;color:#b42318;font-size:13px;padding:8px 14px;flex:none}",
    ".compose{display:flex;align-items:flex-end;gap:8px;padding:10px 10px 10px 14px;border-top:1px solid #eceef1;background:#fff;flex:none}",
    "textarea{flex:1;border:0;outline:0;resize:none;font-size:15px;max-height:110px;min-height:24px;padding:7px 0;background:transparent;color:#16181d}",
    ".send{width:40px;height:40px;border-radius:50%;border:0;background:var(--c);color:var(--on);cursor:pointer;flex:none;display:flex;align-items:center;justify-content:center}.send:disabled{opacity:.4;cursor:default}.send svg{width:19px;height:19px}",
    ".phone{padding:12px 14px 12px;border-top:1px solid #eceef1;background:#fff;flex:none}",
    ".pl{font-size:13px;font-weight:600;color:#374151;margin-bottom:6px}",
    ".prow{display:flex;gap:8px}.prow input{flex:1;min-width:0;border:1.5px solid #d4d7dd;border-radius:12px;padding:10px 12px;font-size:16px;outline:0;color:#16181d}.prow input:focus{border-color:var(--c)}",
    ".prow button{border:0;border-radius:12px;background:var(--c);color:var(--on);padding:0 16px;font-size:15px;font-weight:600;cursor:pointer}.prow button:disabled{opacity:.4;cursor:default}",
    ".consent{display:flex;gap:8px;align-items:flex-start;font-size:12.5px;color:#4b5563;margin-top:9px;cursor:pointer;line-height:1.35}.consent input{margin:2px 0 0;width:16px;height:16px;accent-color:var(--c);flex:none}",
    ".consent a{color:var(--c)}",
    ".q.go{display:block;text-align:center;text-decoration:none;background:var(--c);color:var(--on);font-weight:600}",
    ".alt{border:0;background:none;color:#6b7280;font-size:12.5px;padding:6px 0 0;cursor:pointer;text-decoration:underline}",
    ".back{border:0;background:none;color:var(--c);font-size:12.5px;padding:0 14px 8px;cursor:pointer;text-align:left;background:#fff;flex:none;text-decoration:underline}",
    ".foot{font-size:11px;color:#9aa0a8;text-align:center;padding:0 10px 7px;background:#fff;flex:none}",
    ".hidden{display:none!important}",
    "@media (max-width:520px){.w{bottom:14px;" + side + ":14px}.panel{position:fixed;inset:0;width:auto;height:auto;border-radius:0;bottom:0}.w.o .btn,.w.o .teaser{display:none}}"
  ].join("\n");

  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 20.5l1.5-4.6A8.4 8.4 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/></svg>';
  var ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4l17.4-7.5c.8-.4.8-1.5 0-1.8L3.4 3.6c-.7-.3-1.4.3-1.3 1l1 5.6c.1.5.5.8 1 .9L13 12l-8.9.9c-.5.1-.9.4-1 .9l-1 5.6c-.1.7.6 1.3 1.3 1z"/></svg>';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // ---------- разметка ----------
  var host = el("div");
  host.id = "standbot-chat";
  var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
  var style = el("style");
  style.textContent = CSS;
  root.appendChild(style);
  var W = el("div", "w");
  root.appendChild(W);

  var panel = el("div", "panel hidden");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", CONF.title || "Чат");
  var head = el("div", "head");
  var ava = el("div", "ava", (CONF.title || "Ч").trim().charAt(0).toUpperCase());
  var ht = el("div", "ht");
  ht.appendChild(el("div", "t", CONF.title || "Чат"));
  var st = el("div", "st");
  st.appendChild(el("span", "dot"));
  st.appendChild(el("span", null, CONF.subtitle || "Онлайн"));
  ht.appendChild(st);
  var bx = el("button", "x");
  bx.type = "button";
  bx.setAttribute("aria-label", "Свернуть чат");
  bx.innerHTML = ICON_X;
  head.appendChild(ava); head.appendChild(ht); head.appendChild(bx);

  var body = el("div", "body");
  var list = el("div");
  var typing = el("div", "typing hidden");
  typing.innerHTML = "<i></i><i></i><i></i>";
  body.appendChild(list); body.appendChild(typing);
  var err = el("div", "err hidden");

  var compose = el("form", "compose");
  var ta = el("textarea");
  ta.rows = 1;
  ta.placeholder = "Напишите сообщение…";
  ta.maxLength = 1000;
  ta.setAttribute("aria-label", "Сообщение");
  var send = el("button", "send");
  send.type = "submit";
  send.setAttribute("aria-label", "Отправить");
  send.innerHTML = ICON_SEND;
  compose.appendChild(ta); compose.appendChild(send);

  var back = el("button", "back hidden", "← Оставить номер телефона");
  back.type = "button";

  var phone = el("form", "phone hidden");
  phone.appendChild(el("div", "pl", "Номер телефона"));
  var prow = el("div", "prow");
  var pin = el("input");
  pin.type = "tel"; pin.inputMode = "tel"; pin.autocomplete = "tel"; pin.placeholder = "+7 999 123-45-67"; pin.maxLength = 22;
  pin.setAttribute("aria-label", "Номер телефона");
  var psend = el("button", null, "Отправить");
  psend.type = "submit";
  prow.appendChild(pin); prow.appendChild(psend);
  phone.appendChild(prow);
  var consent = el("label", "consent");
  var cb = el("input");
  cb.type = "checkbox";
  var ctext = el("span", null, "Соглашаюсь на обработку персональных данных ООО «УАЙКЛАЕНТС» (онлайн-запись студии)");
  if (CONF.policy) {
    ctext.appendChild(document.createTextNode(" согласно "));
    var a = el("a", null, "политике конфиденциальности");
    a.href = CONF.policy; a.target = "_blank"; a.rel = "noopener";
    ctext.appendChild(a);
  }
  consent.appendChild(cb); consent.appendChild(ctext);
  phone.appendChild(consent);
  var alt = el("button", "alt", "Написать сообщение вместо номера");
  alt.type = "button";
  phone.appendChild(alt);

  var foot = el("div", "foot", "Отвечает автоматический помощник. Если нужно, подскажет, как связаться с администратором.");

  panel.appendChild(head); panel.appendChild(body); panel.appendChild(err); panel.appendChild(compose);
  panel.appendChild(back); panel.appendChild(phone); panel.appendChild(foot);

  var teaser = el("div", "teaser hidden");
  var teaserText = el("div", null, CONF.teaser || "");
  var tx = el("button", "tx", "×");
  tx.type = "button";
  tx.setAttribute("aria-label", "Скрыть подсказку");
  teaser.appendChild(teaserText); teaser.appendChild(tx);

  var btn = el("button", "btn");
  btn.type = "button";
  btn.setAttribute("aria-label", "Открыть чат");
  btn.innerHTML = ICON_CHAT;
  var badge = el("span", "badge hidden");
  btn.appendChild(badge);

  W.appendChild(panel); W.appendChild(teaser); W.appendChild(btn);

  // ---------- сеть ----------
  var SETTINGS = fetch(API + "/bot-settings.json", { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : {}; }).then(HKBot.settings, function () {});
  function call(method, path, data) {
    return SETTINGS.then(function () { return HKBot.handle(path, data); });
  }

  // ---------- переписка ----------
  function apply(d, silent) {
    var added = false;
    (d.messages || []).forEach(function (m) {
      if (S.byId[m.id]) { S.byId[m.id] = m; replace(m); return; }
      S.byId[m.id] = m;
      S.msgs.push(m);
      added = true;
      if (m.id > S.lastId) S.lastId = m.id;
      if (!silent && !S.open && m.role !== "user") S.unread++;
    });
    (d.updated || []).forEach(function (m) { S.byId[m.id] = m; replace(m); });
    if (d.state) S.state = d.state;
    if (!S.state.phone) S.textMode = false;
    render(added);
  }
  function replace(m) {
    for (var i = 0; i < S.msgs.length; i++) if (S.msgs[i].id === m.id) S.msgs[i] = m;
  }

  function render(scroll) {
    list.textContent = "";
    var lastUser = -1;
    S.msgs.forEach(function (m, i) { if (m.role === "user") lastUser = i; });
    S.msgs.forEach(function (m, i) {  // после кнопки-ссылки в онлайн-запись старые кнопки выбора скрываем
      if (m.buttons && m.buttons.some(function (b) { return b && b.url; })) lastUser = Math.max(lastUser, i - 1);
    });
    S.msgs.forEach(function (m, i) {
      var box = el("div", "m " + (m.role === "user" ? "u" : m.role));
      if (m.role === "mgr" && m.who) box.appendChild(el("div", "who", m.who));
      box.appendChild(el("div", "b", m.text));
      if (m.buttons && m.buttons.length && i > lastUser && m.role !== "user") {
        var bs = el("div", "bs" + (m.cols === 2 ? " c2" : ""));
        m.buttons.forEach(function (label, j) {
          if (label && typeof label === "object" && label.url) {
            var a = el("a", "q go", label.label);
            a.href = label.url; a.target = "_blank"; a.rel = "noopener";
            bs.appendChild(a);
            return;
          }
          var q = el("button", "q", label);
          q.type = "button";
          q.disabled = S.busy;
          q.addEventListener("click", function () { press(m, j, label); });
          bs.appendChild(q);
        });
        box.appendChild(bs);
      }
      list.appendChild(box);
    });
    if (S.pending) {
      var pb = el("div", "m u pend");
      pb.appendChild(el("div", "b", S.pending));
      list.appendChild(pb);
    }
    typing.classList.toggle("hidden", !S.busy || S.quiet);
    var phoneOn = !!S.state.phone && !S.textMode;
    phone.classList.toggle("hidden", !phoneOn);
    compose.classList.toggle("hidden", phoneOn);
    back.classList.toggle("hidden", !(S.state.phone && S.textMode));
    send.disabled = S.busy;
    psend.disabled = S.busy || !cb.checked || digits(pin.value) < 10;
    badge.textContent = S.unread > 9 ? "9+" : String(S.unread);
    badge.classList.toggle("hidden", !S.unread || S.open);
    if (scroll) body.scrollTop = body.scrollHeight;
  }

  function showErr(text) {
    err.textContent = text || "";
    err.classList.toggle("hidden", !text);
  }

  function busy(on, quiet) {
    S.busy = on;
    S.quiet = !!quiet;
    render(true);
  }

  function resetIfNeeded(e) {
    if (e && e.reset) {
      S.sid = null; LS.set(SID_KEY, null);
      S.msgs = []; S.byId = {}; S.lastId = 0;
      showErr("Диалог устарел, начинаем заново.");
      start();
      return true;
    }
    return false;
  }

  function withDelay(p) {  // короткая пауза «печатает…», чтобы ответ не появлялся мгновенно
    var t0 = Date.now();
    return p.then(function (d) {
      var wait = Math.max(0, 450 - (Date.now() - t0));
      return new Promise(function (res) { setTimeout(function () { res(d); }, wait); });
    });
  }

  function start() {
    if (S.busy) return;
    busy(true);
    var q = {};
    try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) { /* старый браузер */ }
    call("POST", "/api/start", { sid: S.sid, source: q.utm_source || "", page: location.origin + location.pathname })
      .then(function (d) {
        S.sid = d.sid; LS.set(SID_KEY, d.sid);
        S.msgs = []; S.byId = {}; S.lastId = 0;
        busy(false);
        apply(d, true);
        schedule();
      })
      .catch(function (e) { busy(false); showErr(e.message); });
  }

  function sendText(text) {
    text = (text || "").trim();
    if (!text || S.busy) return;
    showErr("");
    S.pending = text;
    ta.value = ""; grow();
    busy(true);
    withDelay(call("POST", "/api/send", { sid: S.sid, text: text }))
      .then(function (d) {
        S.pending = null;
        if (d.phone_form) { S.textMode = false; pin.value = d.phone_form; }  // номер, написанный текстом, переносим в форму
        busy(false); apply(d);
        if (d.phone_form) cb.focus();
      })
      .catch(function (e) {
        S.pending = null; busy(false);
        if (!resetIfNeeded(e)) { ta.value = text; grow(); showErr(e.message); }
      });
  }

  function press(m, j, label) {
    if (S.busy) return;
    showErr("");
    var svc = m.kind === "svc";  // выбор услуг: галочки меняются на месте, без «печатает…»
    busy(true, svc);
    var p = call("POST", "/api/button", { sid: S.sid, set: m.set, i: j, mid: m.id });
    (svc ? p : withDelay(p))
      .then(function (d) { busy(false); apply(d); })
      .catch(function (e) { busy(false); if (!resetIfNeeded(e)) showErr(e.message); });
  }

  function digits(v) { return (v || "").replace(/\D/g, "").length; }

  function sendPhone() {
    if (S.busy) return;
    if (!cb.checked) { showErr("Отметьте согласие на обработку персональных данных."); return; }
    if (digits(pin.value) < 10) { showErr("Проверьте номер: например, +7 999 123-45-67"); return; }
    showErr("");
    busy(true);
    withDelay(call("POST", "/api/phone", { sid: S.sid, phone: pin.value, consent: true }))
      .then(function (d) { pin.value = ""; cb.checked = false; busy(false); apply(d); })
      .catch(function (e) { busy(false); if (!resetIfNeeded(e)) showErr(e.message); });
  }

  // ---------- новые сообщения от менеджера ----------
  function schedule() {
    clearTimeout(S.timer);
    if (!S.sid) return;
    var delay = S.open ? (document.hidden ? 15000 : 3000) : 20000;
    S.timer = setTimeout(poll, delay);
  }
  function poll() {
    if (!S.sid) return;
    if (S.busy) { schedule(); return; }
    call("GET", "/api/poll?sid=" + encodeURIComponent(S.sid) + "&after=" + S.lastId)
      .then(function (d) { if (!S.busy) apply(d); schedule(); })
      .catch(function (e) {
        if (e.reset) { S.sid = null; LS.set(SID_KEY, null); S.msgs = []; S.byId = {}; S.lastId = 0; render(); return; }
        schedule();
      });
  }

  // ---------- открыть / закрыть ----------
  function open() {
    S.open = true;
    SS.set(OPEN_KEY, "1");
    SS.set(TEASER_KEY, "1");
    teaser.classList.add("hidden");
    panel.classList.remove("hidden");
    W.classList.add("o");
    btn.setAttribute("aria-label", "Свернуть чат");
    S.unread = 0;
    if (!S.sid || !S.msgs.length) start(); else { render(true); schedule(); }
    setTimeout(function () { if (window.innerWidth > 520) (S.state.phone && !S.textMode ? pin : ta).focus(); }, 60);
  }
  function close() {
    S.open = false;
    SS.set(OPEN_KEY, null);
    panel.classList.add("hidden");
    W.classList.remove("o");
    btn.setAttribute("aria-label", "Открыть чат");
    render();
    schedule();
  }

  function grow() {
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 110) + "px";
  }

  btn.addEventListener("click", function () { S.open ? close() : open(); });
  bx.addEventListener("click", close);
  teaser.addEventListener("click", function (e) { if (e.target !== tx) open(); });
  tx.addEventListener("click", function () { teaser.classList.add("hidden"); SS.set(TEASER_KEY, "1"); });
  compose.addEventListener("submit", function (e) { e.preventDefault(); sendText(ta.value); });
  ta.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); sendText(ta.value); }
  });
  ta.addEventListener("input", grow);
  phone.addEventListener("submit", function (e) { e.preventDefault(); sendPhone(); });
  pin.addEventListener("input", function () {
    var v = pin.value.replace(/[^\d+\-()\s]/g, "");
    if (v !== pin.value) pin.value = v;
    render();
  });
  cb.addEventListener("change", function () { if (cb.checked) showErr(""); render(); });
  alt.addEventListener("click", function () { S.textMode = true; render(); ta.focus(); });
  back.addEventListener("click", function () { S.textMode = false; render(); pin.focus(); });
  root.addEventListener("keydown", function (e) { if (e.key === "Escape" && S.open) close(); });
  document.addEventListener("visibilitychange", function () { if (S.sid) schedule(); });

  // ---------- старт ----------
  function mount() {
    document.body.appendChild(host);
    if (S.sid) {  // посетитель уже писал: подтягиваем переписку, не считая её непрочитанной
      call("GET", "/api/poll?sid=" + encodeURIComponent(S.sid) + "&after=0")
        .then(function (d) { apply(d, true); if (SS.get(OPEN_KEY)) open(); else schedule(); })
        .catch(function (e) { if (e.reset) { S.sid = null; LS.set(SID_KEY, null); } if (SS.get(OPEN_KEY)) open(); });
    } else if (SS.get(OPEN_KEY)) {
      open();
    } else if (CONF.teaser && CONF.teaserSec > 0 && !SS.get(TEASER_KEY)) {
      setTimeout(function () { if (!S.open && !S.sid) teaser.classList.remove("hidden"); }, CONF.teaserSec * 1000);
    }
    render();
  }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  window.StandbotChat = { open: open, close: close };
})();
