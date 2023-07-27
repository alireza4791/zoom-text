//use this object to change the behavior of the app please do not change the code directly
// unless necessary
window.addEventListener("load", () => {
  let luxyContainer = document.querySelector("#luxy");
  let main = document.querySelector(".smooth-wrapper");
  let container = document.querySelector("#container");
  let brandLogoText = document.querySelector(".brand_logo_inner_text");
  let brandLogoPathArr = document.querySelectorAll(".brand_logo_inner_path");
  let articleInner = document.querySelector("#article_inner");
  let brandLogoHeader = document.querySelector("#brand_logo_text");
  let textParent = document.querySelector("#header-text");
  let headerArrow = document.querySelector(".brand_logo_text_arrow");
  let bodyTag = document.querySelector("body");
  let isTouchPad = false;
  let scrollDown = true;
  let isBottom = false;

  //helper functions
  function li(a, b, n) {
    return (1 - n) * a + n * b;
  }
  const calculateHeightMultiplier = () => {
    console.log(window.innerHeight);
    if (window.innerHeight < 400) {
      return 10;
    } else if (window.innerHeight >= 400 && window.innerHeight < 450) {
      return 9.85;
    }
    if (window.innerHeight < 500 && window.innerHeight >= 450) {
      return 9.4;
    } else if (window.innerHeight < 550 && window.innerHeight >= 500) {
      return 9.0;
    } else if (window.innerHeight >= 550 && window.innerHeight < 600) {
      return 8.6;
    } else if (window.innerHeight >= 600 && window.innerHeight < 650) {
      return 8.55;
    } else if (window.innerHeight >= 650 && window.innerHeight < 750) {
      return 8.35;
    } else if (window.innerHeight >= 750 && window.innerHeight < 800) {
      return 8.25;
    } else if (window.innerHeight >= 800 && window.innerHeight < 880) {
      return 8.4;
    } else if (window.innerHeight >= 880 && window.innerHeight < 980) {
      return 8.007;
    } else if (window.innerHeight >= 980 && window.innerHeight < 1050) {
      return 8.0;
    } else if (window.innerHeight >= 1050 && window.innerHeight < 1100) {
      return 7.99;
    } else if (window.innerHeight >= 1100) {
      return 7.9;
    }
  };
  const calculateHeightMultiplierMobile = () => {
    if (window.innerHeight < 400) {
      return 5.7;
    } else if (window.innerHeight >= 400 && window.innerHeight < 450) {
      return 5.85 - 0.3;
    }
    if (window.innerHeight < 500 && window.innerHeight >= 450) {
      return 5.4 - 0.3;
    } else if (window.innerHeight < 550 && window.innerHeight >= 500) {
      return 5.0 - 0.3;
    } else if (window.innerHeight >= 550 && window.innerHeight < 600) {
      return 4.6 - 0.3;
    } else if (window.innerHeight >= 600 && window.innerHeight < 650) {
      return 4.55 - 0.3;
    } else if (window.innerHeight >= 650 && window.innerHeight < 750) {
      return 3.8 - 0.3;
    } else if (window.innerHeight >= 750 && window.innerHeight < 800) {
      return 4.22 - 0.3;
    } else if (window.innerHeight >= 800 && window.innerHeight < 880) {
      return 4.2 - 0.3;
    } else if (window.innerHeight >= 880 && window.innerHeight < 980) {
      return 4.2 - 0.3;
    } else if (window.innerHeight >= 980 && window.innerHeight < 1050) {
      return 4.1 - 0.3;
    } else if (window.innerHeight >= 1050 && window.innerHeight < 1100) {
      return 3.99 - 0.3;
    } else if (window.innerHeight >= 1100) {
      return 3.9 - 0.3;
    }
  };
  var browserName = navigator.appName;
  var nAgt = navigator.userAgent;
  // In Chrome, the true version is after "Chrome"
  if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
  }
  var OSName = "Unknown OS";
  if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
  if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
  //desktop and mobile params
  const paramsDesktop = {
    scroll: 0,
    mouseSlowDown: 0.083,
    touchpadSlowDown: 0.355,
    scrollSlowDown: isTouchPad ? 0.485 : 0.043,
    scrollSpeed: window.innerHeight / 8,
    touchPadSpeed: 320,
    textSize: {
      width: 45,
      height: 40,
    },
    zoomStart: 0,
    enLargeStart: 0,
    articleVisibilityStart: 20,
    containerTransformLimit: window.innerHeight * calculateHeightMultiplier(),
    textLogoLimit: 8150,
    brandLogoSizeDivider: 600,
    articleInnerDivider: 1000,
    brandLogoPathDivider: 1000,
    arrowDivider: 170,
    topPosition: 0,
    // headerTextLines: ["ipsum, ", "consectetur ad. ", "Unde porro vol"],
  };

  const paramsMobile = {
    scroll: 0,
    scrollSlowDown: 0.043,
    textSize: window.innerWidth < 350 ? 130 : 120,
    zoomStart: 0,
    enLargeStart: 0,
    articleVisibilityStart: 40,
    containerTransformLimit:
      window.innerHeight * calculateHeightMultiplierMobile(),
    textLogoLimit: 8150,
    brandLogoSizeDivider: 30,
    articleInnerDivider: 260,
    brandLogoPathDivider: 175,
    topPosition: 15,
  };

  let containerTransform = 0;
  let containerTop = 0;
  // let paddingleft = 0;
  let brandLogoTextHeight = 0;
  let brandLogoTextWidth = 0;
  let articleInnerTransform = 0;
  let brandLogoPathOpacity = 0;
  let arrowPathOpacity = 0;
  let headerTop = 0;
  let dy = 0;

  //preparing the header text
  // let words;
  let counter = 0;
  // let tag;
  // let characters;
  // let character;
  // paramsDesktop.headerTextLines.map((line) => {
  //   words = line.split(" ");
  //   words.map((word) => {
  //     characters = word.split("");
  //     characters.map((char) => {
  //       tag = document.createElement("span");
  //       character = document.createTextNode(char);
  //       tag.appendChild(character);
  //       counter += 0.1;
  //       tag.style.animationDelay = `${counter}s`;
  //       tag.classList.add("header-char");
  //       textParent.appendChild(tag);
  //     });
  //     tag = document.createElement("span");
  //     character = document.createTextNode(" ");
  //     tag.appendChild(character);
  //     tag.classList.add("header-space");
  //     textParent.appendChild(tag);
  //   });
  //   tag = document.createElement("br");
  //   textParent.appendChild(tag);
  // });
  counter += 0.1;
  headerArrow.style.animationDelay = `${counter}s`;

  //desktop scroll function
  let prevScrollVal = 0;
  const onScrollDesktop = () => {
    scrollDistance = Math.abs(scrollY - prevScrollVal);
    paramsDesktop.scroll = scrollY;

    if (paramsDesktop.scroll <= paramsDesktop.zoomStart) {
      brandLogoHeader.style.opacity = 1;
      brandLogoPathArr.forEach((brandLogoPath) => {
        brandLogoPath.style.opacity = "1";
      });
    }
    //user enters the scroll area
    dy = li(dy, paramsDesktop.scroll, paramsDesktop.scrollSlowDown);
    dy = Math.floor(dy * 100) / 100;
    main.style.transform = `translate3d(-0px, -${dy}px, 0px)`;
    //increase the containers translate while keeping it above zero incase user scrolls down
    containerTransform = li(
      containerTransform,
      paramsDesktop.scroll,
      paramsDesktop.scrollSlowDown
    );
    containerTransform = Math.floor(containerTransform * 100) / 100;
    container.style.transform = `translate(0px, ${containerTransform}px)`;
    //grow the texts size
    if (
      Math.min(
        paramsDesktop.textSize.width +
          brandLogoTextWidth *
            (brandLogoTextWidth / paramsDesktop.brandLogoSizeDivider),
        paramsDesktop.textLogoLimit
      ) <= paramsDesktop.textLogoLimit
    ) {
      brandLogoTextHeight = li(
        brandLogoTextHeight,
        paramsDesktop.scroll,
        paramsDesktop.scrollSlowDown
      );
      brandLogoTextHeight = Math.floor(brandLogoTextHeight * 100) / 100;
      brandLogoTextWidth = li(
        brandLogoTextWidth,
        paramsDesktop.scroll,
        paramsDesktop.scrollSlowDown
      );
      brandLogoTextWidth = Math.floor(brandLogoTextWidth * 100) / 100;
      brandLogoText.style.height = `${Math.min(
        paramsDesktop.textSize.height +
          brandLogoTextHeight *
            (brandLogoTextHeight / paramsDesktop.brandLogoSizeDivider),
        paramsDesktop.textLogoLimit
      )}vw`;
      brandLogoText.style.width = `${Math.min(
        paramsDesktop.textSize.width +
          brandLogoTextWidth *
            (brandLogoTextWidth / paramsDesktop.brandLogoSizeDivider),
        paramsDesktop.textLogoLimit
      )}vw`;
    }
    //make the article bigger
    articleInnerTransform = li(
      articleInnerTransform,
      paramsDesktop.scroll,
      paramsDesktop.scrollSlowDown
    );
    articleInnerTransform = Math.floor(articleInnerTransform * 100) / 100;
    articleInner.style.transform = `translate3d(0px, 0px, 0px) scale(${Math.min(
      articleInnerTransform / paramsDesktop.articleInnerDivider,
      1
    )}, ${Math.min(
      articleInnerTransform / paramsDesktop.articleInnerDivider,
      1
    )})`;
    //move the header text upward
    headerTop = li(
      headerTop,
      paramsDesktop.scroll,
      paramsDesktop.scrollSlowDown
    );
    headerTop = Math.floor(headerTop * 100) / 100;
    brandLogoHeader.style.top = `calc(${
      paramsDesktop.topPosition
    }vh - ${Math.min(headerTop, window.innerHeight)}px)`;
    //show the article behind the text
    if (paramsDesktop.scroll > paramsDesktop.articleVisibilityStart) {
      // make the text see through
      brandLogoPathOpacity = li(
        brandLogoPathOpacity,
        paramsDesktop.scroll,
        paramsDesktop.scrollSlowDown
      );
      brandLogoPathOpacity = Math.floor(brandLogoPathOpacity * 100) / 100;
      brandLogoPathArr.forEach((brandLogoPath) => {
        brandLogoPath.style.opacity = `${Math.max(
          1 -
            (brandLogoPathOpacity - paramsDesktop.articleVisibilityStart) /
              paramsDesktop.brandLogoPathDivider,
          0
        )}`;
      });
      // make the arrow disappear
      arrowPathOpacity = li(
        arrowPathOpacity,
        paramsDesktop.scroll,
        paramsDesktop.scrollSlowDown
      );
      arrowPathOpacity = Math.floor(arrowPathOpacity * 100) / 100;

      brandLogoHeader.style.opacity = `${Math.max(
        1 -
          (arrowPathOpacity - paramsDesktop.articleVisibilityStart) /
            paramsDesktop.arrowDivider,
        0
      )}`;
    }

    if (
      Math.min(
        paramsDesktop.textSize.height +
          brandLogoTextHeight *
            (brandLogoTextHeight / paramsDesktop.brandLogoSizeDivider),
        paramsDesktop.textLogoLimit
      ) >= 548.26 ||
      Math.min(
        paramsDesktop.textSize.width +
          brandLogoTextWidth *
            (brandLogoTextWidth / paramsDesktop.brandLogoSizeDivider),
        paramsDesktop.textLogoLimit
      ) >= 548.26
    ) {
      container.style.zIndex = "-1";
      brandLogoHeader.style.zIndex = "-2";
    } else {
      container.style.zIndex = "5";
      brandLogoHeader.style.zIndex = "4";
    }
  };

  //mobile scroll function
  const onScrollMobile = () => {
    // params.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    paramsMobile.scroll = scrollY;

    //keep the text hidden until scrolled past paramsMobile.zoomStart
    if (paramsMobile.scroll <= paramsMobile.zoomStart) {
      brandLogoPathArr.forEach((brandLogoPath) => {
        brandLogoPath.style.opacity = "1";
      });
    }
    //user enters the scroll area
    dy = li(dy, paramsMobile.scroll, paramsMobile.scrollSlowDown);
    dy = Math.floor(dy * 100) / 100;
    main.style.transform = `translate3d(-0px, -${dy}px, 0px)`;
    //increase the containers translate while keeping it above zero incase user scrolls down
    containerTransform = li(
      containerTransform,
      paramsDesktop.scroll,
      paramsDesktop.scrollSlowDown
    );
    containerTransform = Math.floor(containerTransform * 100) / 100;
    container.style.transform = `translate(0px, ${containerTransform}px)`;
    //push the container down
    containerTop = li(
      containerTop,
      paramsMobile.scroll,
      paramsMobile.scrollSlowDown
    );
    containerTop = Math.floor(containerTop * 100) / 100;
    if (!isBottom) container.style.top = `${containerTop * 2}px`;

    //grow the texts size
    if (
      Math.min(
        paramsMobile.textSize +
          (brandLogoTextHeight - paramsMobile.enLargeStart) *
            (brandLogoTextHeight / paramsMobile.brandLogoSizeDivider),
        paramsMobile.textLogoLimit
      ) <= paramsMobile.textLogoLimit
    ) {
      brandLogoTextHeight = li(
        brandLogoTextHeight,
        paramsMobile.scroll,
        paramsMobile.scrollSlowDown
      );
      brandLogoTextHeight = Math.floor(brandLogoTextHeight * 100) / 100;
      brandLogoText.style.height = `${Math.min(
        paramsMobile.textSize +
          (brandLogoTextHeight - paramsMobile.enLargeStart) *
            (brandLogoTextHeight / paramsMobile.brandLogoSizeDivider),
        paramsMobile.textLogoLimit
      )}vw`;
      brandLogoText.style.width = `${Math.min(
        paramsMobile.textSize +
          (brandLogoTextHeight - paramsMobile.enLargeStart) *
            (brandLogoTextHeight / paramsMobile.brandLogoSizeDivider),
        paramsMobile.textLogoLimit
      )}vw`;
    }
    //make the article bigger
    articleInnerTransform = li(
      articleInnerTransform,
      paramsMobile.scroll,
      paramsMobile.scrollSlowDown
    );
    articleInnerTransform = Math.floor(articleInnerTransform * 100) / 100;
    articleInner.style.transform = `translate3d(0px, 0px, 0px) scale(${Math.min(
      articleInnerTransform / paramsMobile.articleInnerDivider,
      1
    )}, ${Math.min(
      articleInnerTransform / paramsMobile.articleInnerDivider,
      1
    )})`;
    headerTop = li(headerTop, paramsMobile.scroll, paramsMobile.scrollSlowDown);
    headerTop = Math.floor(headerTop * 100) / 100;
    brandLogoHeader.style.top = `calc(${
      paramsMobile.topPosition
    }vh - ${Math.min(headerTop * 5, window.innerHeight)}px)`;
    //show the article behind the text
    if (paramsMobile.scroll > paramsMobile.articleVisibilityStart) {
      //make the text see through
      brandLogoPathOpacity = li(
        brandLogoPathOpacity,
        paramsMobile.scroll,
        paramsMobile.scrollSlowDown
      );
      brandLogoPathOpacity = Math.floor(brandLogoPathOpacity * 100) / 100;
      brandLogoPathArr.forEach((brandLogoPath) => {
        brandLogoPath.style.opacity = `${Math.max(
          1 -
            (brandLogoPathOpacity - paramsMobile.articleVisibilityStart) /
              paramsMobile.brandLogoPathDivider,
          0
        )}`;
      });

      // make the arrow disappear
      arrowPathOpacity = li(
        arrowPathOpacity,
        paramsDesktop.scroll,
        paramsDesktop.scrollSlowDown
      );
      arrowPathOpacity = Math.floor(arrowPathOpacity * 100) / 100;

      brandLogoHeader.style.opacity = `${Math.max(
        1 -
          (arrowPathOpacity - paramsDesktop.articleVisibilityStart) /
            paramsDesktop.arrowDivider,
        0
      )}`;
    }
    if (
      Math.min(
        paramsMobile.textSize +
          (brandLogoTextHeight - paramsMobile.enLargeStart) *
            (brandLogoTextHeight / paramsMobile.brandLogoSizeDivider),
        paramsMobile.textLogoLimit
      ) >= 2448.26 ||
      Math.min(
        paramsMobile.textSize +
          (brandLogoTextHeight - paramsMobile.enLargeStart) *
            (brandLogoTextHeight / paramsMobile.brandLogoSizeDivider),
        paramsMobile.textLogoLimit
      ) >= 2448.26
    ) {
      container.style.zIndex = "-2";
      brandLogoHeader.style.zIndex = "-1";
    } else {
      container.style.zIndex = "5";
      brandLogoHeader.style.zIndex = "10";
    }
  };

  //initial stylings for elements
  main.style.height = `calc(100vh + ${
    window.innerWidth > 700
      ? paramsDesktop.containerTransformLimit
      : paramsMobile.containerTransformLimit
  }px)`;
  main.style.padding = `0px 0px ${
    window.innerWidth > 700
      ? paramsDesktop.containerTransformLimit
      : paramsMobile.containerTransformLimit
  }px`;
  container.style.transform = "translate(0px, 0px)";
  brandLogoText.style.height = `${
    window.innerWidth > 700 ? paramsDesktop.textSize : paramsMobile.textSize
  }vw`;
  brandLogoText.style.width = `${
    window.innerWidth > 700 ? paramsDesktop.textSize : paramsMobile.textSize
  }vw`;
  brandLogoText.style.opacity = "1";
  articleInner.style.transform = `translate3d(0px, 0px, 0px) scale(${
    window.innerWidth > 700 ? "0.01, 0.01" : "0.098, 0.098"
  })`;

  //disable default scrolling and only enable mousewheel with custom speed for desktop
  if (window.innerWidth >= 700) {
    const handle = (deltaY, wheelDeltaY) => {
      scrollDown = deltaY > 0 ? true : false;
      if (paramsDesktop.scroll < window.innerHeight * 1.78 && scrollDown) {
        window.scrollTo(0, window.innerHeight * 1.78 + 10);
        if (limiter && paramsDesktop.scroll === window.innerHeight * 1.78 + 10)
          limiter = false;
      } else if (
        paramsDesktop.scroll <= window.innerHeight * 1.78 + 10 &&
        !scrollDown
      ) {
        window.scrollTo(0, 0);
      } else {
        let scrollSpeed = Math.max(
          paramsDesktop.scrollSpeed * Math.abs(wheelDeltaY / 28),
          250
        );

        window.scrollTo(
          0,
          paramsDesktop.scroll + (scrollDown ? +scrollSpeed : -scrollSpeed)
        );
      }
    };
    let limiter = false;
    document.addEventListener(
      "wheel",
      function (e) {
        if (browserName === "Firefox") {
          if (Math.abs(e.deltaY) >= 100) {
            e.preventDefault();
            prevScrollVal = scrollY;
            paramsDesktop.scrollSlowDown = isTouchPad
              ? paramsDesktop.touchpadSlowDown
              : paramsDesktop.mouseSlowDown;
            isTouchPad = false;
            handle(e.deltaY, e.wheelDeltaY);
          }
        } else {
          if (Math.abs(e.deltaY) % 10 == 0 && Math.abs(e.deltaY) >= 100) {
            e.preventDefault();
            prevScrollVal = scrollY;
            isTouchPad = false;
            paramsDesktop.scrollSlowDown = isTouchPad
              ? paramsDesktop.touchpadSlowDown
              : paramsDesktop.mouseSlowDown;
            handle(e.deltaY, e.wheelDeltaY);
          }
        }
      },
      { passive: false }
    );
  } else {
    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        isBottom = true;
      } else {
        isBottom = false;
      }
    };
  }

  document.body.style.height = main.clientHeight + "px";
  window.requestAnimationFrame(render);

  function render() {
    if (window.innerWidth > 700) {
      onScrollDesktop();
    } else {
      onScrollMobile();
    }
    window.requestAnimationFrame(render);
  }
});
