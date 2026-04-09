(function () {
  var mount = document.getElementById("booyahCardWall");
  if (!mount) {
    return;
  }

  var BASE_URL = "https://doodlebun.github.io/wafrcardbooyahtcgpreview/";

  var allCards = [
    ...Array.from({ length: 16 }, function (_, i) { return "ap_" + String(i + 1).padStart(2, "0") + ".png"; }),
    "ap_17.png",
    "ap_18.png",
    ...Array.from({ length: 9 }, function (_, i) { return "be_" + String(i + 1).padStart(2, "0") + ".png"; }),
    "be_10.png",
    ...Array.from({ length: 9 }, function (_, i) { return "co_" + String(i + 1).padStart(2, "0") + ".png"; }),
    "co_10.png",
    ...Array.from({ length: 16 }, function (_, i) { return "do_" + String(i + 1).padStart(2, "0") + ".png"; }),
    "do_17.png",
    "do_18.png",
    ...Array.from({ length: 16 }, function (_, i) { return "do2_" + String(i + 1).padStart(2, "0") + ".png"; }),
    "do2_17.png",
    "do2_18.png",
    ...Array.from({ length: 5 }, function (_, i) { return "fe_" + String(i + 1).padStart(2, "0") + ".png"; }),
    ...Array.from({ length: 9 }, function (_, i) { return "fe2_" + String(i + 1).padStart(2, "0") + ".png"; }),
    "fe2_10.png",
    ...Array.from({ length: 9 }, function (_, i) { return "fe3_" + String(i + 1).padStart(2, "0") + ".png"; }),
    "fe3_10.png"
  ];

  var cardFiles = Array.from(new Set(allCards));
  var resizeTimer = null;

  function shuffle(list) {
    var copy = list.slice();

    for (var i = copy.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }

    return copy;
  }

  function getCardWidth() {
    return Math.max(84, Math.min(window.innerWidth * 0.09, 132));
  }

  function buildRowSource(rows, minCardsPerRow) {
    var shuffled = shuffle(cardFiles);

    shuffled.forEach(function (file, index) {
      rows[index % rows.length].push(file);
    });

    rows.forEach(function (rowCards, rowIndex) {
      if (!rowCards.length) {
        rowCards.push(cardFiles[rowIndex % cardFiles.length]);
      }

      var poolIndex = rowIndex;
      while (rowCards.length < minCardsPerRow) {
        rowCards.push(cardFiles[poolIndex % cardFiles.length]);
        poolIndex += rows.length;
      }
    });
  }

  function createCard(fileName, lazy) {
    var card = document.createElement("div");
    card.className = "card-wall-card";

    var image = document.createElement("img");
    image.src = BASE_URL + fileName;
    image.alt = "";
    image.loading = lazy ? "lazy" : "eager";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";

    card.appendChild(image);
    return card;
  }

  function renderWall() {
    var cardWidth = getCardWidth();
    var rowGap = Math.max(10, Math.round(cardWidth * 0.12));
    var cardHeight = cardWidth * (251 / 178);
    var rowCount = Math.max(5, Math.ceil((window.innerHeight + rowGap) / (cardHeight + rowGap)) + 1);
    var minCardsPerRow = Math.max(12, Math.ceil((window.innerWidth * 2.4) / (cardWidth + rowGap)));
    var rows = Array.from({ length: rowCount }, function () { return []; });

    mount.innerHTML = "";
    mount.style.setProperty("--card-width", cardWidth + "px");
    mount.style.setProperty("--row-gap", rowGap + "px");

    buildRowSource(rows, minCardsPerRow);

    rows.forEach(function (rowCards, rowIndex) {
      var row = document.createElement("div");
      row.className = "card-wall-row" + (rowIndex % 2 ? " reverse" : "");

      var track = document.createElement("div");
      track.className = "card-wall-track";
      track.style.setProperty("--duration", (78 + rowIndex * 7) + "s");
      track.style.setProperty("--row-gap", rowGap + "px");

      var doubledCards = rowCards.concat(rowCards);
      doubledCards.forEach(function (fileName, cardIndex) {
        track.appendChild(createCard(fileName, cardIndex > 7));
      });

      row.appendChild(track);
      mount.appendChild(row);
    });
  }

  renderWall();

  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(renderWall, 180);
  });
}());
