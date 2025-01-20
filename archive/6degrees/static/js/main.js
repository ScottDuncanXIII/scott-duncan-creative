(function (global) {
  "use strict";

  var fakeData = {
    homepage: [
      {
        bgColor: "#000000",
        btnHighlightColor: "#009ec9",
        heading: "Welcome",
        headingSub: "to 6Degrees",
        headingSubColor: "#009ec9",
        paragraph:
          "As Conversion experts in the evolving world of shopping, we&nbsp;believe it's time the big idea got its hands dirty. We can help your brand get noticed, get considered and get placed into basket by harnessing the latest conversion&nbsp;strategies.",
        imageBg:
          "https://player.vimeo.com/video/505868258?muted=1&autopause=0&controls=0&loop=0&autoplay=1",
        imageBgMobile: "static/img/home/6-degrees-bg--mobile.jpg",
        imageType: "video",
        url: "services",
      },
      {
        bgColor: "#3c9924",
        btnHighlightColor: "#3c9924",
        heading: "Green Giant",
        headingSub: "So good, it's gone.",
        headingSubColor: "#000000",
        paragraph:
          "We helped Green Giant stand out on social and digital with a bold campaign and whole new look. Focusing on empty plates rather than perfectly styled food photography, our target was inspired to create meals using Green Giant frozen veggies their whole family will eat&nbsp;up.",
        imageBg: "static/img/work/green-giant/homepage.jpg",
        imageBgMobile: "static/img/work/green-giant/homepage--mobile.jpg",
        imageType: "image",
        url: "work/green-giant.html",
      },
      {
        bgColor: "#dc7703",
        btnHighlightColor: "#dc7703",
        heading: "LCL Market Division",
        headingSub: "Market Moments",
        headingSubColor: "#000000",
        paragraph:
          "How do you create a customer appreciation event that celebrates across 420 stores from coast-to-coast? You think BIG. And small. See how we tackled this challenge, brought Store Colleagues to the forefront, and connected with shoppers like never&nbsp;before.",
        imageBg: "static/img/work/lcl/homepage.jpg",
        imageBgMobile: "static/img/work/lcl/homepage--mobile.jpg",
        imageType: "image",
        url: "work/lcl-market-division.html",
      },
      {
        bgColor: "#01406e",
        btnHighlightColor: "#00a3e0",
        heading: "Henkel",
        headingSub: "Purex Odour Release Truck",
        headingSubColor: "#00a3e0",
        paragraph:
          "To get the word out about new Purex Odour Release detergent, we connected with the target who needed us most - hockey moms. Not only is hockey gear stinky, it's expensive too, so we gave away used gear washed in Purex Odour Release to prove it&nbsp;works.",
        imageBg: "static/img/work/purex/homepage.jpg",
        imageBgMobile: "static/img/work/purex/homepage--mobile.jpg",
        imageType: "image",
        url: "work/purex.html",
      },
      {
        bgColor: "#d9122f",
        btnHighlightColor: "#d9122f",
        heading: "Tim Hortons",
        headingSub: "Share a cup of Tims",
        headingSubColor: "#000000",
        paragraph:
          "To celebrate the Holidays, we created a program that got both client and retailers excited. Buy any Tims® at Home product, send someone a free cup of coffee, redeemable at any Tims®&nbsp;restaurant.",
        imageBg: "static/img/work/tim-hortons/homepage.jpg",
        imageBgMobile: "static/img/work/tim-hortons/homepage--mobile.jpg",
        imageType: "image",
        url: "work/tim-hortons.html",
      },
      {
        bgColor: "#d5006c",
        btnHighlightColor: "#d5006c",
        heading: "Jamieson Laboratories",
        headingSub: "Smart Solutions",
        headingSubColor: "#000000",
        paragraph:
          "We worked with Jamieson to leverage the new Smart Solutions branding and develop new packaging to propel the brand from a niche health store brand to a premium brand with mass&nbsp;appeal.",
        imageBg: "static/img/work/jamieson/homepage.jpg",
        imageBgMobile: "static/img/work/jamieson/homepage--mobile.jpg",
        imageType: "image",
        url: "work/jamieson.html",
      },
    ],
    workSelection: [
      {
        id: "green-giant",
        bgColor: "#3c9924",
        imageThumbnail: "static/img/work/green-giant/work-selection.jpg",
        imageThumbnailMobile:
          "static/img/work/green-giant/work-selection--mobile.jpg",
        imageRelated: "static/img/work/green-giant/case-study__related.jpg",
        heading: "Green Giant",
        headingSub: "So good, it's gone.",
        headingSubColor: "#000000",
        paragraph:
          "Empty plates speak volumes in this exciting campaign for Green Giant frozen&nbsp;veggies.",
        url: "work/green-giant.html",
        related: ["tim-hortons", "purex", "lcl", "jamieson"],
      },
      {
        id: "tim-hortons",
        bgColor: "#d9122f",
        imageThumbnail: "static/img/work/tim-hortons/work-selection.jpg",
        imageThumbnailMobile:
          "static/img/work/tim-hortons/work-selection--mobile.jpg",
        imageRelated: "static/img/work/tim-hortons/case-study__related.jpg",
        heading: "Tim Hortons",
        headingSub: "Share a cup of Tims",
        headingSubColor: "#000000",
        paragraph:
          "This Holiday promotion was a true triple win. Driving sales during the busy Holiday season and spreading some joy along the&nbsp;way.",
        url: "work/tim-hortons.html",
        related: ["purex", "green-giant", "lcl", "jamieson"],
      },
      {
        id: "lcl",
        bgColor: "#f47d32",
        imageThumbnail: "static/img/work/lcl/work-selection.jpg",
        imageThumbnailMobile: "static/img/work/lcl/work-selection--mobile.jpg",
        imageRelated: "static/img/work/lcl/case-study__related.jpg",
        heading: "LCL Market Division",
        headingSub: "Market Moments",
        headingSubColor: "#000000",
        paragraph:
          "A customer appreciation event that brought Store Colleagues and shoppers together for epic&nbsp;celebrations.",
        url: "work/lcl-market-division.html",
        related: ["tim-hortons", "green-giant", "purex", "jamieson"],
      },
      {
        id: "purex",
        bgColor: "#01406e",
        imageThumbnail: "static/img/work/purex/work-selection.jpg",
        imageThumbnailMobile:
          "static/img/work/purex/work-selection--mobile.jpg",
        imageRelated: "static/img/work/purex/case-study__related.jpg",
        heading: "Henkel",
        headingSub: "Purex Odour Release Truck",
        headingSubColor: "#17a3cf",
        paragraph:
          "We gave away used hockey gear to prove the odour-fighting power of new Purex Odour Release&nbsp;detergent.",
        url: "work/purex.html",
        related: ["tim-hortons", "green-giant", "lcl", "jamieson"],
      },
      {
        id: "jamieson",
        bgColor: "#d5006c",
        imageThumbnail: "static/img/work/jamieson/work-selection.jpg",
        imageThumbnailMobile:
          "static/img/work/jamieson/work-selection--mobile.jpg",
        imageRelated: "static/img/work/jamieson/case-study__related.jpg",
        heading: "Jamieson Laboratories",
        headingSub: "Smart Solutions",
        headingSubColor: "#000000",
        paragraph:
          "We helped Jamieson turn a niche brand into a premium one with new packaging that has mass&nbsp;appeal.",
        url: "work/jamieson.html",
        related: ["tim-hortons", "green-giant", "lcl", "purex"],
      },
    ],
    contact: {
      carouselImages: [
        {
          url: "static/img/contact/contact-header-1.jpg",
          urlMobile: "static/img/contact/contact-header-1--mobile.jpg",
          label: "",
        },
        {
          url: "static/img/contact/contact-header-2.jpg",
          urlMobile: "static/img/contact/contact-header-2--mobile.jpg",
          label: "",
        },
        {
          url: "static/img/contact/contact-header-3.jpg",
          urlMobile: "static/img/contact/contact-header-3--mobile.jpg",
          label: "",
        },
        {
          url: "static/img/contact/contact-header-4.jpg",
          urlMobile: "static/img/contact/contact-header-4--mobile.jpg",
          label: "",
        },
      ],
    },
    whatWeDo: {
      expertise: [
        [
          {
            icon: "static/img/services/icon-1-1.png",
            label: "Shopper Strategy",
          },
          {
            icon: "static/img/services/icon-1-2.png",
            label: "Conversion Lab Research",
          },
          {
            icon: "static/img/services/icon-1-3.png",
            label: "Multi-vendor programs",
          },
          {
            icon: "static/img/services/icon-1-4.png",
            label: "Retailer intelligence",
          },
          {
            icon: "static/img/services/icon-1-5.png",
            label: "Promotions",
          },
          {
            icon: "static/img/services/icon-1-6.png",
            label: "Display Programs",
          },
          {
            icon: "static/img/services/icon-1-7.png",
            label: "E-Commerce strategy",
          },
          {
            icon: "static/img/services/icon-1-8.png",
            label: "Packaging",
          },
          {
            icon: "static/img/services/icon-1-9.png",
            label: "Partnerships",
          },
        ],
        [
          {
            icon: "static/img/services/icon-2-1.png",
            label: "'SHELF-BACK' XM STRategy",
          },
          {
            icon: "static/img/services/icon-2-2.png",
            label: "Full-service, branded live events",
          },
          {
            icon: "static/img/services/icon-2-3.png",
            label: "Assisted Selling",
          },
          {
            icon: "static/img/services/icon-2-4.png",
            label: "content amplfication toolkits",
          },
          {
            icon: "static/img/services/icon-2-5.png",
            label: "measurment plan strategy & execution",
          },
        ],
        [
          {
            icon: "static/img/services/icon-3-1.png",
            label: "Conversion innovation Strategy",
          },
          {
            icon: "static/img/services/icon-3-2.png",
            label: "Optimizing Brands for e&#8209;commerce",
          },
          {
            icon: "static/img/services/icon-3-3.png",
            label: "Creating<br>Multi-Channel Promotional Engagement",
          },
          {
            icon: "static/img/services/icon-3-4.png",
            label: "Social and Content",
          },
        ],
      ],
    },
  };

  Vue.component("navigation-dock", {
    template: "#navigation-dock-template",
    props: {
      headingText: String,
    },
    data: function () {
      return {
        isMenuOpen: false,
      };
    },
    methods: {
      onMenuButtonClick: function () {
        this.isMenuOpen = !this.isMenuOpen;

        if (this.isMenuOpen) {
          this.$root.$emit("open-menu");
        } else {
          this.$root.$emit("close-menu");
        }
      },
    },
  });

  Vue.component("navigation-overlay", {
    template: "#navigation-overlay-template",
    data: function () {
      return {
        currentPath: "",
        isMenuOpen: false,
      };
    },
    mounted: function () {
      var vm = this;

      this.$root.$on("open-menu", function (e) {
        vm.openMenu(e);
      });

      this.$root.$on("close-menu", function (e) {
        vm.closeMenu(e);
      });

      this.getCurrentPath();
    },
    methods: {
      getCurrentPath: function () {
        var pathArray = window.location.pathname.split("/");
        this.currentPath = pathArray[pathArray.length - 1].split(".")[0];
      },
      openMenu: function () {
        this.isMenuOpen = true;
        document.body.style.overflow = "hidden";
      },
      closeMenu: function () {
        this.isMenuOpen = false;

        if (!document.querySelector("#home")) {
          document.body.style.overflow = "auto";
        }
      },
    },
  });

  Vue.component("footer-component", {
    template: "#footer-template",
    data: function () {
      return {};
    },
    created: function () {},
    mounted: function () {},
    methods: {},
  });

  Vue.component("homepage-content", {
    template: "#homepage-content-template",
    data: function () {
      return {
        bgColor: String,
        imageBgArray: [],
        bgElementArray: [],
        btnDataValue: Number,
        currentBackgroundElement: "",
        currentDataValue: Number,
        hammertime: "",
        heading: String,
        headingSub: String,
        headingSubColor: String,
        homepageData: Array,
        nextBackgroundElement: "",
        paragraph: String,
        url: String,
        timerInterval: "",
      };
    },
    created: function () {
      this.homepageData = fakeData.homepage;
      this.currentDataValue = 0;
      this.btnDataValue = 0;

      for (var i = 0; i < this.homepageData.length; i++) {
        var homepageImage = {};
        homepageImage.desktop = this.homepageData[i].imageBg;
        homepageImage.mobile = this.homepageData[i].imageBgMobile;
        homepageImage.imageType = this.homepageData[i].imageType;
        this.imageBgArray.push(homepageImage);
      }
    },
    mounted: function () {
      this.bgElementArray = document.querySelectorAll(
        ".homepage-bg-image__item"
      );
      this.currentBackgroundElement = this.bgElementArray[0];
      this.currentBackgroundElement.classList.add("active");
      TweenMax.set(".homepage-content-block", {
        className: "+=transition-in",
        delay: 0.5,
      });

      var vm = this;

      var vm = this;
      this.$root.$on("window-resize", function () {
        vm.onWindowResize();
      });

      this.addKeyPressListener();
      this.initSwipe();
      this.initIntervaltimer();

      this.$root.$on("open-menu", function (e) {
        vm.removeMouseWheelEventListener();
        vm.removeKeyPressListener();
        vm.disableSwipe();
      });

      this.$root.$on("close-menu", function (e) {
        vm.onWindowResize();
        vm.addKeyPressListener();
        vm.enableSwipe();
      });
    },
    methods: {
      onWindowResize: function () {
        if (window.innerWidth > 768) {
          this.addMouseWheelEventListener();
          document.body.style.overflow = "hidden";
        } else {
          this.removeMouseWheelEventListener();
          document.body.style.overflow = "auto";
        }
      },
      initIntervaltimer: function () {
        var vm = this;
        this.timerInterval = setInterval(function () {
          if (vm.currentDataValue < vm.imageBgArray.length - 1) {
            vm.onHomepageNavClick(vm.currentDataValue + 1);
          } else {
            vm.onHomepageNavClick(0);
          }
        }, 15000);
      },
      clearIntervalTimer: function () {
        var vm = this;
        clearInterval(vm.timerInterval);
      },
      initSwipe: function () {
        var app = this.$el;
        var vm = this;
        this.hammertime = new Hammer(app);
        this.hammertime.on("swipeleft", function (ev) {
          vm.handleSwipe("left");
        });

        this.hammertime.on("swiperight", function (ev) {
          vm.handleSwipe("right");
        });
      },
      enableSwipe: function () {
        this.hammertime.get("swipe").set({ enable: true });
      },
      disableSwipe: function () {
        this.hammertime.get("swipe").set({ enable: false });
      },
      onHomepageNavClick: function (value) {
        if (this.currentDataValue !== value) {
          this.removeMouseWheelEventListener();
          this.removeKeyPressListener();
          this.clearIntervalTimer();
          this.disableSwipe();

          this.btnDataValue = value;
          this.nextBackgroundElement = this.bgElementArray[value];
          TweenMax.set(".homepage-navigation__list", {
            css: { pointerEvents: "none" },
          });

          if (this.currentDataValue < value) {
            TweenMax.set(this.nextBackgroundElement, {
              className: "+=next-forward",
            });
            TweenMax.set(this.nextBackgroundElement, { className: "+=in" });
            TweenMax.set(this.currentBackgroundElement, {
              className: "+=out-forward",
            });
          } else {
            TweenMax.set(this.nextBackgroundElement, {
              className: "+=next-back",
            });
            TweenMax.set(this.nextBackgroundElement, { className: "+=in" });
            TweenMax.set(this.currentBackgroundElement, {
              className: "+=out-back",
            });
          }

          var vm = this;
          TweenMax.to(".homepage-content-block", 0.9, {
            className: "-=transition-in",
            onComplete: vm.updateCurrentDataValue,
            onCompleteParams: [value],
          });
        }
      },
      updateCurrentDataValue: function (value) {
        this.currentDataValue = value;
        this.nextBackgroundElement.classList.remove("next-forward");
        this.nextBackgroundElement.classList.remove("next-back");
        this.nextBackgroundElement.classList.remove("in");
        this.currentBackgroundElement.classList.remove("active");
        this.currentBackgroundElement.classList.remove("out-forward");
        this.currentBackgroundElement.classList.remove("out-back");
        this.currentBackgroundElement = this.nextBackgroundElement;
        this.currentBackgroundElement.classList.add("active");
        TweenMax.set(".homepage-navigation__list", {
          css: { pointerEvents: "all" },
        });
        TweenMax.set(".homepage-content-block", {
          className: "+=transition-in",
        });
        this.onWindowResize();
        this.addKeyPressListener();
        this.enableSwipe();
        this.initIntervaltimer();
      },
      addMouseWheelEventListener: function () {
        window.addEventListener("wheel", this.handleWheel);
      },
      removeMouseWheelEventListener: function () {
        window.removeEventListener("wheel", this.handleWheel);
      },
      handleWheel: function (e) {
        var countValue;

        if (e.deltaY < 0) {
          if (this.currentDataValue > 0) {
            countValue = this.currentDataValue - 1;
          } else {
            countValue = this.imageBgArray.length - 1;
          }

          this.onHomepageNavClick(countValue);
        }

        if (e.deltaY > 0) {
          if (this.currentDataValue < this.imageBgArray.length - 1) {
            countValue = this.currentDataValue + 1;
          } else {
            countValue = 0;
          }

          this.onHomepageNavClick(countValue);
        }
      },
      handleSwipe: function (direction) {
        var countValue;

        if (direction === "left") {
          if (this.currentDataValue < this.imageBgArray.length - 1) {
            countValue = this.currentDataValue + 1;
          } else {
            countValue = 0;
          }
        } else if (direction === "right") {
          if (this.currentDataValue > 0) {
            countValue = this.currentDataValue - 1;
          } else {
            countValue = this.imageBgArray.length - 1;
          }
        }

        this.onHomepageNavClick(countValue);
      },
      addKeyPressListener: function () {
        var vm = this;
        document.addEventListener("keydown", vm.handleKeyPress);
      },
      removeKeyPressListener: function () {
        var vm = this;
        document.removeEventListener("keydown", vm.handleKeyPress);
      },
      handleKeyPress: function (e) {
        var countValue;

        if (e.keyCode === 37) {
          if (this.currentDataValue > 0) {
            countValue = this.currentDataValue - 1;
          } else {
            countValue = this.imageBgArray.length - 1;
          }

          this.onHomepageNavClick(countValue);
        } else if (e.keyCode === 39) {
          if (this.currentDataValue < this.imageBgArray.length - 1) {
            countValue = this.currentDataValue + 1;
          } else {
            countValue = 0;
          }

          this.onHomepageNavClick(countValue);
        }
      },
    },
    watch: {
      currentDataValue: function () {
        this.bgColor = this.homepageData[this.currentDataValue].bgColor;
        this.heading = this.homepageData[this.currentDataValue].heading;
        this.headingSub = this.homepageData[this.currentDataValue].headingSub;
        this.headingSubColor =
          this.homepageData[this.currentDataValue].headingSubColor;
        this.paragraph = this.homepageData[this.currentDataValue].paragraph;
        this.url = this.homepageData[this.currentDataValue].url;

        document.querySelector("#home").style.backgroundColor = this.bgColor;
      },
    },
  });

  Vue.component("work-selection", {
    template: "#work-selection-template",
    props: {},
    data: function () {
      return {
        currentCount: 0,
        disableHover: false,
        perPage: 0,
        totalCount: 0,
        transitionIn: false,
        transitionOut: false,
        transitionOutPrev: false,
        workSelectionData: [],
        workArray: [],
      };
    },
    created: function () {
      this.totalCount = fakeData.workSelection.length;
    },
    mounted: function () {
      var vm = this;
      this.$root.$on("window-resize", function () {
        vm.onWindowResize();
      });
    },
    methods: {
      updateWorkSelection: function () {
        if (!(this.currentCount + this.perPage < this.totalCount)) {
          this.currentCount = this.totalCount - this.perPage;
        }

        this.workSelectionData = fakeData.workSelection.slice(
          this.currentCount,
          this.currentCount + this.perPage
        );
      },
      onPrevClick: function () {
        this.disableHover = true;
        this.transitionOutPrev = true;
        this.transitionOut = true;

        this.workArray = document.querySelectorAll(
          ".work-selection__container"
        );

        var timeDelay = (0.075 * (this.workArray.length - 1) + 0.3) * 1000 - 50;

        var vm = this;
        for (var i = 0; i < this.workArray.length; i++) {
          TweenMax.set(this.workArray[i], {
            className: "+=transitionOut",
            delay: 0.075 * i,
          });
        }

        setTimeout(function () {
          if (vm.currentCount - vm.perPage >= 0) {
            vm.currentCount -= vm.perPage;
          } else {
            vm.currentCount = 0;
          }

          vm.transitionIn = false;
          vm.transitionOutPrev = false;
          vm.updateWorkSelection();
          vm.workArray = document.querySelectorAll(
            ".work-selection__container"
          );

          for (var ii = 0; ii < vm.workArray.length; ii++) {
            TweenMax.set(vm.workArray[ii], {
              className: "-=transitionOut",
              delay: 0.075 * ii,
            });
          }
        }, timeDelay);

        timeDelay =
          timeDelay + (0.075 * (this.workArray.length - 1) + 0.3) * 1000 + 100;

        setTimeout(function () {
          vm.transitionIn = false;
          vm.disableHover = false;
        }, timeDelay);
      },
      onNextClick: function () {
        this.disableHover = true;
        this.transitionOut = true;

        this.workArray = document.querySelectorAll(
          ".work-selection__container"
        );

        var timeDelay = (0.075 * (this.workArray.length - 1) + 0.3) * 1000 - 50;

        var vm = this;
        for (var i = 0; i < this.workArray.length; i++) {
          TweenMax.set(this.workArray[vm.perPage - 1 - i], {
            className: "+=transitionOut",
            delay: 0.075 * i,
          });
        }

        setTimeout(function () {
          if (vm.currentCount + vm.perPage <= vm.totalCount) {
            vm.currentCount += vm.perPage;
          } else {
            vm.currentCount = vm.totalCount;
          }

          vm.transitionIn = true;
          vm.updateWorkSelection();
          vm.workArray = document.querySelectorAll(
            ".work-selection__container"
          );

          for (var ii = 0; ii < vm.workArray.length; ii++) {
            TweenMax.set(vm.workArray[vm.perPage - 1 - ii], {
              className: "-=transitionOut",
              delay: 0.075 * ii,
            });
          }
        }, timeDelay);

        timeDelay =
          timeDelay + (0.075 * (this.workArray.length - 1) + 0.3) * 1000 + 100;

        setTimeout(function () {
          vm.transitionIn = false;
          vm.disableHover = false;
        }, timeDelay);
      },
      onWindowResize: function () {
        if (window.innerWidth > 1500) {
          this.perPage = 5;
        } else if (window.innerWidth > 1280) {
          this.perPage = 4;
        } else if (window.innerWidth > 768) {
          this.perPage = 3;
        } else if (window.innerWidth > 640) {
          this.perPage = 2;
        } else {
          this.perPage = this.totalCount;
        }
      },
    },
    watch: {
      perPage: function () {
        this.updateWorkSelection();
      },
    },
  });

  Vue.component("case-studies-related", {
    template: "#case-studies-related-template",
    props: {
      limit: String,
      title: String,
    },
    data: function () {
      return {
        caseStudiesRelatedData: [],
        currentData: {},
        isCarouselActive: false,
      };
    },
    created: function () {
      this.currentData = this.findObjectByKey(
        fakeData.workSelection,
        "id",
        this.title
      );
      this.init();
    },
    mounted: function () {
      var vm = this;
      this.$root.$on("window-resize", function () {
        vm.onWindowResize();
      });
    },
    methods: {
      init: function () {
        for (var i = 0; i < this.currentData.related.length; i++) {
          this.caseStudiesRelatedData[i] = this.findObjectByKey(
            fakeData.workSelection,
            "id",
            this.currentData.related[i]
          );
        }

        this.caseStudiesRelatedData = this.caseStudiesRelatedData
          .sort(function () {
            return Math.random() - Math.random();
          })
          .slice(0, 3);
      },
      findObjectByKey: function (array, key, value) {
        for (var i = 0; i < array.length; i++) {
          if (array[i][key].toString().toLowerCase() === value) {
            return array[i];
          }
        }
        return null;
      },
      onWindowResize: function () {
        if (window.innerWidth > 768) {
          if ($(".case-studies-related") && this.isCarouselActive) {
            $(".case-studies-related").slick("unslick");
            this.isCarouselActive = false;
          }
        } else {
          if ($(".case-studies-related") && !this.isCarouselActive) {
            this.initCarousel();
            this.isCarouselActive = true;
          }
        }
      },
      initCarousel: function () {
        if ($(".case-studies-related")) {
          setTimeout(function () {
            $(".case-studies-related").slick({
              speed: 1000,
              slidesToShow: 2,
            });
          }, 100);

          this.isCarouselActive = true;
        }
      },
    },
  });

  Vue.component("contact-carousel", {
    template: "#contact-carousel-template",
    data: function () {
      return {
        carousel: "",
        contactImages: [],
        carouselVisible: true,
      };
    },
    created: function () {
      this.contactImages = fakeData.contact.carouselImages;
    },
    mounted: function () {
      this.initCarousel();
    },
    methods: {
      initCarousel: function () {
        $(".contact-carousel__container").slick({
          arrows: false,
          autoplay: true,
          autoplaySpeed: 1000,
          slidesToShow: 1,
          pauseOnFocus: false,
          pauseOnHover: false,
          infinite: true,
          speed: 5000,
          fade: true,
        });
      },
      destroyCarousel: function () {
        this.carousel = null;
        this.carouselVisible = false;
      },
      getWidth: function () {
        return Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
        );
      },
    },
  });

  Vue.component("contact-form", {
    template: "#contact-form-template",
    data: function () {
      return {
        activeAddress: "toronto",
        contactImages: [],
        formCompany: "",
        formEmail: "",
        formName: "",
        formPhone: "",
        formMessage: "",
        formCompanyError: false,
        formEmailError: false,
        formNameError: false,
        formPhoneError: false,
        map: "",
        formActive: true,
      };
    },
    created: function () {},
    mounted: function () {
      this.initIntroAnims();

      var vm = this;
      setTimeout(function () {
        vm.initMap();
      }, 1000);
    },
    methods: {
      initIntroAnims: function () {
        this.scrollController = new ScrollMagic.Controller({
          /*addIndicators: true*/
        });

        var timingDelay = 0.4;
        var delayOffset = 0.25;

        TweenMax.set(".contact-get-in-touch__heading", {
          className: "+=transition-in",
          delay: timingDelay,
        });
        TweenMax.set(".contact-get-in-touch__paragraph", {
          className: "+=transition-in",
          delay: (timingDelay += 0.2),
        });
        TweenMax.set(".contact-get-in-touch__list", {
          className: "+=transition-in",
          delay: (timingDelay += 0.2),
        });
        TweenMax.set(".contact-form__heading", {
          className: "+=transition-in",
          delay: (timingDelay += delayOffset),
        });
        TweenMax.set(".contact-form-fields", {
          className: "+=transition-in",
          delay: (timingDelay += delayOffset),
        });

        TweenMax.set(
          document.querySelectorAll(".contact-address__container")[0],
          { className: "+=transition-in", delay: (timingDelay += delayOffset) }
        );

        TweenMax.set(
          document.querySelectorAll(".contact-address__container")[2],
          { className: "+=transition-in", delay: timingDelay }
        );

        TweenMax.set(
          document.querySelectorAll(".contact-address__container")[1],
          { className: "+=transition-in", delay: (timingDelay += delayOffset) }
        );

        TweenMax.set(
          document.querySelectorAll(".contact-address__container")[3],
          { className: "+=transition-in", delay: timingDelay }
        );
      },
      initMap: function () {
        var myLatLng = { lat: 43.670557, lng: -79.384055 };
        var map = new google.maps.Map(
          document.querySelector(".contact-details-map"),
          {
            center: myLatLng,
            disableDefaultUI: true,
            zoomControl: false,
            zoom: 19,
            styles: [
              {
                elementType: "geometry",
                stylers: [
                  {
                    color: "#212121",
                  },
                ],
              },
              {
                elementType: "labels.icon",
                stylers: [
                  {
                    color: "#c9c9c9",
                  },
                  {
                    visibility: "simplified",
                  },
                ],
              },
              {
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#757575",
                  },
                ],
              },
              {
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#212121",
                  },
                ],
              },
              {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#757575",
                  },
                ],
              },
              {
                featureType: "administrative.country",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#9e9e9e",
                  },
                ],
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#bdbdbd",
                  },
                ],
              },
              {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#252525",
                  },
                ],
              },
              {
                featureType: "landscape",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#363636",
                  },
                ],
              },
              {
                featureType: "poi",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#3d3d3d",
                  },
                ],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#757575",
                  },
                ],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#393939",
                  },
                ],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#616161",
                  },
                ],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#1b1b1b",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#4e4e4e",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#bbbbbb",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#3c3c3c",
                  },
                ],
              },
              {
                featureType: "road.highway.controlled_access",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#4e4e4e",
                  },
                ],
              },
              {
                featureType: "transit",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#757575",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#3d3d3d",
                  },
                ],
              },
            ],
          }
        );

        var image = {
          url: "static/img/contact/contact-map-marker.svg",
          size: new google.maps.Size(200, 200),
          anchor: new google.maps.Point(100, 185),
          scaledSize: new google.maps.Size(200, 200),
        };

        new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: myLatLng,
          icon: image,
        });
      },
      onAddressHover: function (value) {
        this.activeAddress = value;
      },
      formSubmit: function () {
        if (this.formName === "") {
          this.formNameError = true;
        } else {
          this.formNameError = false;
        }

        if (this.formEmail === "" || !this.validateEmail(this.formEmail)) {
          this.formEmailError = true;
        } else {
          this.formEmailError = false;
        }

        if (this.formPhone === "") {
          this.formPhoneError = true;
        } else {
          this.formPhoneError = false;
        }

        if (
          !this.formNameError &&
          !this.formEmailError &&
          !this.formPhoneError
        ) {
          this.formActive = false;

          $.ajax({
            url: "/email/send",
            method: "POST",
            data: {
              Body: this.formMessage,
              Company: this.formCompany,
              Name: this.formName,
              Telephone: this.formPhone,
              FromEmailAddress: this.formEmail,
              Subject: "Email from website",
            },
            dataType: "json",
          }).done(function (data) {
            //console.log(data);
          });
        }
      },
      validateEmail: function (email) {
        var re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
    },
  });

  Vue.component("case-studies-contact", {
    template: "#case-studies-contact",
  });

  Vue.component("about", {
    template: "#about-template",
    mounted: function () {
      this.initIntroAnims();
    },
    methods: {
      initIntroAnims: function () {
        this.scrollController = new ScrollMagic.Controller({
          /*addIndicators: true*/
        });
        TweenMax.set(".about-header__heading", {
          className: "+=transition-in",
          delay: 0.4,
        });

        var timingDelay = 0.8;
        var delayOffet = 0.25;

        TweenMax.set(
          document
            .querySelectorAll(".about-body__wrapper")[0]
            .querySelector(".about-body__heading"),
          { className: "+=transition-in", delay: timingDelay }
        );

        TweenMax.set(
          document
            .querySelectorAll(".about-body__wrapper")[0]
            .querySelector(".about-body__paragraph"),
          { className: "+=transition-in", delay: (timingDelay += delayOffet) }
        );

        TweenMax.set(
          document
            .querySelectorAll(".about-body__wrapper")[1]
            .querySelector(".about-body__heading"),
          { className: "+=transition-in", delay: (timingDelay += delayOffet) }
        );

        TweenMax.set(
          document
            .querySelectorAll(".about-body__wrapper")[1]
            .querySelector(".about-body__paragraph"),
          { className: "+=transition-in", delay: (timingDelay += delayOffet) }
        );

        TweenMax.set(
          document
            .querySelectorAll(".about-body__wrapper")[2]
            .querySelector(".about-body__heading"),
          { className: "+=transition-in", delay: (timingDelay += delayOffet) }
        );

        TweenMax.set(
          document
            .querySelectorAll(".about-body__wrapper")[2]
            .querySelector(".about-body-leadership__list"),
          { className: "+=transition-in", delay: (timingDelay += delayOffet) }
        );

        var hotSpotArray = document.querySelectorAll(
          ".about-header__hot-spot-image"
        );

        for (var i = 0; hotSpotArray.length > i; i++) {
          TweenMax.set(hotSpotArray[i], {
            className: "+=transition-in",
            delay: (timingDelay += delayOffet),
          });
        }
      },
    },
  });

  Vue.component("services", {
    template: "#services-template",
    data: function () {
      return {
        shopperData: fakeData.whatWeDo.expertise[0],
        experientialData: fakeData.whatWeDo.expertise[1],
        digitalData: fakeData.whatWeDo.expertise[2],
        scrollController: "",
        triggerPoint: "0.75",
        isCarouselActive: false,
      };
    },
    mounted: function () {
      this.scrollController = new ScrollMagic.Controller({
        /*addIndicators: true*/
      });

      TweenMax.set(".services-header__heading-wrapper", {
        className: "+=transition-in",
        delay: 0.4,
      });

      var vm = this;
      setTimeout(function () {
        vm.initScrollAnims();
      }, 700);
    },
    methods: {
      initScrollAnims: function () {
        var expertiseArrays = document.querySelectorAll(".services-expertise ");
        var vm = this;

        for (var i = 0; i < expertiseArrays.length; i++) {
          var expertiseTimeline = new TimelineMax();

          var delayTime = 0;
          var delayOffset = 0.25;

          expertiseTimeline.set(
            expertiseArrays[i].querySelector(
              ".services-expertise-header__heading"
            ),
            { className: "+=transition-in" },
            delayTime
          );

          var paragraphArray = expertiseArrays[i].querySelectorAll(
            ".services-expertise-header__paragraph"
          );

          expertiseTimeline.set(
            paragraphArray[0],
            { className: "+=transition-in" },
            (delayTime += delayOffset)
          );

          if (paragraphArray[1]) {
            expertiseTimeline.set(
              paragraphArray[1],
              { className: "+=transition-in" },
              delayTime
            );
          }

          var headingIconArray = expertiseArrays[i].querySelectorAll(
            ".services-expertise-array__heading-icon"
          );

          expertiseTimeline.set(
            headingIconArray[0],
            { className: "+=anim-in" },
            (delayTime += delayOffset += 0.1)
          );
          expertiseTimeline.set(
            headingIconArray[1],
            { className: "+=anim-in" },
            delayTime
          );

          var expertiseIconArray = expertiseArrays[i].querySelectorAll(
            ".services-expertise-array__list-item"
          );

          var iconOffet = delayTime + 0.6;

          for (var iiii = 0; iiii < expertiseIconArray.length; iiii++) {
            expertiseTimeline.set(
              expertiseIconArray[iiii].querySelector(
                ".services-expertise-array__icon-wrapper"
              ),
              { className: "+=anim-in" },
              (delayTime += delayOffset)
            );
          }

          for (var iiiii = 0; iiiii < expertiseIconArray.length; iiiii++) {
            expertiseTimeline.set(
              expertiseIconArray[iiiii].querySelector(
                ".services-expertise-array__label"
              ),
              { className: "+=anim-in" },
              (iconOffet += delayOffset)
            );
          }

          var expertiseScene = new ScrollMagic.Scene({
            triggerElement: expertiseArrays[i],
            triggerHook: vm.triggerPoint,
            reverse: false,
          })
            .setTween(expertiseTimeline)
            .addTo(vm.scrollController);
        }

        var contactTimeline = new TimelineMax();
        contactTimeline.set(
          document.querySelector(".services-contact__title"),
          { className: "+=transition-in" },
          0
        );
        contactTimeline.set(
          document.querySelector(".services-contact__cta"),
          { className: "+=transition-in" },
          0.3
        );

        var contactScene = new ScrollMagic.Scene({
          triggerElement: document.querySelector(".services-contact"),
          triggerHook: "0.9",
          reverse: false,
        })
          .setTween(contactTimeline)
          .addTo(vm.scrollController);
      },
    },
  });

  Vue.component("case-studies", {
    template: "#case-studies-template",
    data: function () {
      return {
        scrollController: "",
      };
    },
    mounted: function () {
      this.scrollController = new ScrollMagic.Controller({
        /*addIndicators: true*/
      });

      TweenMax.set(".case-studies-hero__image", {
        className: "+=transition-in",
        delay: 0.5,
      });
      TweenMax.set(".case-studies-hero__heading-container", {
        className: "+=transition-in",
        delay: 0.9,
      });
      TweenMax.set(".case-studies-hero__heading", {
        className: "+=transition-in",
        delay: 1.15,
      });
      TweenMax.set(".case-studies-hero__sub-heading", {
        className: "+=transition-in",
        delay: 1.4,
      });
      TweenMax.set(".case-studies-hero__paragraph", {
        className: "+=transition-in",
        delay: 1.65,
      });
      TweenMax.set(".case-studies-hero__hr", {
        className: "+=transition-in",
        delay: 2,
      });

      var vm = this;
      this.$root.$on("window-resize", function () {
        vm.onWindowResize();
      });

      setTimeout(function () {
        vm.initScrollAnims();
      }, 1000);
    },
    methods: {
      initScrollAnims: function () {
        var vm = this;
        var twoColumnArray = document.querySelectorAll(
          ".case-studies-two-column"
        );

        for (var i = 0; i < twoColumnArray.length; i++) {
          var twoColumnTimeline = new TimelineMax();
          var transitionTime = 0;

          if (
            twoColumnArray[i].querySelector(
              ".case-studies-two-column__image-container--right"
            )
          ) {
            twoColumnTimeline.set(
              twoColumnArray[i].querySelector(
                ".case-studies-two-column__image-container--right"
              ),
              { className: "+=transition-in" },
              transitionTime
            );
          }

          if (
            twoColumnArray[i].querySelector(
              ".case-studies-two-column__image-container--left"
            )
          ) {
            twoColumnTimeline.set(
              twoColumnArray[i].querySelector(
                ".case-studies-two-column__image-container--left"
              ),
              { className: "+=transition-in" },
              transitionTime
            );
          }

          twoColumnTimeline.set(
            twoColumnArray[i].querySelector(
              ".case-studies-two-column__content-wrapper"
            ),
            { className: "+=transition-in" },
            (transitionTime += 0.4)
          );

          if (
            twoColumnArray[i].querySelector(
              ".case-studies-two-column__content-wrapper--image-wrapper"
            )
          ) {
            twoColumnTimeline.set(
              twoColumnArray[i].querySelector(
                ".case-studies-two-column__content-wrapper--image-wrapper"
              ),
              { className: "+=transition-in" },
              (transitionTime += 0.3)
            );
          }

          var twoColumnScene = new ScrollMagic.Scene({
            triggerElement: twoColumnArray[i],
            triggerHook: "0.6",
            reverse: false,
          })
            .setTween(twoColumnTimeline)
            .addTo(vm.scrollController);
        }

        var fullWidthArray = document.querySelectorAll(
          ".case-studies-full-width__image"
        );

        for (var ii = 0; ii < fullWidthArray.length; ii++) {
          var fullWidthTimeline = new TimelineMax();

          fullWidthTimeline.set(
            fullWidthArray[ii],
            { className: "+=transition-in" },
            0
          );

          var fullwidthScene = new ScrollMagic.Scene({
            triggerElement: fullWidthArray[ii],
            triggerHook: "0.6",
            reverse: false,
          })
            .setTween(fullWidthTimeline)
            .addTo(vm.scrollController);
        }

        if (document.querySelector(".case-studies-video")) {
          var videoTimeline = new TimelineMax();

          videoTimeline.set(
            document.querySelector(".case-studies-video"),
            { className: "+=transition-in" },
            0
          );

          var videoScene = new ScrollMagic.Scene({
            triggerElement: document.querySelector(".case-studies-video"),
            triggerHook: "0.6",
            reverse: false,
          })
            .setTween(videoTimeline)
            .addTo(vm.scrollController);
        }

        var contactTimeline = new TimelineMax();
        contactTimeline.set(
          document.querySelector(".case-studies-contact__heading"),
          { className: "+=transition-in" },
          0
        );
        contactTimeline.set(
          document.querySelector(".case-studies-contact__cta"),
          { className: "+=transition-in" },
          0.5
        );

        var contactScene = new ScrollMagic.Scene({
          triggerElement: document.querySelector(".case-studies-contact"),
          triggerHook: "0.6",
          reverse: false,
        })
          .setTween(contactTimeline)
          .addTo(vm.scrollController);
      },
      initCollageCarousel: function () {
        if ($(".case-studies-carousel")) {
          $(".case-studies-carousel").slick({
            speed: 2000,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 1500,
            slidesToShow: 1,
            pauseOnHover: false,
            adaptiveHeight: true,
          });

          this.isCarouselActive = true;
        }
      },
      onWindowResize: function () {
        if (window.innerWidth > 768) {
          if ($(".case-studies-carousel") && this.isCarouselActive) {
            $(".case-studies-carousel").slick("unslick");
            this.isCarouselActive = false;
          }
        } else {
          if ($(".case-studies-carousel") && !this.isCarouselActive) {
            this.initCollageCarousel();
            this.isCarouselActive = true;
          }
        }
      },
    },
  });

  var app = new Vue({
    el: "#six-degrees",
    mounted: function () {
      window.onresize = this.onWindowResize;
      this.onWindowResize();
    },
    methods: {
      onWindowResize: function () {
        this.$root.$emit("window-resize");
      },
    },
  });
})(this);
