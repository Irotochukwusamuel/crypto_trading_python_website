!(function (t) {
  "use strict";
  var a,
    o,
    i = 991,
    n = 991,
    r = 0,
    s = 0,
    l = 0,
    d = [],
    c = [],
    p = "",
    h = !1;
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) && (h = !0),
  /iPhone|iPad|iPod/i.test(navigator.userAgent) && !0,
  t(
    ".image-back-offset-shadow, .vertical-counter, .counter, .progress-bar, .pie-chart-style-01, .pie-chart-style-02"
  ).each(function () {
    t(this).appear().trigger("resize");
  }),
  t("nav.navbar li.dropdown.megamenu").on(
    "touchstart mouseenter click",
    function (e) {
      var a = z();
      if (a > i) {
        var o = t(this).children(".dropdown-menu");
        o.css({ left: "" }), parseInt(o.css("padding-left"));
        var n = t(this).position().left,
          r = t(this).outerWidth(),
          s = t(".navbar-collapse").offset().left,
          l = o.outerWidth(),
          d = n + r / 2 - l / 2,
          c = a - s;
        d + s < 0 ? (d = 30 - s) : d + l > c && (d = c - l - 30),
          o.css({ left: d + "px" });
      } else t(this).children(".dropdown-menu").css({ right: "", left: "" });
    }
  ),
  t(".counter").each(function (e) {
    var a = t(this);
    (e = t.extend({}, e || {}, a.data("countToOptions") || {})), a.countTo(e);
  }),
  R(),
  $(),
  M(),
  H(2e3),
  D(),
  U(),
  N(),
  A(),
  t(".fit-videos").fitVids(),
  t("[data-scroll-options]").each(function () {
    var e = t(this),
      a = e.attr("data-scroll-options") || '{ "theme": "dark" }';
    null != a && ((a = t.parseJSON(a)), e.mCustomScrollbar(a));
  }),
  t(document).on("click", ".html-video-play", function () {
    var e = t(this).parents("section").find(".video-bg");
    !1 === t(this).is("[playing]")
      ? (e.trigger("play"), t(this).attr("playing", "true"))
      : (e.trigger("pause"), t(this).removeAttr("playing"));
  }),
  t(".price-filter").length > 0 &&
    (t(".price-filter").slider({
      range: !0,
      animate: !0,
      min: 0,
      max: 4e3,
      step: 1,
      values: [1, 3999],
      slide: function (e, a) {
        t(".price-amount").val("$" + a.values[0] + " - $" + a.values[1]),
          t(document.body).trigger("price_slider_change", [
            a.values[0],
            a.values[1],
          ]);
      },
    }),
    t(".price-amount").val(
      "$" +
        t(".price-filter").slider("values", 0) +
        " - $" +
        t(".price-filter").slider("values", 1)
    )),
  t(".image-back-offset-shadow").length > 0 &&
    t(document).on("appear", ".image-back-offset-shadow", function (e) {
      t(".image-back-offset-shadow").addClass("active");
    }),
  t(".vertical-counter").each(function () {
    for (
      var e = t(this),
        a = e.attr("data-to"),
        o = a.toString().split(""),
        i = a.length,
        n = 0;
      n < i;
      n++
    )
      e.append(
        '<span class="vertical-counter-number"><ul><li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li></ul></span>'
      );
    e.find(".vertical-counter-number").each(function (e) {
      t(this).attr("data-to", o[e]);
    });
  }),
  t(".vertical-counter").length > 0 &&
    t(document).on("appear", ".vertical-counter", function (e) {
      t(window).scrollTop() + B() >= t(".vertical-counter").offset().top &&
        t(this)
          .find(".vertical-counter-number")
          .each(function () {
            var e = t(this),
              a = e.attr("data-to"),
              o = e.find("li").height();
            e.height(o),
              a <= 9 &&
                e.find("ul").css({ transform: "translateY(-" + 10 * a + "%)" });
          });
    }),
  t(".counter").length > 0 &&
    t(document).on("appear", ".counter", function (e) {
      var a = t(this);
      if (!a.hasClass("appear")) {
        var o = a.data("countToOptions") || {};
        a.countTo(o), a.addClass("appear");
      }
    }),
  t(".progress-bar").length > 0 &&
    t(document).on("appear", ".progress-bar", function (e) {
      if (!t(this).hasClass("appear")) {
        t(this).addClass("appear");
        var a = t(this).attr("aria-valuenow");
        t(this).animate(
          { width: a + "%" },
          {
            duration: 300,
            easing: "swing",
            progress: function (e, o, i) {
              var n = parseInt(a * o);
              t(this)
                .find("span")
                .html(n + "%");
            },
          }
        );
      }
    }),
  t(".pie-chart-style-01").length > 0) &&
    t(document.body).on("appear", ".pie-chart-style-01", function (e) {
      t(".pie-chart-style-01").easyPieChart({
        trackColor: "#232323",
        scaleColor: "",
        lineCap: "round",
        lineWidth: 10,
        size: 180,
        barColor: function () {
          (a =
            t(this.el).attr("data-start-color") ||
            t(this.el).attr("data-bar-color") ||
            "#000"),
            (o =
              t(this.el).attr("data-end-color") ||
              t(this.el).attr("data-bar-color") ||
              "#000");
          var e = this.renderer.getCtx(),
            i = this.renderer.getCanvas(),
            n = e.createLinearGradient(0, 0, i.width, 270);
          return n.addColorStop(0.2, a), n.addColorStop(0, o), n;
        },
        animate: { duration: 2e3, enabled: !0 },
        onStep: function (e, a, o) {
          t(this.el)
            .find(".percent")
            .text(Math.round(o) + "%");
        },
      });
    });
  t(".pie-chart-style-02").length > 0 &&
    t(document.body).on("appear", ".pie-chart-style-02", function (e) {
      t(".pie-chart-style-02").easyPieChart({
        trackColor: "#232323",
        scaleColor: "",
        lineCap: "round",
        lineWidth: 10,
        size: 140,
        barColor: function () {
          (a =
            t(this.el).attr("data-start-color") ||
            t(this.el).attr("data-bar-color") ||
            "#000"),
            (o =
              t(this.el).attr("data-end-color") ||
              t(this.el).attr("data-bar-color") ||
              "#000");
          var e = this.renderer.getCtx(),
            i = this.renderer.getCanvas(),
            n = e.createLinearGradient(0, 0, i.width, 270);
          return n.addColorStop(0.2, a), n.addColorStop(0, o), n;
        },
        animate: { duration: 2e3, enabled: !0 },
        onStep: function (e, a, o) {
          t(this.el)
            .find(".percent")
            .text(Math.round(o) + "%");
        },
      });
    });
  if (
    (t(document).on("click", ".qty-plus", function (e) {
      e.preventDefault();
      var a = t(this).attr("data-field"),
        o = parseInt(
          t(this)
            .closest(".quantity")
            .find("input[name=" + a + "]")
            .val()
        );
      isNaN(o)
        ? t(this)
            .closest(".quantity")
            .find("input[name=" + a + "]")
            .val(0)
        : t(this)
            .closest(".quantity")
            .find("input[name= " + a + "]")
            .val(o + 1),
        t(this).closest(".quantity").find(".input-text").trigger("change");
    }),
    t(document).on("click", ".qty-minus", function (e) {
      e.preventDefault();
      var a = t(this).attr("data-field"),
        o = parseInt(
          t(this)
            .closest(".quantity")
            .find("input[name= " + a + "]")
            .val()
        );
      !isNaN(o) && o > 0
        ? t(this)
            .closest(".quantity")
            .find("input[name=" + a + "]")
            .val(o - 1)
        : t(this)
            .closest(".quantity")
            .find("input[name=" + a + "]")
            .val(0),
        t(this).closest(".quantity").find(".input-text").trigger("change");
    }),
    t('[data-toggle="tooltip"]').length > 0 &&
      t('[data-toggle="tooltip"]').tooltip(),
    t(".tilt-box").length > 0 &&
      !h &&
      t(".tilt-box").each(function () {
        var e = t(this),
          a =
            e.attr("data-tilt-options") ||
            '{ "maxTilt": 20, "perspective": 1000, "easing": "cubic-bezier(.03,.98,.52,.99)", "scale": 1, "speed": 500, "transition": true, "reset": true, "glare": false, "maxGlare": 1 }';
        null != a && ((a = t.parseJSON(a)), e.tilt(a));
      }),
    t(".justified-gallery").length > 0 &&
      t(".justified-gallery").each(function () {
        var e = t(this),
          a =
            e.attr("data-justified-options") ||
            '{ "rowHeight": 500, "maxRowHeight": false, "captions": true, "margins": 15, "waitThumbnailsLoad": true }';
        null != a &&
          e.imagesLoaded(function () {
            (a = t.parseJSON(a)), e.justifiedGallery(a);
          });
      }),
    h ||
      (t(document).on("mousemove", ".jg-entry", function (e) {
        var a = t(this).width(),
          o = t(this).find(".jg-caption").width(),
          i = t(this).find(".caption").html(),
          n = t(this).offset(),
          r = e.pageX - n.left + 20,
          s = e.pageY - n.top;
        r + o + 30 > a && (r = r - o - 65),
          t(this).css("overflow", "visible"),
          t(this)
            .find(".jg-caption")
            .html(i)
            .show()
            .css({
              left: r + "px",
              right: "auto",
              top: s + "px",
              bottom: "auto",
            });
      }),
      t(document).on("mouseleave", ".jg-entry", function (e) {
        t(this).css("overflow", " "),
          t(this)
            .find(".jg-caption")
            .hide()
            .css({ left: " ", right: " ", top: " ", bottom: " " });
      })),
    t(".accordion-event").each(function () {
      var e = t(this),
        a = e.attr("data-active-icon") || "",
        o = e.attr("data-inactive-icon") || "";
      t(".collapse", this)
        .on("show.bs.collapse", function () {
          var e = t(this).attr("id");
          t('a[href="#' + e + '"]')
            .closest(".panel-heading")
            .addClass("active-accordion"),
            t('a[href="#' + e + '"] .panel-title i')
              .addClass(a)
              .removeClass(o);
        })
        .on("hide.bs.collapse", function () {
          var e = t(this).attr("id");
          t('a[href="#' + e + '"]')
            .closest(".panel-heading")
            .removeClass("active-accordion"),
            t('a[href="#' + e + '"] .panel-title i')
              .addClass(o)
              .removeClass(a);
        });
    }),
    t(".checkout-accordion label input").on("click", function (e) {
      t(this).parent().find("a").trigger("click");
    }),
    t('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      t(".tab-content .accordion-event").each(function () {
        t(".collapse", this).collapse("hide");
      }),
        q(d, !0);
    }),
    t(".countdown").each(function () {
      var e = t(this);
      e.countdown(e.attr("data-enddate")).on("update.countdown", function (t) {
        e.html(
          t.strftime(
            '<div class="countdown-container"><div class="countdown-box first"><div class="number">%-D</div><span>Day%!d</span></div><div class="countdown-box"><div class="number">%H</div><span>Hours</span></div><div class="countdown-box"><div class="number">%M</div><span>Minutes</span></div><div class="countdown-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
          )
        );
      });
    }),
    t(".wow").length > 0 &&
      ((p = new WOW({
        boxClass: "wow",
        animateClass: "animate__animated",
        offset: 30,
        mobile: !1,
        live: !0,
      })),
      t(document).imagesLoaded(function () {
        p.init();
      })),
    t(".portfolio-wrapper").each(function () {
      var e = t(this);
      !e.find(".wow").length > 0 &&
        e.find(".grid-item").css("visibility", "hidden"),
        e.imagesLoaded(function () {
          !e.find(".wow").length > 0
            ? e.find(".grid-item").css("visibility", "")
            : h || e.find(".grid-item").css("visibility", "hidden"),
            e.removeClass("grid-loading"),
            e.isotope({
              layoutMode: "masonry",
              itemSelector: ".grid-item",
              percentPosition: !0,
              stagger: 0,
              masonry: { columnWidth: ".grid-sizer" },
            }),
            d.push(e);
        });
    }),
    t(document).on("click", ".portfolio-filter > li > a", function () {
      var e = t(this),
        a = e.parents("section");
      a.find(".portfolio-filter > li").removeClass("active"),
        e.parent().addClass("active");
      var o = e.attr("data-filter"),
        i = a.find(".portfolio-wrapper");
      return L(i), i.isotope({ filter: o }), !1;
    }),
    t(".blog-wrapper").each(function () {
      var e = t(this);
      !e.find(".wow").length > 0 &&
        e.find(".grid-item").css("visibility", "hidden"),
        e.imagesLoaded(function () {
          !e.find(".wow").length > 0
            ? e.find(".grid-item").css("visibility", "")
            : h || e.find(".grid-item").css("visibility", "hidden"),
            e.removeClass("grid-loading"),
            e.isotope({
              layoutMode: "masonry",
              itemSelector: ".grid-item",
              percentPosition: !0,
              stagger: 0,
              masonry: { columnWidth: ".grid-sizer" },
            }),
            d.push(e);
        });
    }),
    t(document).on("click", ".blog-filter > li > a", function () {
      var e = t(this),
        a = e.parents("section");
      a.find(".blog-filter > li").removeClass("active"),
        e.parent().addClass("active");
      var o = e.attr("data-filter"),
        i = a.find(".blog-wrapper");
      return L(i), i.isotope({ filter: o }), !1;
    }),
    t(".shop-wrapper").each(function () {
      var e = t(this);
      !e.find(".wow").length > 0 &&
        e.find(".grid-item").css("visibility", "hidden"),
        e.imagesLoaded(function () {
          !e.find(".wow").length > 0
            ? e.find(".grid-item").css("visibility", "")
            : h || e.find(".grid-item").css("visibility", "hidden"),
            e.removeClass("grid-loading"),
            e.isotope({
              layoutMode: "masonry",
              itemSelector: ".grid-item",
              percentPosition: !0,
              stagger: 0,
              masonry: { columnWidth: ".grid-sizer" },
            }),
            d.push(e);
        });
    }),
    t(document).on("click", ".shop-filter > li > a", function () {
      var e = t(this),
        a = e.parents("section");
      a.find(".shop-filter > li").removeClass("active"),
        e.parent().addClass("active");
      var o = e.attr("data-filter"),
        i = a.find(".shop-wrapper");
      return L(i), i.isotope({ filter: o }), !1;
    }),
    t(".instafeed-wrapper").each(function () {
      var e =
          "IGQVJYU0pFamdzemRhR2NjeHBKeHM1d0FhS3NzeUlVd0t5YVVrOU9SVjQ0Mk15dWZATaEJHQkctSWs0d1JXbkpFY0V4MVc1QjBDM1dxR0htbGJ5WTFSRFQ2Y1ZA2a3JNVWxzVlhaYWxEaUJHSExUQVEzSwZDZD",
        a = t(this),
        o = ((e = a.attr("data-token") || e), a.attr("data-total") || "6"),
        i = a.attr("data-slider-options"),
        n = a.html(),
        r = "";
      null != i && a.html(""),
        t.ajax({
          url:
            "https://graph.instagram.com/me/media?fields=id,media_type,media_url,timestamp,permalink,comments_count,like_count&access_token=" +
            e,
          type: "GET",
          success: function (e) {
            for (var s in ((r +=
              a.find(".grid-item").length > 0
                ? '<li class="grid-sizer"></li>'
                : ""),
            e.data))
              if (s < parseInt(o) && "IMAGE" == e.data[s].media_type) {
                var l = e.data[s].permalink || "",
                  c = e.data[s].media_url || "",
                  p = e.data[s].like_count || "",
                  u = e.data[s].comments_count || "",
                  m = n;
                (m = (m = (m = (m = (m = (m = (m = (m = m.replace(
                  ' href="#"',
                  ""
                )).replace(' src="#"', "")).replace(
                  "data-href",
                  "href"
                )).replace("data-src", "src")).replace("{{link}}", l)).replace(
                  "{{image}}",
                  c
                )).replace("{{likes}}", p)).replace("{{comments}}", u)),
                  (r += m);
              }
            if ((a.html(r), null != i)) {
              var g = t.parseJSON(i),
                f = a.parent(".swiper-container");
              new Swiper(f, g);
            } else
              !a.find(".wow").length > 0 &&
                a.find(".grid-item").css("visibility", "hidden"),
                a.imagesLoaded(function () {
                  !a.find(".wow").length > 0
                    ? a.find(".grid-item").css("visibility", "")
                    : h || a.find(".grid-item").css("visibility", "hidden"),
                    a.removeClass("grid-loading"),
                    a.isotope({
                      layoutMode: "masonry",
                      itemSelector: ".grid-item",
                      percentPosition: !0,
                      stagger: 0,
                      masonry: { columnWidth: ".grid-sizer" },
                    }),
                    d.push(a);
                });
          },
          error: function (e) {
            a.append(
              '<div class="col-12"><span class=text-center>No Images Found</span></div>'
            );
          },
        });
    }),
    t(".fullscreen-hover-list .hover-list-item").length > 0)
  ) {
    var u = h ? "click" : "mouseover";
    t(document).on(
      u,
      ".fullscreen-hover-list .hover-list-item a",
      function (e) {
        if (!t(this).parent().hasClass("active"))
          return (
            t(".fullscreen-hover-list .hover-list-item").removeClass("active"),
            t(this).parent().addClass("active"),
            !1
          );
      }
    );
  }
  if (t(".portfolio-colorful").length > 0)
    for (
      var m = t(".portfolio-colorful").find(".grid-item").length,
        g = t(".portfolio-colorful").attr("data-backgroundcolor") || "#2e94eb",
        f = t(".portfolio-colorful").attr("data-opacity") || 1,
        v = (x = g.split(",")).length,
        b = 0;
      b < m;
      b++
    ) {
      var w = x[b],
        y =
          "rgba(" +
          parseInt(w.slice(-6, -4), 16) +
          "," +
          parseInt(w.slice(-4, -2), 16) +
          "," +
          parseInt(w.slice(-2), 16) +
          "," +
          f +
          ")";
      t(".portfolio-colorful")
        .find(".portfolio-hover:eq(" + b + ")")
        .css("background-color", y),
        v < m && x.push(x[b]);
    }
  if (t(".page-title-colorful").length > 0) {
    var C,
      x = (g =
        t(".page-title-colorful").attr("data-backgroundcolor") ||
        "#2e94eb").split(","),
      k = ((v = (x = g.split(",")).length), 1);
    t(".page-title-colorful").css({ "background-color": x[0] }),
      setInterval(function () {
        (C = x[k]),
          t(".page-title-colorful").css({ "background-color": C }),
          ++k === v && (k = 0);
      }, 5e3);
  }
  t(document).on("click", ".search-form-icon", function (e) {
    e.preventDefault(),
      t(this).parents(".top-bar").length > 0 &&
        t("body").addClass("show-search-popup-mini-header"),
      t(".search-form-wrapper").addClass("active-form"),
      t("body").addClass("show-search-popup");
  }),
    t(document).on("click", ".search-close", function (e) {
      e.preventDefault(),
        t(".search-form-wrapper").removeClass("active-form"),
        t(this).parents(".top-bar").length > 0 &&
          t("body").removeClass("show-search-popup-mini-header"),
        t("body").removeClass("show-search-popup");
    }),
    t(document).on("click", ".search-button", function () {
      var e = !0,
        a = t(this).parents("form");
      return (
        a.find("input[type=text]").each(function (o) {
          var i = t(this).val();
          null === i || "" === i
            ? (a.find("input:eq(" + o + ")").addClass("search-error"), (e = !1))
            : a.find("input:eq(" + o + ")").removeClass("search-error");
        }),
        e
      );
    }),
    t(document).on("click", ".header-push-button .push-button", function () {
      t("body").toggleClass("show-menu"),
        t("body").toggleClass("hamburger-show-menu");
    }),
    t(document).on("click", ".close-menu", function () {
      O ||
        ((O = !0),
        setTimeout(function () {
          O = !1;
        }, 500),
        t("body")
          .removeClass("show-menu")
          .removeClass("left-classic-mobile-menu"),
        t(".sub-menu-item").collapse("hide"),
        t(".menu-list-item.open").removeClass("show"));
    }),
    t(document).on("touchstart click", ".show-menu", function (e) {
      t(e.target).hasClass("push-button") ||
        t(e.target).closest(".push-button").length ||
        t(e.target).closest(".push-menu").length ||
        t(e.target).closest(".hamburger-menu").length ||
        t(".close-menu").trigger("click");
    }),
    t(document).on("click", ".side-menu-button", function () {
      t("body").toggleClass("show-menu"),
        t(".left-sidebar-wrapper").length > 0 &&
          z() <= i &&
          t("body").toggleClass("left-classic-mobile-menu"),
        t(".sub-menu-item").collapse("hide"),
        t(".menu-list-item.open").removeClass("show");
    }),
    t(document).on("keydown", function (e) {
      27 === e.keyCode &&
        (t(".close-menu").trigger("click"), t(window).trigger("closemenu"));
    }),
    t(document).on("click", ".scroll-top-arrow", function () {
      return t("html, body").animate({ scrollTop: 0 }, 800), !1;
    });
  if (
    (t("a.scrollto").bind("click.smoothscroll", function (e) {
      e.preventDefault();
      var a = this.hash;
      0 !== t(a).length &&
        t("html, body")
          .stop()
          .animate(
            { scrollTop: t(a).offset().top },
            1200,
            "easeInOutExpo",
            function () {
              window.location.hash = a;
            }
          );
    }),
    t(".navbar-reverse-scroll").length > 0
      ? t(".inner-link").smoothScroll({ speed: 900, offset: 0 })
      : t(".inner-link").smoothScroll({ speed: 900, offset: -59 }),
    t(".section-link").smoothScroll({ speed: 900, offset: 1 }),
    t("#subscribe-popup").length > 0)
  ) {
    "shown" !=
      (function (e) {
        for (
          var t = e + "=",
            a = decodeURIComponent(document.cookie).split(";"),
            o = 0;
          o < a.length;
          o++
        ) {
          for (var i = a[o]; " " == i.charAt(0); ) i = i.substring(1);
          if (0 == i.indexOf(t)) return i.substring(t.length, i.length);
        }
        return "";
      })("litho-promo-popup") &&
      setTimeout(function () {
        t.magnificPopup.open({
          showCloseBtn: !1,
          items: { src: "#subscribe-popup" },
          type: "inline",
          mainClass: "my-mfp-zoom-in",
          callbacks: {
            close: function () {
              t("#newsletter-off").is(":checked") &&
                V("litho-promo-popup", "shown", 30);
            },
          },
        });
      }, 1e3);
  }
  t(".notify-form-button").magnificPopup({
    mainClass: "mfp-notify",
    closeOnBgClick: !0,
    preloader: !1,
    fixedContentPos: !1,
    removalDelay: 100,
    closeBtnInside: !1,
    callbacks: {
      open: function () {
        setTimeout(function () {
          t(".notify-input").focus();
        }, 100),
          t("#notify_form").parent().addClass("notify-popup"),
          t("#notify_form").parents("body").addClass("show-notify-popup");
      },
      close: function () {
        t("body").removeClass("show-notify-popup");
      },
    },
  }),
    t(".lightbox-gallery").magnificPopup({
      delegate: "a",
      type: "image",
      tLoading: "Loading image #%curr%...",
      mainClass: "mfp-fade",
      fixedContentPos: !0,
      closeBtnInside: !1,
      gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] },
    });
  var P = {};
  t(".lightbox-group-gallery-item").each(function () {
    var e = t(this).attr("data-group");
    P[e] || (P[e] = []), P[e].push(this);
  }),
    t.each(P, function () {
      t(this).magnificPopup({
        type: "image",
        closeOnContentClick: !0,
        closeBtnInside: !1,
        fixedContentPos: !0,
        gallery: { enabled: !0 },
      });
    }),
    t(".lightbox-portfolio").magnificPopup({
      delegate: ".gallery-link",
      type: "image",
      tLoading: "Loading image #%curr%...",
      mainClass: "mfp-fade",
      fixedContentPos: !0,
      closeBtnInside: !1,
      closeOnContentClick: !0,
      gallery: { enabled: !0, navigateByImgClick: !1, preload: [0, 1] },
    }),
    t(".single-image-lightbox").magnificPopup({
      type: "image",
      closeOnContentClick: !0,
      fixedContentPos: !0,
      closeBtnInside: !1,
      mainClass: "mfp-no-margins mfp-with-zoom",
      image: { verticalFit: !0 },
      zoom: { enabled: !0, duration: 300 },
    }),
    t(".zoom-gallery").magnificPopup({
      delegate: "a",
      type: "image",
      mainClass: "mfp-with-zoom mfp-img-mobile",
      fixedContentPos: !0,
      closeBtnInside: !1,
      image: {
        verticalFit: !0,
        titleSrc: function (e) {
          return e.el.attr("title");
        },
      },
      gallery: { enabled: !0 },
      zoom: {
        enabled: !0,
        duration: 300,
        opener: function (e) {
          return e.find("img");
        },
      },
    }),
    t(".modal-popup").magnificPopup({
      type: "inline",
      preloader: !1,
      blackbg: !0,
    }),
    t(document).on("click", ".popup-modal-dismiss", function (e) {
      e.preventDefault(), t.magnificPopup.close();
    }),
    t(".popup-with-zoom-anim").magnificPopup({
      type: "inline",
      fixedContentPos: !1,
      fixedBgPos: !0,
      overflowY: "auto",
      closeBtnInside: !0,
      preloader: !1,
      midClick: !0,
      removalDelay: 300,
      blackbg: !0,
      mainClass: "my-mfp-zoom-in",
    }),
    t(".popup-with-move-anim").magnificPopup({
      type: "inline",
      fixedContentPos: !1,
      fixedBgPos: !0,
      overflowY: "auto",
      closeBtnInside: !0,
      preloader: !1,
      midClick: !0,
      removalDelay: 300,
      blackbg: !0,
      mainClass: "my-mfp-slide-bottom",
    }),
    t(".popup-with-form").magnificPopup({
      type: "inline",
      preloader: !1,
      closeBtnInside: !1,
      fixedContentPos: !0,
      focus: "#name",
      callbacks: {
        beforeOpen: function () {
          z() < 700 ? (this.st.focus = !1) : (this.st.focus = "#name");
        },
      },
    }),
    t(".popup-youtube, .popup-vimeo, .popup-googlemap").magnificPopup({
      disableOn: 767,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: !1,
      fixedContentPos: !0,
      closeBtnInside: !1,
    }),
    t(".ajax-popup").magnificPopup({
      type: "ajax",
      alignTop: !0,
      fixedContentPos: !0,
      closeBtnInside: !1,
      overflowY: "scroll",
      callbacks: {
        open: function () {
          t(".navbar .collapse").removeClass("show"),
            t(".navbar a.dropdown-toggle").addClass("collapsed");
        },
      },
    }),
    t(document).on("click", ".submit", function () {
      var e = !1,
        a = t(this),
        o = a.parents("form"),
        i = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        n = /[0-9 -()+]+$/,
        r = o.attr("action"),
        s = o.find(".form-results"),
        l = o.find('[name="redirect"]').val();
      o.find(".required").removeClass("error"),
        o.find(".required").each(function () {
          var a = t(this),
            o = a.val();
          "" == o || null == o
            ? ((e = !0), a.addClass("error"))
            : (("email" != a.attr("type") || i.test(o)) &&
                ("tel" != a.attr("type") || n.test(o))) ||
              ((e = !0), a.addClass("error"));
        });
      var d = o.find(".terms-condition");
      (d.length > 0 && (d.is(":checked") || ((e = !0), d.addClass("error"))),
      o.find(".g-recaptcha").length > 0) &&
        (grecaptcha.getResponse().length ||
          ((e = !0), o.find(".g-recaptcha").addClass("error")));
      return (
        e ||
          "" == r ||
          null == r ||
          (a.addClass("loading"),
          t.ajax({
            type: "POST",
            url: r,
            data: o.serialize(),
            success: function (e) {
              a.removeClass("loading"),
                "" != l && null != l
                  ? (window.location.href = l)
                  : (null != e && (e = t.parseJSON(e)),
                    o
                      .find(
                        "input[type=text],input[type=email],input[type=tel],input[type=password],textarea"
                      )
                      .each(function () {
                        t(this).val(""), t(this).removeClass("error");
                      }),
                    o.find(".g-recaptcha").removeClass("error"),
                    o
                      .find("input[type=checkbox],input[type=radio]")
                      .prop("checked", !1),
                    o.find(".g-recaptcha").length > 0 && grecaptcha.reset(),
                    s
                      .removeClass("alert-success")
                      .removeClass("alert-danger")
                      .hide(),
                    s.addClass(e.alert).html(e.message),
                    s
                      .removeClass("d-none")
                      .fadeIn("slow")
                      .delay(4e3)
                      .fadeOut("slow"));
            },
          })),
        !1
      );
    }),
    t(document).on("blur", ".required", function () {
      var e = t(this).val();
      "" == e || null == e
        ? t(this).addClass("error")
        : ("email" != t(this).attr("type") ||
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e)) &&
          ("tel" != t(this).attr("type") || /[0-9 -()+]+$/.test(e))
        ? t(this).removeClass("error")
        : t(this).addClass("error");
    }),
    t(document).on("click", ".terms-condition", function () {
      var e = t(this);
      e.is(":checked") ? e.removeClass("error") : e.addClass("error");
    });
  var S = window.location.href.substr(
      window.location.href.lastIndexOf("/") + 1
    ),
    I = window.location.hash.substring(1);
  I ? ((I = "#" + I), (S = S.replace(I, ""))) : (S = S.replace("#", "")),
    t(".navbar-nav li a, .menu-list a").each(function () {
      var e = t(this),
        a = e.attr("href");
      (a !== S && a !== S + ".html") ||
        (e.addClass("active"),
        e.parent().addClass("active"),
        e.parents("li.dropdown").addClass("active"),
        e.parents("li.menu-list-item").addClass("active"));
    });
  var _ = t("body").attr("data-mobile-nav-style");
  if (
    ("modern" == _ || "full-screen-menu" == _) &&
    !t(".navbar-" + _ + "-inner").length
  ) {
    !t(".box-layout").length > 0 && "modern" == _
      ? t("section, footer").wrapAll('<div class="page-layout"></div>')
      : t("section").wrapAll('<div class="page-layout"></div>');
    t(".navbar .navbar-toggler")
      .clone(!0)
      .addClass("navbar-toggler-clone")
      .insertAfter(".page-layout"),
      t(".navbar .navbar-collapse")
        .clone(!0)
        .addClass("navbar-collapse-clone")
        .attr("id", "navbarNav-clone")
        .insertAfter(".page-layout");
    if (
      (t(".navbar-toggler-clone, .navbar-collapse-clone").wrapAll(
        '<div class="navbar-' + _ + '-inner"></div>'
      ),
      t(".navbar-toggler")
        .attr("data-target", "#navbarNav-clone")
        .attr("aria-controls", "#navbarNav-clone"),
      t(".navbar-" + _ + "-inner")
        .find(".dropdown-toggle")
        .addClass("dropdown-toggle-clone"),
      t(".navbar-collapse-clone").length > 0)
    ) {
      var T =
        t(".navbar-collapse-clone").attr("data-scroll-options") ||
        '{ "theme": "light" }';
      null != T &&
        ((T = t.parseJSON(T)), t(".navbar-collapse-clone").mCustomScrollbar(T));
    }
    "modern" == _ &&
      t('<div class="navbar-show-modern-bg"></div>').insertAfter(
        ".page-layout"
      );
  }
  t(document).on("touchstart click", "body", function (e) {
    t(e.target).closest(".navbar-nav").length
      ? t(e.target).parents(".show-menu").length
        ? t(".close-menu").trigger("click")
        : t(e.target).parents("body").find(".header-language.open").length
        ? (t(".header-language").trigger("mouseleave"),
          t(".header-language").removeClass("show"),
          t(".header-language").children(".dropdown-menu").removeClass("show"))
        : t(e.target).parents("body").find(".header-cart-icon.open").length &&
          (t(".header-cart-icon").trigger("mouseleave"),
          t(".header-cart-icon").removeClass("show"),
          t(".header-cart-icon").children(".dropdown-menu").removeClass("show"))
      : (t(e.target).closest(".header-language").length ||
          (t(".header-language").trigger("mouseleave"),
          t(".header-language").removeClass("show"),
          t(".header-language").children(".dropdown-menu").removeClass("show")),
        t(e.target).closest(".header-cart-icon").length ||
          (t(".header-cart-icon").trigger("mouseleave"),
          t(".header-cart-icon").removeClass("show"),
          t(".header-cart-icon")
            .children(".dropdown-menu")
            .removeClass("show")),
        t(".navbar-nav .dropdown").each(function () {
          var e = t(this);
          e.trigger("mouseleave"),
            e.removeClass("show"),
            e.children(".dropdown-menu").removeClass("show");
        }),
        t('[data-mobile-nav-style="classic"] .navbar-collapse').collapse(
          "hide"
        ),
        !t(e.target).closest(".theme-demos").length &&
          t(".theme-demos").hasClass("active") &&
          (t(".theme-demos").removeClass("active"),
          t("body").removeClass("overflow-hidden"))),
      !t(e.target).parents("header") &&
        h &&
        t(".header-language, .header-cart-icon").each(function () {
          var e = t(this);
          e.trigger("mouseleave"),
            e.removeClass("show"),
            e.children(".dropdown-menu").removeClass("show");
        }),
      (0 === t(e.target).closest(".search-form-wrapper").length ||
        t(e.target).is(".form-wrapper")) &&
        (t(".search-form-wrapper").removeClass("active-form"),
        t("body").removeClass("show-search-popup"));
  }),
    t(".navbar-modern-inner").length > 0
      ? t(".dropdown-toggle-clone").dropdown()
      : t(".dropdown-toggle").dropdown(),
    t('[data-mobile-nav-style="classic"] .navbar-collapse.collapse')
      .on("show.bs.collapse", function () {
        t("body").hasClass("navbar-collapse-show") ||
          t("body").addClass("navbar-collapse-show");
      })
      .on("hide.bs.collapse", function () {
        t("body").hasClass("navbar-collapse-show") &&
          t("body").removeClass("navbar-collapse-show");
      }),
    t(".navbar-collapse-clone")
      .on("show.bs.collapse", function () {
        if (t("body").hasClass("navbar-collapse-show"))
          t(".navbar-modern-inner").length > 0 &&
            setTimeout(function () {
              t(".navbar-show-modern-bg").css("background", "");
            }, 600),
            t(".navbar-full-screen-menu-inner").length > 0 &&
              setTimeout(function () {
                t(".navbar-full-screen-menu-inner").css("background", "");
              }, 600);
        else {
          if (
            (t("body").addClass("navbar-collapse-show"),
            t("body").attr("data-mobile-nav-bg-color") &&
              t(".navbar-modern-inner").length > 0)
          ) {
            var e = t("body").attr("data-mobile-nav-bg-color");
            t(".navbar-show-modern-bg").css("background", e);
          }
          if (
            t("body").attr("data-mobile-nav-bg-color") &&
            t(".navbar-full-screen-menu-inner").length > 0
          ) {
            e = t("body").attr("data-mobile-nav-bg-color");
            t(".navbar-full-screen-menu-inner").css("background", e);
          }
        }
        var a = G(),
          o = B();
        t(".navbar-modern-inner").length > 0 ||
        t(".navbar-full-screen-menu-inner").length > 0
          ? t(this).css("max-height", o)
          : t(this).css("max-height", o - a);
      })
      .on("hide.bs.collapse", function () {
        t("body").hasClass("navbar-collapse-show") &&
          t("body").removeClass("navbar-collapse-show");
      }),
    t(".menu-toggle").each(function (e) {
      var a = t(this);
      a.attr({ "data-toggle": "collapse", "data-target": "#sub-menu-" + e }),
        a
          .parent()
          .find(".sub-menu-item")
          .attr("id", "sub-menu-" + e)
          .addClass("collapse");
    }),
    t(".sub-menu-item").each(function () {
      t(this).collapse("hide");
    }),
    t(".left-sidebar-wrapper").length > 0 &&
      t(".left-sidebar-wrapper .left-sidebar-nav").stick_in_parent({
        recalc: 1,
      }),
    t(document).on(
      "click",
      ".menu-list > .menu-list-item > .menu-toggle",
      function () {
        t(".sub-menu-item").each(function () {
          t(this).collapse("hide");
        }),
          t(".left-sidebar-wrapper .left-sidebar-nav")
            .parents("body")
            .addClass("left-classic-mobile-menu"),
          setTimeout(function () {
            t(".left-sidebar-wrapper").trigger("sticky_kit:recalc");
          }, 500);
      }
    ),
    t(document).on(
      "click",
      ".sub-menu-item > .menu-list-item > .menu-toggle",
      function (e) {
        e.preventDefault();
        t(this).parent().find(".sub-menu-item");
        var a = t(this).attr("data-target");
        t(this)
          .parent()
          .parent(".sub-menu-item")
          .find(".sub-menu-item")
          .each(function () {
            var e = t(this);
            e.parent().find(".menu-toggle").attr("data-target") != a &&
              e.collapse("hide");
          }),
          t(".left-sidebar-wrapper .left-sidebar-nav")
            .parents("body")
            .addClass("left-classic-mobile-menu"),
          setTimeout(function () {
            t(".left-sidebar-wrapper").trigger("sticky_kit:recalc");
          }, 500);
      }
    ),
    t(document).on("click", "#mobileToggleSidenav", function (e) {
      e.preventDefault(), t(this).closest("nav").toggleClass("sidemenu-open");
    });
  var O = !1;
  t(document).on("click", ".navbar-toggle", function () {
    z() > i &&
      (O
        ? !t(".navbar-collapse").has(e.target).is(".navbar-collapse") &&
          t(".navbar-collapse ul").hasClass("show") &&
          (t(".navbar-collapse")
            .find("a.dropdown-toggle")
            .addClass("collapsed"),
          t(".navbar-collapse").find("ul.dropdown-menu").removeClass("show"),
          t(".navbar-collapse a.dropdown-toggle").removeClass("active"))
        : ((O = !0),
          setTimeout(function () {
            O = !1;
          }, 500),
          t("body").addClass("show-menu")));
  }),
    t(".dropdown")
      .on("mouseenter touchstart", function (e) {
        var a = t(this);
        a.addClass("open"),
          a.siblings(".dropdown").removeClass("open"),
          z() > i &&
            (!(function (e) {
              var t = z();
              if (e.hasClass("simple-dropdown")) {
                (s = e), (l = e.find("a.nav-link"));
                var a = e.offset().left,
                  o = e.children(".dropdown-menu").outerWidth(),
                  i = t - 30 - (a + o);
                i < 0 && e.children(".dropdown-menu").css("left", i);
              }
              if (
                e.parent().hasClass("dropdown-menu") &&
                e.parents(".simple-dropdown")
              ) {
                var n = 0,
                  r = 0,
                  d = 0,
                  c = 0;
                (n = e.outerWidth() - l.outerWidth()),
                  e.find(".dropdown-menu").each(function () {
                    var t = [];
                    e.find("li").hasClass("dropdown")
                      ? ((n += e.outerWidth()),
                        e.find("li.dropdown").each(function () {
                          var a = e.closest(".dropdown-menu");
                          t.push(a.outerWidth());
                        }),
                        (r = d + Math.max.apply(Math, t)),
                        (d = r),
                        (n += r),
                        (c += 1))
                      : c < 1 && (n += e.outerWidth());
                  });
                var p = t - (s.offset().left + s.outerWidth());
                if (n > p) {
                  if (e.find(".dropdown-menu").length > 0) {
                    var h = e.position().top,
                      u = e.find(".dropdown-menu"),
                      m = u.outerHeight(),
                      g = h + m + G(),
                      f = B();
                    g > f && u.css("top", "-" + (g - f) + "px");
                  }
                  e.addClass("menu-left");
                }
              }
            })(a),
            t(e.target).siblings(".dropdown-menu").length &&
              e.preventDefault());
      })
      .on("mouseleave", function (e) {
        var a = t(this);
        a.removeClass("menu-left"), a.removeClass("open");
      });
  t(document).on("click", ".gdpr-policy-button", function () {
    t(".gdpr-wrapper").fadeOut().remove(), V("litho-gdpr-policy", "shown", 30);
  });
  function D() {
    var e = t(window).scrollTop(),
      a = t(".navbar-nav li a");
    a.each(function () {
      var o = t(this),
        i = o.attr("href").indexOf("#");
      if (i > -1) {
        var n = o.attr("href").substring(i);
        if ("" != n && "#" != n && t(n).length > 0) {
          var r = t(o.attr("href"));
          r.position().top <= e + 60 &&
            r.position().top + r.height() > e + 60 &&
            (a.removeClass("active"), o.addClass("active")),
            e < 1 && o.removeClass("active");
        }
      }
    });
    var o = 0,
      n = 0;
    t("nav").length > 0 && (o = t("nav").outerHeight()),
      t(".top-bar").length > 0 && (n = t(".top-bar").outerHeight());
    var s = o + n;
    if (
      (t("header").hasClass("no-sticky") ||
        (e >= s
          ? (t("header").addClass("sticky"),
            t(".header-with-topbar .top-bar").is(":hidden") ||
              (t(".header-with-topbar .top-bar").css({ top: "-" + n + "px" }),
              t(".header-with-topbar .fixed-top").css({ top: "0px" })))
          : e <= s &&
            (t(".header-with-topbar .top-bar").css({ top: "0px" }),
            t(".header-with-topbar .fixed-top").css({ top: n + "px" }),
            t("header").removeClass("sticky"),
            t("header").hasClass("sticky") ||
              setTimeout(function () {
                Y();
              }, 200))),
      t("nav.header-always-fixed-scroll").length <= 0)
    ) {
      var l = e;
      l > r
        ? ((l -= 1),
          t(".sticky").removeClass("header-appear"),
          t(".dropdown.on")
            .removeClass("on")
            .removeClass("show")
            .find(".dropdown-menu")
            .fadeOut(100))
        : t(".sticky").addClass("header-appear"),
        (r = l) <= o && t("header").removeClass("header-appear");
    }
    e >= 200 &&
      z() > i &&
      (t(".navbar-collapse").hasClass("show") &&
        t(".navbar-collapse").removeClass("show"),
      t("body").hasClass("navbar-collapse-show") &&
        t("body").removeClass("navbar-collapse-show")),
      e > 150
        ? (t(".scroll-top-arrow").fadeIn("300"),
          !t(".show-theme-demos").length &&
            z() > 1199 &&
            t(".theme-demos").fadeIn("300"))
        : t(".scroll-top-arrow").fadeOut("300");
  }
  function j(e) {
    return e < 10 ? "0" + e.toString() : e.toString();
  }
  function z() {
    return t(window).width();
  }
  function B() {
    return t(window).height();
  }
  function N() {
    t(".swiper-container:not( .instafeed-wrapper )").each(function () {
      var e = t(this),
        a = e.attr("data-slider-options");
      if (null != a) {
        a = t.parseJSON(a);
        var o = e.attr("data-slider-md-direction");
        if ("" != o && null != o) {
          var i = "" != a.direction && null != a.direction ? a.direction : o;
          a.on = {
            init: function () {
              z() <= n ? this.changeDirection(o) : this.changeDirection(i),
                this.update();
            },
            resize: function () {
              z() <= n ? this.changeDirection(o) : this.changeDirection(i),
                this.update();
            },
          };
        }
        if ("" != a.thumbs && null != a.thumbs) {
          var r = e.attr("data-thumb-slider-md-direction");
          if ("" != r && null != r) {
            var s =
              "" != a.thumbs.swiper.direction &&
              null != a.thumbs.swiper.direction
                ? a.thumbs.swiper.direction
                : r;
            a.thumbs.swiper.on = {
              init: function () {
                z() <= n ? this.changeDirection(r) : this.changeDirection(s),
                  this.update();
              },
              resize: function () {
                z() <= n ? this.changeDirection(r) : this.changeDirection(s),
                  this.update();
              },
              click: function () {
                this.activeIndex == this.clickedIndex
                  ? this.slidePrev()
                  : this.slideNext();
              },
            };
          }
        }
        var l = e.attr("data-slider-number-pagination");
        "" != l &&
          null != l &&
          (a.on.slideChange = function () {
            t(".swiper-pagination-current").length > 0 &&
              t(".swiper-pagination-current").html(j(this.realIndex + 1)),
              t(".swiper-pagination-total").length > 0 &&
                t(".swiper-pagination-total").html(j(this.slides.length - 2));
          });
        var d = e.attr("data-slide-change-on-click");
        "" != d &&
          null != d &&
          (a.on = {
            click: function () {
              this.activeIndex > this.clickedIndex
                ? this.slidePrev()
                : this.activeIndex < this.clickedIndex && this.slideNext();
            },
          });
        var p = e.attr("data-thumbs");
        "" != p &&
          null != p &&
          null != (p = t.parseJSON(p)) &&
          (a.pagination.renderBullet = function (e, t) {
            return (
              '<span class="' +
              t +
              '" style="background-image: url( ' +
              p[e] +
              ' )"></span>'
            );
          });
        var h = new Swiper(e, a);
        c.push(h);
      }
    });
  }
  function A() {
    for (var e = 0; e < c.length; e++) {
      var t = c[e],
        a = t.$el.attr("data-slider-destroy");
      "" != a &&
        null != a &&
        (z() <= a ? t.destroy(!1, !0) : t.destroyed && (c.splice(e, 1), N()));
    }
  }
  function W() {
    setTimeout(function () {
      for (var e = 0; e < c.length; e++) {
        c[e].update();
      }
    }, 500);
  }
  function L(e) {
    e.find(".grid-item").removeClass("animate__animated").css("visibility", ""),
      t(".wow").length > 0 &&
        e.find(".grid-item").each(function () {
          var e = t(this);
          p.removeBox(this),
            e.css("-webkit-animation", "none"),
            e.css("-moz-animation", "none"),
            e.css("-ms-animation", "none"),
            e.css("animation", "none");
        });
  }
  function q(e, t) {
    for (var a = 0; a < e.length; a++)
      t && L(e[a]), e[a].data("isotope") && e[a].isotope("layout");
  }
  function M() {
    (t(".overlap-section").length > 0 ||
      t(".overlap-section-one-fourth").length > 0 ||
      t(".overlap-section-three-fourth").length > 0) &&
    z() >= 768
      ? t(
          ".overlap-section, .overlap-section-one-fourth, .overlap-section-three-fourth"
        ).each(function () {
          var e = t(this);
          setTimeout(function () {
            e.imagesLoaded(function () {
              var t = e.closest("section"),
                a = parseInt(t.css("padding-top")),
                o = e.find("*").outerHeight(),
                i = o + a;
              (i = e.hasClass("overlap-section-one-fourth")
                ? o / 4 - i
                : e.hasClass("overlap-section-three-fourth")
                ? (3 * o) / 4 - i
                : o / 2 - i),
                e.css("margin-top", i);
              var n = t.prev("section.overlap-height"),
                r = n.find(".overlap-gap-section");
              n.imagesLoaded(function () {
                if (r.length > 0) {
                  var e = r.outerHeight() + (Math.abs(i) - a);
                  r.parents("section.overlap-height").height(e);
                }
              });
            });
          }, 10);
        })
      : (t(".overlap-height").height(""),
        t(
          ".overlap-section, .overlap-section-one-fourth, .overlap-section-three-fourth"
        ).css("margin-top", ""));
  }
  function H(e) {
    t(".overlap-section-bottom").length > 0 && z() >= 768
      ? t(".overlap-section-bottom").each(function () {
          var a = t(this),
            o = a.find(".instafeed-wrapper").length > 0 ? e : 10;
          setTimeout(function () {
            a.imagesLoaded(function () {
              var e = a.outerHeight(),
                t = e / 2 - e;
              a
                .parents("section")
                .next(".overlap-gap-section-bottom")
                .css("margin-top", t),
                a
                  .parents("section")
                  .next(".overlap-gap-section-bottom")
                  .css("padding-top", e);
            });
          }, o);
        })
      : (t(".overlap-gap-section-bottom").css("margin-top", ""),
        t(".overlap-gap-section-bottom").css("padding-top", ""));
  }
  function J() {
    window.navigator.userAgent.indexOf("MSIE ") > 0 ||
      navigator.userAgent.match(/Trident.*rv\:11\./) ||
      (t("[data-parallax-background-ratio]").each(function () {
        var e = t(this).attr("data-parallax-background-ratio") || 0.5;
        t(this).parallax("50%", e);
      }),
      t("[data-parallax-layout-ratio]").each(function () {
        var e = t(this).attr("data-parallax-layout-ratio") || 1;
        t(this).parallaxImg(e);
      }));
  }
  function G() {
    var e = 0;
    return (
      t("header nav.navbar").length > 0 &&
        (e += t("header nav.navbar").outerHeight()),
      t(".top-bar").length > 0 && (e += t(".top-bar").outerHeight()),
      t(".sidebar-nav-action").length > 0 &&
        z() <= i &&
        (e += t(".sidebar-nav-action").outerHeight()),
      t(".side-menu-header").length > 0 &&
        z() <= i &&
        (e += t(".side-menu-header").outerHeight()),
      e
    );
  }
  function Y() {
    var e = G();
    t(".navbar").hasClass("no-sticky") ||
    (!t(".navbar").hasClass("top-space") &&
      !t(".navbar").hasClass("mobile-top-space"))
      ? t("body").css("padding-top", "")
      : t("body").css("padding-top", e + "px"),
      t(".mobileoff-fullscreen-top-space").length >= 0 &&
        z() > 1023 &&
        t(".mobileoff-fullscreen-top-space").css("height", B() - e + "px"),
      t(".fullscreen-top-space").length >= 0 &&
        t(".fullscreen-top-space").css("height", B() - e + "px"),
      (t(".sidebar-nav-action").length > 0 ||
        t(".side-menu-header").length > 0) &&
        (z() <= i
          ? t("body").css("padding-top", e + "px")
          : t("body").css("padding-top", ""));
  }
  function R() {
    var e = t(".full-screen"),
      a = B(),
      o = G();
    z() <= i
      ? (t("header nav.navbar").addClass("mobile-top-space"),
        t(".sidebar-nav-action").addClass("mobile-top-space"),
        t(".side-menu-header").addClass("mobile-top-space"))
      : (t("header nav.navbar").removeClass("mobile-top-space"),
        t(".sidebar-nav-action").removeClass("mobile-top-space"),
        t(".side-menu-header").removeClass("mobile-top-space")),
      e.parents("section").imagesLoaded(function () {
        t("section:first.full-screen, section:first .full-screen").length > 0 &&
        (t(".top-space").length > 0 || t(".mobile-top-space").length > 0)
          ? t("section:first.full-screen, section:first .full-screen").css(
              "height",
              a - o
            )
          : t("header nav.navbar").hasClass("top-space") ||
            t("header nav.navbar").hasClass("mobile-top-space")
          ? ((a -= t("header nav.navbar").outerHeight()), e.css("height", a))
          : e.css("height", a);
      });
  }
  function U() {
    if (
      (t(".footer-sticky").length > 0 &&
        t(".footer-sticky").imagesLoaded(function () {
          var e = t(".footer-sticky").outerHeight();
          t(".main-content").css({ "margin-bottom": e });
        }),
      t(".box-layout").length > 0 && t(".footer-sticky").length > 0)
    ) {
      var e = t(".box-layout"),
        a = e.width();
      e.find(".footer-sticky").css({
        margin: "0 auto",
        width: a,
        "max-width": a,
      });
    }
  }
  function V(e, t, a) {
    var o = new Date();
    o.setTime(o.getTime() + 24 * a * 60 * 60 * 1e3);
    var i = 0 != a && "" != a ? o.toUTCString() : 0;
    document.cookie = e + "=" + t + ";expires=" + i + ";path=/";
  }
  function $() {
    J(),
      Y(),
      t(".vertical-counter").each(function () {
        var e = t(this),
          a = e.css("font-size");
        e.css("height", a),
          e.find(".vertical-counter-number").each(function () {
            var e = t(this),
              a = e.find("li").height();
            e.height(a);
          });
      });
  }

  t(window).on("load", function () {
    J(),
      t("img:not([data-at2x])").each(function () {
        t(this).attr("data-no-retina", "");
      }),
      t(".page-loader").length > 0 && t(".page-loader").fadeOut(),
      q(d, !1),
      W(),
      U(),
      t(".rev-nav-ares-effect").length > 0 &&
        setTimeout(function () {
          t(".rev-nav-ares-effect .ares").css({ opacity: "1" });
        }, 2e3),
      M(),
      H();
  }),
    t(window).resize(function () {
      R(),
        A(),
        W(),
        U(),
        t(".navbar-modern-inner").length > 0
          ? t(".dropdown-toggle-clone").dropdown()
          : t(".dropdown-toggle").dropdown(),
        setTimeout(function () {
          q(d, !0);
        }, 300),
        setTimeout(function () {
          $(), M(), H(100), D();
        }, 500);
    }),
    t(window).on("orientationchange", function (e) {
      t(".close-menu").trigger("click"), t(window).trigger("closemenu");
    }),
    t(window).on("closemenu", function (e) {
      t(".dropdown").each(function () {
        var e = t(this);
        e.trigger("mouseleave"),
          e.removeClass("show"),
          e.children(".dropdown-menu").removeClass("show");
      }),
        t(".navbar-collapse").hasClass("show") &&
          t(".navbar-collapse").removeClass("show"),
        t("body").hasClass("navbar-collapse-show") &&
          t("body").removeClass("navbar-collapse-show"),
        t(".search-close").trigger("click");
    }),
    t(window).on("scroll", D);
})(jQuery);
