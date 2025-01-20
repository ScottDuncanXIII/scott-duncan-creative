(function () {
  var scrollController = new ScrollMagic.Controller({
    /*addIndicators: true*/
  });
  var transitionTime = 0.4;
  var triggerPoint = "0.85";

  var fakeData = {
    ourClients: [
      {
        image: "./images/our-clients/logos/best-buy.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/shoppers.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/wonder.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/jamieson.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/tetley.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/eqbank.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/infiniti.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/johnsonjohnson.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/kumon.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/country-harvest.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/crea.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/ditaliano.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/interval-house.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/loblaw-media.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/mount-pleasant.png",
        label: "",
      },
      {
        image: "./images/our-clients/logos/casa-mendosa.png",
        label: "",
      },
    ],
    workThumbnails: [
      {
        image: "./images/work/eq-bank/thumbnail.jpg",
        heading: "EQ Bank",
        brandName: "EQ Bank",
        campaignName: "EQ Bank",
        url: "work/eq-bank.html",
      },
      {
        image: "./images/work/get-real/thumbnail.jpg",
        heading: "Get REAL",
        brandName: "Get REAL",
        campaignName: "Get Real",
        url: "work/get-real.html",
      },
      {
        image: "./images/work/country-harvest/thumbnail.jpg",
        heading: "Country Harvest",
        brandName: "Country Harvest",
        campaignName: "Country Harvest",
        url: "work/country-harvest.html",
      },
      {
        image: "./images/work/infiniti/thumbnail.jpg",
        heading: "Infiniti",
        brandName: "Infiniti",
        campaignName: "Infiniti",
        url: "work/infiniti-social.html",
      },
      {
        image: "./images/work/tetley/thumbnail.jpg",
        heading: "Tetley",
        brandName: "Tetley",
        campaignName: "Tetley",
        url: "work/tetley.html",
      },
    ],
  };

  var GlobalNavigationComponent = {
    template: "#union-creative-main-navigation-template",
    data: function () {
      return {
        currentNavHightlight: "",
        isNavigationMenuOpen: false,
        currentHighlightFeaturedNews: "",
        isInitialView: true,
      };
    },
    mounted: function () {
      var vm = this;
      this.$root.$on("window-scroll", function () {
        vm.onWindowScroll();
      });

      window.addEventListener("wheel", this.onMouseScroll);
    },
    methods: {
      onWindowScroll: function () {
        if (window.scrollY > 0) {
          document
            .querySelector("#global-navigation")
            .classList.add("background");
        } else {
          document
            .querySelector("#global-navigation")
            .classList.remove("background");
        }
      },
      onMouseScroll: function (e) {
        if (e.deltaY < 0) {
          if (window.scrollY > 50) {
            document
              .querySelector("#global-navigation")
              .classList.remove("hide");
          }
        }

        if (e.deltaY > 0) {
          if (window.scrollY > 50 && !this.isNavigationMenuOpen) {
            document.querySelector("#global-navigation").classList.add("hide");
          }
        }
      },
      onMouseOverNavigation: function (linkName) {
        this.currentNavHightlight = linkName;
      },
      onMouseLeaveNavigation: function () {
        this.currentNavHightlight = "";
      },
      onClickNavigationMenuButton: function (e) {
        this.isNavigationMenuOpen = !this.isNavigationMenuOpen;

        var tl = new TimelineMax();

        if (this.isNavigationMenuOpen) {
          document.body.style.overflow = "hidden";
          tl.set("#global-navigation-menu", { disabled: true });
          tl.set("#global-navigation-overlay", { className: "+=open" }, 0.01);
          tl.set(
            "#global-navigation-overlay__wrapper",
            { className: "+=anim-in" },
            0.01
          );
          tl.staggerTo(
            ".global-navigation-overlay__link",
            0.1,
            { className: "+=anim-in", stagger: 0.1 },
            0.5
          );
          tl.set(
            "#global-navigation-overlay__wrapper",
            { className: "+=open" },
            0.4
          );
          tl.set("#global-navigation-menu", { disabled: false }, 0.4);
        } else {
          document.body.style.overflow = "auto";
          tl.set("#global-navigation-menu", { disabled: true });
          tl.set(
            "#global-navigation-overlay__wrapper",
            { className: "+=anim-out" },
            0.01
          );
          tl.set(
            "#global-navigation-overlay__wrapper",
            { className: "-=anim-out" },
            0.4
          );
          tl.set(".global-navigation__link", { className: "-=anim-in" }, 0.4);
          tl.set("#global-navigation-overlay", { className: "-=open" }, 0.4);
          tl.set(
            "#global-navigation-overlay__wrapper",
            { className: "-=open" },
            0.4
          );
          tl.set("#global-navigation-menu", { disabled: false }, 0.4);
        }
      },
    },
  };

  var GlobalFooterComponent = {
    template: "#union-creative-global-footer-template",
  };

  var HomeIntroComponent = {
    template: "#union-creative-home-intro-template",
    data: function () {
      return {
        isInitialView: true,
        isReelActive: false,
        unionLogoElement: "",
      };
    },
    mounted: function () {
      TweenMax.set(".home-intro__logo-loop-wrapper", {
        className: "+=anim-in",
        delay: 0.5,
      });
      TweenMax.set(".home-intro__video-cta", {
        className: "+=anim-in",
        delay: 1.2,
      });
      TweenMax.set(".home-intro__scroll-arrow", {
        className: "+=anim-in",
        delay: 1.5,
      });
    },
    methods: {
      onVideoCtaClick: function () {
        TweenMax.set(".home-intro__logo-loop-container", {
          className: "+=anim-out",
          delay: 0,
        });

        var vm = this;
        setTimeout(function () {
          vm.isReelActive = true;
        }, 200);

        setTimeout(function () {
          TweenMax.set(".home-intro__video-wrapper", {
            className: "+=anim-in",
          });
        }, 300);
      },
      onUnionLogoClick: function () {
        window.removeEventListener("wheel", this.onUnionLogoClick);
        this.removeInteraction();
        this.unionLogoAnimOut();
      },
      unionLogoAnimOut: function () {
        var vm = this;
        this.removeInteraction();
        var tl = new TimelineMax();
        tl.set(".home-intro__video-teaser", { display: "none" });
        tl.to("#home-intro", 1, { scale: 15, x: "50%", ease: Power0.easeNone });
        tl.to("#home-intro", 0.5, {
          scale: 30,
          opacity: 0,
          x: "100%",
          ease: Power0.easeNone,
        });
        tl.set("#home-intro", {
          display: "none",
          onComplete: vm.addInteraction,
        });
      },
      unionLogoAnimIn: function () {
        var vm = this;
        this.removeInteraction();
        var tl = new TimelineMax();
        tl.set(".home-intro__video-teaser", { display: "block" });
        tl.set("#home-intro", {
          display: "flex",
          scale: 30,
          opacity: 0,
          x: "60%",
        });
        tl.to("#home-intro", 0.3, {
          scale: 15,
          opacity: 1,
          x: "0",
          ease: Power0.easeNone,
        });
        tl.to("#home-intro", 0.3, {
          scale: 1,
          x: "0%",
          ease: Power0.easeNone,
          onComplete: vm.addInteraction,
        });
        tl.set(".home-intro__video-still", {
          className: "-=animation-start",
          opacity: 1,
        });
        tl.to(".home-intro__video-play-button", 0.4, { opacity: 0 });
      },
      addInteraction: function () {
        document.querySelector("body").style.overflow = "auto";
      },
      removeInteraction: function () {
        var vm = this;
        this.unionLogoElement.removeEventListener("click", vm.onUnionLogoClick);
        this.$root.$emit("disableMouseWheel");
      },
    },
  };

  var HomeStatementComponent = {
    template: "#union-creative-home-statement-template",
    mounted: function () {
      Splitting();
      var timelineStatement = new TimelineMax();
      timelineStatement.set(
        ".home-statement__heading",
        { className: "+=home-statement__heading animIn words chars splitting" },
        0.5
      );

      var statementComponent = new ScrollMagic.Scene({
        triggerElement: ".home-statement-container",
        triggerHook: triggerPoint,
        reverse: false,
      })
        .setTween(timelineStatement)
        .addTo(scrollController);
    },
  };

  var HomeFeaturedNewsComponent = {
    template: "#union-creative-home-home-featured-news-template",
    data: function () {
      return {
        currentHighlightFeaturedNews: "",
      };
    },
    mounted: function () {
      var timelineFeaturedNews = new TimelineMax();
      timelineFeaturedNews.set(
        ".home-featured-news-content",
        { className: "+=animIn", stagger: 0.2 },
        0.5
      );

      new ScrollMagic.Scene({
        triggerElement: ".home-featured-news",
        triggerHook: triggerPoint,
        reverse: false,
      })
        .setTween(timelineFeaturedNews)
        .addTo(scrollController);

      var vm = this;
      var featuredNewsSectionA = document.querySelector(
        ".home-featured-news-container--a"
      );
      var featuredNewsSectionB = document.querySelector(
        ".home-featured-news-container--b"
      );

      setTimeout(function () {
        featuredNewsSectionA.addEventListener("mouseover", function () {
          vm.onMouseOverFeaturedNews("a");
        });
        featuredNewsSectionA.addEventListener("mouseout", function () {
          vm.onMouseLeaveFeaturedNews();
        });
        featuredNewsSectionB.addEventListener("mouseover", function () {
          vm.onMouseOverFeaturedNews("b");
        });
        featuredNewsSectionB.addEventListener("mouseout", function () {
          vm.onMouseLeaveFeaturedNews();
        });
      }, 1000);
    },
    methods: {
      onMouseOverFeaturedNews: function (value) {
        this.currentHighlightFeaturedNews = value;
      },
      onMouseLeaveFeaturedNews: function () {
        this.currentHighlightFeaturedNews = "";
      },
    },
  };

  var ContactComponent = {
    template: "#union-creative-contact-component-template",
    mounted: function () {
      var vm = this;
      setTimeout(function () {
        vm.initAnims();
      }, 100);
    },
    methods: {
      initAnims: function () {
        var delayOffset = 0.3;
        var timelineContact = new TimelineMax();

        if (document.querySelector(".contact-component__heading")) {
          timelineContact.set(
            ".contact-component__heading",
            { className: "+=anim-in" },
            delayOffset
          );

          timelineContact.set(
            ".contact-component__heading-container",
            { className: "+=anim-in" },
            (delayOffset += 0.1)
          );

          delayOffset += 0.3;
        }

        timelineContact.set(
          document
            .querySelectorAll(".contact-component-info__container")[0]
            .querySelector(".contact-component-info__city-name"),
          { className: "+=anim-in" },
          delayOffset
        );

        timelineContact.set(
          document
            .querySelectorAll(".contact-component-info__container")[0]
            .querySelector(".contact-component-info__wrapper"),
          { className: "+=anim-in" },
          (delayOffset += 0.3)
        );

        timelineContact.set(
          document
            .querySelectorAll(".contact-component-info__container")[1]
            .querySelector(".contact-component-info__city-name"),
          { className: "+=anim-in" },
          delayOffset
        );

        timelineContact.set(
          document
            .querySelectorAll(".contact-component-info__container")[1]
            .querySelector(".contact-component-info__wrapper"),
          { className: "+=anim-in" },
          (delayOffset += 0.3)
        );

        new ScrollMagic.Scene({
          triggerElement: ".contact-component",
          triggerHook: triggerPoint,
          reverse: false,
        })
          .setTween(timelineContact)
          .addTo(scrollController);
      },
    },
  };

  var AboutLeadershipComponent = {
    template: "#union-creative-about-leadership-template",
    data: function () {
      return {
        transitionTime: 0.4,
        triggerPoint: "0.5",
      };
    },
    mounted: function () {
      this.initScrollAnims();
    },
    methods: {
      initScrollAnims: function () {
        var vm = this;
        var leadershipProfiles = document.querySelectorAll(
          ".about-leadership-profile"
        );
        var leadershipHeadingTimeline = new TimelineMax();
        leadershipHeadingTimeline.set(
          document.querySelector(".about-leadership-heading__first"),
          { className: "+=animation-in" },
          0.01
        );
        leadershipHeadingTimeline.set(
          document.querySelector(".about-leadership-heading__second"),
          { className: "+=animation-in" },
          0.01
        );

        new ScrollMagic.Scene({
          triggerElement: document.querySelector(".about-leadership-heading"),
          triggerHook: triggerPoint,
          reverse: false,
        })
          .setTween(leadershipHeadingTimeline)
          .addTo(scrollController);

        for (var i = 0; i < leadershipProfiles.length; i++) {
          var leadershipTimeline = new TimelineMax();
          leadershipTimeline.set(
            leadershipProfiles[i].querySelector(
              ".about-leadership-profile__image-wrapper"
            ),
            { className: "+=anim-in" },
            0.01
          );
          leadershipTimeline.set(
            leadershipProfiles[i].querySelector(
              ".about-leadership-profile__content-name--first"
            ),
            { className: "+=animation-in" },
            0.01
          );
          leadershipTimeline.set(
            leadershipProfiles[i].querySelector(
              ".about-leadership-profile__content-name--last"
            ),
            { className: "+=animation-in" },
            0.01
          );
          leadershipTimeline.set(
            leadershipProfiles[i].querySelector(
              ".about-leadership-profile__content-title"
            ),
            { className: "+=animation-in" },
            0.01
          );
          leadershipTimeline.set(
            leadershipProfiles[i].querySelector(
              ".about-leadership-profile__content-paragraph"
            ),
            { className: "+=animation-in" },
            0.01
          );
          leadershipTimeline.set(
            leadershipProfiles[i].querySelector(
              ".about-leadership-profile__content-paragraph--mobile"
            ),
            { className: "+=animation-in" },
            0.01
          );

          new ScrollMagic.Scene({
            triggerElement: leadershipProfiles[i],
            triggerHook: triggerPoint,
            reverse: false,
          })
            .setTween(leadershipTimeline)
            .addTo(scrollController);
        }
      },
    },
  };

  var GlobalHeroComponent = {
    template: "#union-creative-hero-template",
    mounted: function () {
      this.initAnims();
    },
    methods: {
      initAnims: function () {
        var animDelay = 0;
        var tl = new TimelineMax();

        if (document.querySelector(".global-hero__heading--a")) {
          tl.set(
            ".global-hero__heading--a",
            { className: "+=anim-in" },
            (animDelay += 0.2)
          );
        }

        if (document.querySelector(".global-hero__heading--b")) {
          tl.set(
            ".global-hero__heading--b",
            { className: "+=anim-in" },
            (animDelay += 0.2)
          );
        }

        if (document.querySelector(".global-hero__heading--c")) {
          tl.set(
            ".global-hero__heading--c",
            { className: "+=anim-in" },
            (animDelay += 0.2)
          );
        }

        if (document.querySelector(".global-hero__heading-wrapper")) {
          var headingWrapperArray = document.querySelectorAll(
            ".global-hero__heading-wrapper"
          );

          for (var i = 0; i < headingWrapperArray.length; i++) {
            tl.set(
              headingWrapperArray[i].querySelector(".global-hero__heading--d"),
              { className: "+=anim-in" },
              (animDelay += 0.2)
            );

            tl.set(
              headingWrapperArray[i].querySelector(".global-hero__heading--e"),
              { className: "+=anim-in" },
              (animDelay += 0.2)
            );
          }
        }

        tl.set(
          ".global-hero__heading-strip",
          { className: "+=anim-in" },
          (animDelay += 0.4)
        );
      },
    },
  };

  var CapabilitiesComponent = {
    template: "#union-creative-capabilities-content-template",
    mounted: function () {
      var vm = this;

      setTimeout(function () {
        vm.initAnims();
      }, 800);
    },
    methods: {
      initAnims: function () {
        var headingTimeline = new TimelineMax();
        headingTimeline.set(
          ".capabilities__heading",
          { className: "+=anim-in" },
          0.01
        );

        new ScrollMagic.Scene({
          triggerElement: ".capabilities__heading",
          triggerHook: triggerPoint,
          reverse: false,
        })
          .setTween(headingTimeline)
          .addTo(scrollController);

        var capabilities = document.querySelectorAll(
          ".capabilities-capability"
        );

        for (var i = 0; i < capabilities.length; i++) {
          var capabilitiesTimeline = new TimelineMax();
          capabilitiesTimeline.set(
            capabilities[i].querySelector(".capabilities-capability__icon"),
            { className: "+=anim-in" },
            0.1
          );

          capabilitiesTimeline.set(
            capabilities[i].querySelector(
              ".capabilities-capability__content-heading"
            ),
            { className: "+=anim-in" },
            0.3
          );

          capabilitiesTimeline.set(
            capabilities[i].querySelector(
              ".capabilities-capability__content-paragraph"
            ),
            { className: "+=anim-in" },
            0.7
          );

          new ScrollMagic.Scene({
            triggerElement: capabilities[i],
            triggerHook: triggerPoint,
            reverse: false,
          })
            .setTween(capabilitiesTimeline)
            .addTo(scrollController);
        }
      },
    },
  };

  var OurClientsGridComponent = {
    template: "#union-creative-our-clients-grid-template",
    data: function () {
      return {
        clients: [],
      };
    },
    mounted: function () {
      this.clients = fakeData.ourClients;
      var vm = this;
      setTimeout(function () {
        vm.animationIntro();
      }, 800);
    },
    methods: {
      animationIntro: function () {
        var timelineClientThumbnailGrid = new TimelineMax();
        var clientThumbnails = document.querySelectorAll(
          ".our-clients-grid__item"
        );

        for (var i = 0; i < clientThumbnails.length; i++) {
          timelineClientThumbnailGrid.set(
            clientThumbnails[i].querySelector(
              ".our-clients-grid__image-wrapper"
            ),
            { className: "+=anim-in" },
            i * 0.1
          );
        }

        new ScrollMagic.Scene({
          triggerElement: ".our-clients-grid",
          triggerHook: triggerPoint,
          reverse: false,
        })
          .setTween(timelineClientThumbnailGrid)
          .addTo(scrollController);
      },
    },
  };

  var WorkThumbnailGridComponent = {
    template: "#union-creative-work-thumbnail-grid-template",
    data: function () {
      return {
        workThumbnailArray: [],
      };
    },
    mounted: function () {
      this.workThumbnailArray = fakeData.workThumbnails;
      var vm = this;
      setTimeout(function () {
        vm.animationIntro();
      }, 1000);
    },
    methods: {
      animationIntro: function () {
        var workThumbnails = document.querySelectorAll(
          ".work-thumbnail-grid__item"
        );

        for (var i = 0; i < workThumbnails.length; i++) {
          var timelineWorkThumbnailGrid = new TimelineMax();
          timelineWorkThumbnailGrid.set(
            workThumbnails[i].querySelector(".work-thumbnail-grid__link"),
            { className: "+=anim-in" }
          );

          new ScrollMagic.Scene({
            triggerElement: workThumbnails[i].querySelector(
              ".work-thumbnail-grid__link"
            ),
            triggerHook: 1,
            reverse: false,
          })
            .setTween(timelineWorkThumbnailGrid)
            .addTo(scrollController);
        }
      },
    },
  };

  var CaseStudyHeroComponent = {
    template: "#union-creative-case-study-hero-template",
    mounted: function () {
      this.animationIntro();
    },
    methods: {
      animationIntro: function () {
        var tl = new TimelineMax();
        tl.set(
          ".case-study-hero__heading--a",
          { className: "+=anim-in" },
          0.01
        );

        if (document.querySelector(".case-study-hero__heading--b")) {
          tl.set(
            ".case-study-hero__heading--b",
            { className: "+=anim-in" },
            0.01
          );
        }

        tl.set(".case-study-hero__paragraph", { className: "+=anim-in" }, 0.01);
        tl.set(".case-study-hero__strip", { className: "+=anim-in" }, 0.01);
        //tl.set(".case-study-hero__image-wrapper", {className:"+=anim-in"}, 0.01);
      },
    },
  };

  var CaseStudyStatementComponent = {
    template: "#union-creative-case-study-statement-template",
    mounted: function () {
      this.animationIntro();
    },
    methods: {
      animationIntro: function () {
        Splitting();
        var timelineStatement = new TimelineMax();
        timelineStatement.set(
          ".case-study-statement__paragraph",
          { className: "+=anim-in" },
          0.1
        );

        new ScrollMagic.Scene({
          triggerElement: ".case-study-statement",
          triggerHook: 0.75,
          reverse: false,
        })
          .setTween(timelineStatement)
          .addTo(scrollController);
      },
    },
  };

  var CaseStudyCarouselComponent = {
    template: "#union-creative-case-study-carousel-template",
    mounted: function () {
      this.initCarousel();
    },
    methods: {
      initCarousel: function () {
        $(".case-study-carousel__container").slick({
          arrows: false,
          centerMode: true,
          centerPadding: 500,
          slidesToShow: 1,
          speed: 800,
          dots: true,
          focusOnSelect: true,
          infinite: false,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                centerPadding: 0,
              },
            },
          ],
        });

        $(".case-study-carousel__container").on(
          "beforeChange",
          function (event, slick, currentSlide) {
            var current = $(slick.$slides[currentSlide]);
            if (
              current.has(".case-study-carousel__video-container").length > 0
            ) {
              setTimeout(function () {
                current.html(current.html());
              }, 600);
            }
          }
        );

        var carouselTimeline = new TimelineMax();
        carouselTimeline.set(
          ".case-study-carousel",
          { className: "+=anim-in" },
          0.1
        );

        new ScrollMagic.Scene({
          triggerElement: ".case-study-carousel",
          triggerHook: triggerPoint,
          reverse: false,
        })
          .setTween(carouselTimeline)
          .addTo(scrollController);
      },
    },
  };

  var CaseStudyResultsComponent = {
    template: "#union-creative-case-study-results-template",
    mounted: function () {
      this.animationIntro();
    },
    methods: {
      animationIntro: function () {
        Splitting();
        var timelineStatement = new TimelineMax();
        timelineStatement.set(
          ".case-study-results__paragraph",
          { className: "+=anim-in" },
          0.1
        );

        new ScrollMagic.Scene({
          triggerElement: ".case-study-results",
          triggerHook: triggerPoint,
          reverse: false,
        })
          .setTween(timelineStatement)
          .addTo(scrollController);
      },
    },
  };

  var CaseStudyFactsComponent = {
    template: "#union-creative-case-study-facts-template",
    mounted: function () {
      this.animationIntro();
    },
    methods: {
      animationIntro: function () {
        var facts = [];

        if (document.querySelector(".case-study-facts__container--a")) {
          facts = document.querySelectorAll(".case-study-facts__container--a");

          for (var i = 0; i < facts.length; i++) {
            var factsTimeline = new TimelineMax();
            if (facts[i].querySelector(".case-study-facts__heading")) {
              factsTimeline.set(
                facts[i].querySelector(".case-study-facts__heading"),
                { className: "+=anim-in" },
                0.01
              );
            }

            factsTimeline.set(
              facts[i].querySelector(".case-study-facts__paragraph"),
              { className: "+=anim-in" },
              0.01
            );

            factsTimeline.set(
              facts[i].querySelector(".case-study-facts__image-wrapper"),
              { className: "+=anim-in" },
              0.01
            );

            new ScrollMagic.Scene({
              triggerElement: facts[i],
              triggerHook: triggerPoint,
              reverse: false,
            })
              .setTween(factsTimeline)
              .addTo(scrollController);
          }
        }

        if (document.querySelector(".case-study-facts__container")) {
          facts = document
            .querySelector(".case-study-facts__container")
            .querySelectorAll(".case-study-facts__content");

          var factsTimeline = new TimelineMax();

          for (var i = 0; i < facts.length; i++) {
            if (facts[i].querySelector(".case-study-facts__heading")) {
              factsTimeline.set(
                facts[i].querySelector(".case-study-facts__heading"),
                { className: "+=anim-in" },
                i * 0.3
              );
            }

            if (facts[i].querySelector(".case-study-facts__paragraph")) {
              factsTimeline.set(
                facts[i].querySelector(".case-study-facts__paragraph"),
                { className: "+=anim-in" },
                i * 0.3
              );
            }

            if (facts[i].querySelector(".case-study-facts__paragraph--b")) {
              factsTimeline.set(
                facts[i].querySelector(".case-study-facts__paragraph--b"),
                { className: "+=anim-in" },
                i * 0.3
              );
            }
          }

          new ScrollMagic.Scene({
            triggerElement: document.querySelector(
              ".case-study-facts__container"
            ),
            triggerHook: triggerPoint,
            reverse: false,
          })
            .setTween(factsTimeline)
            .addTo(scrollController);
        }
      },
    },
  };

  var CaseStudyVideoComponent = {
    template: "#union-creative-case-study-video-template",
    mounted: function () {
      this.animationIntro();
    },
    methods: {
      animationIntro: function () {
        Splitting();
        var timelineVideo = new TimelineMax();
        timelineVideo.set(
          ".case-study-video__container",
          { className: "+=anim-in" },
          0.1
        );

        new ScrollMagic.Scene({
          triggerElement: ".case-study-video",
          triggerHook: triggerPoint,
          reverse: false,
        })
          .setTween(timelineVideo)
          .addTo(scrollController);
      },
    },
  };

  Vue.component("global-navigation", GlobalNavigationComponent);
  Vue.component("global-footer", GlobalFooterComponent);
  Vue.component("global-hero-component", GlobalHeroComponent);
  Vue.component("home-intro", HomeIntroComponent);
  Vue.component("home-statement", HomeStatementComponent);
  Vue.component("home-featured-news", HomeFeaturedNewsComponent);
  Vue.component("case-study-hero", CaseStudyHeroComponent);
  Vue.component("case-study-statement", CaseStudyStatementComponent);
  Vue.component("case-study-carousel", CaseStudyCarouselComponent);
  Vue.component("case-study-results", CaseStudyResultsComponent);
  Vue.component("case-study-facts", CaseStudyFactsComponent);
  Vue.component("case-study-video", CaseStudyVideoComponent);
  Vue.component("our-clients-grid", OurClientsGridComponent);
  Vue.component("about-leadership", AboutLeadershipComponent);
  Vue.component("work-thumbnail-grid", WorkThumbnailGridComponent);
  Vue.component("capabilities", CapabilitiesComponent);
  Vue.component("contact-component", ContactComponent);

  var Union = new Vue({
    el: "#union",
    mounted: function () {
      window.onscroll = this.onWindowScroll;
      window.onresize = this.onWindowResize;
      this.onWindowResize();
    },
    methods: {
      onWindowScroll: function (e) {
        this.$root.$emit("window-scroll");
      },
      onWindowResize: function () {
        this.$root.$emit("window-resize");
      },
    },
  });
})();
