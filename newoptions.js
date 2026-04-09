(function () {

  var CARDS = [
    {
      image: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_ab.jpg.png",
      label: "About",
      url: "https://booyahtcg.com/#about"
    },
    {
      image: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_r.png",
      label: "Rules",
      url: "https://booyahtcg.com/#rules"
    },
    {
      image: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_a.png",
      label: "Artists",
      url: "https://booyahtcg.com/#artists"
    },
    {
      image: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_c.png",
      label: "Cards",
      url: "https://booyahtcg.com/#cardlist"
    },
    {
      image: "https://raw.githubusercontent.com/DoodleBun/booyahstuff/main/b_s.png",
      label: "Social",
      url: "https://booyahtcg.com/#social"
    }
  ];

  var stageMenu = document.getElementById("stageMenu");
  if (!stageMenu) { return; }

  CARDS.forEach(function (card) {
    var a = document.createElement("a");
    a.href = card.url;
    a.target = "_top";
    a.setAttribute("aria-label", card.label);
    a.className = "stage-link";

    var img = document.createElement("img");
    img.src = card.image;
    img.alt = card.label;

    a.appendChild(img);
    stageMenu.appendChild(a);
  });

}());
