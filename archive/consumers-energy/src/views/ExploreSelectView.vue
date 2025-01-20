<template>
  <section class="ce-explore-select" :style="cssProps" @wheel.prevent="onWheelScroll">
    <div class="ce-explore-select__content">
      <h1 class="ce-explore-select__heading">{{ model.Heading }}</h1>
    </div>

    <div class="ce-explore-select__slider-container">
      <swiper-container
        class="ce-explore-select__slider"
        @swiperslidechange="onSlideChange"
        loop="true"
      >
        <swiper-slide class="ce-explore-select__slide--a"></swiper-slide>
        <swiper-slide class="ce-explore-select__slide--b"></swiper-slide>
        <swiper-slide class="ce-explore-select__slide--c"></swiper-slide>
      </swiper-container>
    </div>

    <PopUpDialogueInfo
      v-if="model.Tutorial?.Description"
      arrowPos="bottomCenter"
      :animationDelay="Number(0.8)"
      animationDirection="up"
      :description="model.Tutorial?.Description"
      :heading="model.Tutorial?.Heading"
      :isActive="isTutorialtalAvatarActive"
      :posBottom="isMobile ? '22vh' : '20vh'"
      posLeft="50%"
      posRight="auto"
      posTop="auto"
      posX="-50%"
      posY="0"
      :ZIndex="Number(9)"
    />

    <div class="ce-explore-select__navigation">
      <ul class="ce-explore-select__navigation-list">
        <li
          class="ce-explore-select__navigation-item"
          :class="{
            'ce-explore-select__navigation-item--pos-a': navPosArr[navPosCurrent][0] === 'a',
            'ce-explore-select__navigation-item--pos-b': navPosArr[navPosCurrent][1] === 'a',
            'ce-explore-select__navigation-item--pos-c': navPosArr[navPosCurrent][2] === 'a'
          }"
        >
          <router-link
            v-if="navPosCurrent === 0"
            :to="{ name: 'ResidentialExterior' }"
            class="ce-explore-select__navigation-btn"
            aria-label="Residential"
            type="button"
          >
            <IconResidential class="ce-explore-select__navigation-icon" />
          </router-link>

          <button
            v-else
            @click="onNavClick(0)"
            class="ce-explore-select__navigation-btn"
            aria-label="Residential"
            type="button"
          >
            <IconResidential class="ce-explore-select__navigation-icon" />
          </button>
        </li>

        <li
          class="ce-explore-select__navigation-item"
          :class="{
            'ce-explore-select__navigation-item--pos-a': navPosArr[navPosCurrent][0] === 'b',
            'ce-explore-select__navigation-item--pos-b': navPosArr[navPosCurrent][1] === 'b',
            'ce-explore-select__navigation-item--pos-c': navPosArr[navPosCurrent][2] === 'b'
          }"
        >
          <router-link
            v-if="navPosCurrent === 1"
            :to="{ name: 'SmallBusinessExterior' }"
            class="ce-explore-select__navigation-btn"
            aria-label="Small Business"
            type="button"
          >
            <IconSmallBusiness class="ce-explore-select__navigation-icon" />
          </router-link>

          <button
            v-else
            @click="onNavClick(1)"
            class="ce-explore-select__navigation-btn"
            aria-label="Residential"
            type="button"
          >
            <IconSmallBusiness class="ce-explore-select__navigation-icon" />
          </button>
        </li>

        <li
          class="ce-explore-select__navigation-item"
          :class="{
            'ce-explore-select__navigation-item--pos-a': navPosArr[navPosCurrent][0] === 'c',
            'ce-explore-select__navigation-item--pos-b': navPosArr[navPosCurrent][1] === 'c',
            'ce-explore-select__navigation-item--pos-c': navPosArr[navPosCurrent][2] === 'c'
          }"
        >
          <router-link
            v-if="navPosCurrent === 2"
            :to="{ name: 'LargeBusinessExterior' }"
            class="ce-explore-select__navigation-btn"
            aria-label="Large Business"
            type="button"
          >
            <IconLargeBusiness class="ce-explore-select__navigation-icon" />
          </router-link>

          <button
            v-else
            @click="onNavClick(2)"
            class="ce-explore-select__navigation-btn"
            aria-label="Residential"
            type="button"
          >
            <IconLargeBusiness class="ce-explore-select__navigation-icon" />
          </button>
        </li>
      </ul>

      <div class="ce-explore-select__link-container">
        <div v-if="navPosCurrent === 0" class="ce-explore-select__link">
          {{ model.Locations?.Residential?.Heading }}
        </div>

        <div v-if="navPosCurrent === 1" class="ce-explore-select__link">
          {{ model.Locations?.SmallBusiness?.Heading }}
        </div>

        <div v-if="navPosCurrent === 2" class="ce-explore-select__link">
          {{ model.Locations?.LargeBusiness?.Heading }}
        </div>
      </div>
    </div>

    <router-link :to="{ name: 'Home' }" class="ce-explore-select__replay-video-link"
      >{{ model?.ReplayLabel }}
      <IconReplay class="ce-explore-select__replay-video-link--icon" />
    </router-link>

    <PopUpTutorialAvatar
      @tutorial-avatar-click="closeAllElements"
      avatar="a"
      :delay="Number(2)"
      :delayOutro="Number(0)"
      :heightPerc="isMobile ? '75%' : '70%'"
      imageHeight="105%"
      :isActive="isTutorialtalAvatarActive"
      posBottom="0"
      posLeft="50%"
      posRight="auto"
      posX="-50%"
      :zindex="Number(8)"
    />

    <BackgroundDarkenOverlay
      @background-darken-overlay-click="closeAllElements"
      :zindex="Number(3)"
      :isActive="isBackgroundDarkenOverlayActive"
    />

    <div class="ce-explore-select__image-preload-container" aria-hidden="true">
      <BackgroundSceneImage
        @asset-loading="$emit('asset-loading')"
        @asset-loaded="$emit('asset-loaded')"
        :url="model?.Locations?.Residential?.Image?.Url?.Desktop"
      />

      <BackgroundSceneImage
        @asset-loading="$emit('asset-loading')"
        @asset-loaded="$emit('asset-loaded')"
        :url="model?.Locations?.SmallBusiness?.Image?.Url?.Desktop"
      />

      <BackgroundSceneImage
        @asset-loading="$emit('asset-loading')"
        @asset-loaded="$emit('asset-loaded')"
        :url="model?.Locations?.LargeBusiness?.Image?.Url?.Desktop"
      />
    </div>
  </section>
</template>

<script lang="ts">
import BackgroundDarkenOverlay from '../components/BackgroundDarkenOverlay.vue'
import BackgroundSceneImage from '../components/BackgroundSceneImage.vue'
import IconReplay from '../components/icons/IconReplay.vue'
import IconResidential from '../components/icons/IconResidential.vue'
import IconSmallBusiness from '../components/icons/IconSmallBusiness.vue'
import IconLargeBusiness from '../components/icons/IconLargeBusiness.vue'
import PopUpTutorialAvatar from '../components/PopUpTutorialAvatar.vue'
import PopUpDialogueInfo from '../components/PopUpDialogueInfo.vue'
import { register } from 'swiper/element/bundle'
import { useModelStore } from '../stores/model'
import { useTutorialViewedStore } from '../stores/tutorialsViewed'

register()

export default {
  setup() {
    const model = useModelStore().model.ExploreSelectView
    let isTutorialViewed = useTutorialViewedStore().tutorialLocationSelectorViewed

    return {
      isTutorialViewed,
      model
    }
  },
  data() {
    return {
      navPosCurrent: 0,
      navPosArr: [
        ['a', 'b', 'c'],
        ['b', 'c', 'a'],
        ['c', 'a', 'b']
      ],
      isTutorialtalAvatarActive: false,
      isBackgroundDarkenOverlayActive: false,
      isMobile: false
    }
  },
  components: {
    BackgroundDarkenOverlay,
    BackgroundSceneImage,
    IconReplay,
    IconResidential,
    IconSmallBusiness,
    IconLargeBusiness,
    PopUpTutorialAvatar,
    PopUpDialogueInfo
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    this.initTutorial()
  },
  methods: {
    initTutorial() {
      if (!this.isTutorialViewed) {
        this.isTutorialtalAvatarActive = true
        this.isBackgroundDarkenOverlayActive = true

        setTimeout(() => {
          this.isTutorialViewed = true
        }, 2500)
      }
    },
    closeAllElements() {
      if (this.isTutorialViewed) {
        this.isTutorialtalAvatarActive = false
        this.isBackgroundDarkenOverlayActive = false
      }
    },
    onSlideChange(event: CustomEvent) {
      if (this.isTutorialViewed) {
        this.navPosCurrent = event.detail[0].realIndex
        this.closeAllElements()
      }
    },
    onNavClick(index: number) {
      const swiperEl = document.querySelector('swiper-container')

      if (index === 0 && swiperEl?.swiper.realIndex === 2) {
        swiperEl?.swiper.slideNext()
      } else if (index === 2 && swiperEl?.swiper.realIndex === 0) {
        swiperEl?.swiper.slidePrev()
      } else if (index > swiperEl?.swiper.realIndex) {
        swiperEl?.swiper.slideNext()
      } else {
        swiperEl?.swiper.slidePrev()
      }
    },
    onWheelScroll(e: WheelEvent) {
      const swiperEl = document.querySelector('swiper-container')

      if (this.isTutorialViewed) {
        if (e.deltaY < 0) {
          swiperEl?.swiper.slidePrev()
        } else {
          swiperEl?.swiper.slideNext()
        }
      }
    },
    onResize() {
      this.isMobile = window.innerWidth <= 640 ? true : false
    }
  },
  computed: {
    cssProps() {
      return {
        '--background_a':
          'url(' + this.model?.Locations?.Residential?.Image?.Url?.Desktop + ')' || 'transparent',
        '--background_a--mobile':
          'url(' + this.model?.Locations?.Residential?.Image?.Url?.Mobile + ')' || 'transparent',
        '--background_b':
          'url(' + this.model?.Locations?.SmallBusiness?.Image?.Url?.Desktop + ')' || 'transparent',
        '--background_b--mobile':
          'url(' + this.model?.Locations?.SmallBusiness?.Image?.Url?.Mobile + ')' || 'transparent',
        '--background_c':
          'url(' + this.model?.Locations?.LargeBusiness?.Image?.Url?.Desktop + ')' || 'transparent',
        '--background_c--mobile':
          'url(' + this.model?.Locations?.LargeBusiness?.Image?.Url?.Mobile + ')' || 'transparent'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ce-explore-select {
  height: 100%;
  padding: 80px 0 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;

  @media screen and (max-width: 640px) {
    padding: 50px 0 0;
  }
}

.ce-explore-select__content {
  color: var(--color-font-main);
  margin: 0 auto;
  padding: 24px 0 0;
  text-align: center;
  z-index: 5;

  @media screen and (max-width: 640px) {
    padding: 48px 0 0;
  }
}

.ce-explore-select__heading {
  font-size: 4vh;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  padding: 0 35px;
  text-shadow: 0px 1px 8px rgba(0, 0, 0, 0.9);
}

.ce-explore-select__link-container {
  align-items: center;
  bottom: 0.5vh;
  display: flex;
  height: 4vh;
  left: 50%;
  position: absolute;
  transform: translate3d(-50%, 0, 0);
  -webkit-transform: translate3d(-50%, 0, 0);
}

.ce-explore-select__link {
  color: #ffffff;
  display: block;
  //font-size: 1.3rem;
  font-size: 1.5vh;
  font-weight: 700;
  letter-spacing: 0.15px;
  line-height: 1.2;
  text-decoration: none;
  text-align: center;
  text-shadow: 0px 1px 8px rgba(0, 0, 0, 0.9);

  @media screen and (max-width: 640px) {
    font-size: 1.6vh;
  }
}

.ce-explore-select__slider-container {
  height: 100%;
  left: 0;
  padding: 80px 0 0 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;

  @media screen and (max-width: 640px) {
    padding: 50px 0 0;
  }
}

.ce-explore-select__slider {
  height: 100%;
}

.ce-explore-select__slide {
  background-position: 50% 50%;
  background-size: cover;
}

.ce-explore-select__slide--a,
.ce-explore-select__slide--b,
.ce-explore-select__slide--c {
  .ce-explore-select__slide();
}

.ce-explore-select__slide--a {
  background-image: var(--background_a);

  @media screen and (max-width: 640px) {
    background-image: var(--background_a--mobile);
  }
}

.ce-explore-select__slide--b {
  background-image: var(--background_b);

  @media screen and (max-width: 640px) {
    background-image: var(--background_b--mobile);
  }
}

.ce-explore-select__slide--c {
  background-image: var(--background_c);

  @media screen and (max-width: 640px) {
    background-image: var(--background_c--mobile);
  }
}

.ce-explore-select__navigation {
  bottom: 4vh;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  -webkit-transform: translate3d(-50%, 0, 0);
  //width: 24px;
  z-index: 10;

  @media screen and (max-width: 640px) {
    bottom: 20px;
  }
}

.ce-explore-select__navigation-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ce-explore-select__navigation-item {
  transform-origin: bottom;
  transition: 0.5s all;
  position: absolute;
  bottom: 0;

  &.ce-explore-select__navigation-item--pos-a {
    transform: translate3d(-50%, -5.5vh, 0) scale(1.5);
    -webkit-transform: translate3d(-50%, -5.5vh, 0) scale(1.5);

    @media screen and (max-width: 640px) {
      transform: translate3d(-50%, -6vh, 0) scale(1.5);
      -webkit-transform: translate3d(-50%, -6vh, 0) scale(1.5);
    }

    .ce-explore-select__navigation-btn {
      background: #0079c1;
    }

    .ce-explore-select__navigation-icon {
      fill: #ffffff;
    }
  }

  &.ce-explore-select__navigation-item--pos-b {
    transform: translate3d(calc(10vh - 50%), 0, 0);
    -webkit-transform: translate3d(calc(10vh - 50%), 0, 0);

    @media screen and (max-width: 640px) {
      transform: translate3d(calc(11vh - 50%), 0, 0);
      -webkit-transform: translate3d(calc(11vh - 50%), 0, 0);
    }
  }

  &.ce-explore-select__navigation-item--pos-c {
    transform: translate3d(calc(-10vh - 50%), 0, 0);
    -webkit-transform: translate3d(calc(-10vh - 50%), 0, 0);

    @media screen and (max-width: 640px) {
      transform: translate3d(calc(-11vh - 50%), 0, 0);
      -webkit-transform: translate3d(calc(-11vh - 50%), 0, 0);
    }
  }
}

.ce-explore-select__navigation-btn {
  background: #ffffff;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: block;
  height: 5.4vh;
  position: relative;
  transition: 0.5s all;
  width: 5.4vh;
  will-change: height, width;

  &:hover {
    transform: scale(1.2) translate3d(0, 0, 0);
    -webkit-transform: scale(1.2) translate3d(0, 0, 0);
  }

  @media screen and (max-width: 640px) {
    height: 5.8vh;
    width: 5.8vh;
  }
}

.ce-explore-select__navigation-icon {
  fill: #0079c1;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  -webkit-transform: translate3d(-50%, -50%, 0);
  transition: 0.5s all;
  width: 45%;
}

.ce-explore-select__replay-video-link {
  align-items: center;
  background: none;
  border: none;
  bottom: 26px;
  color: var(--color-font-main);
  cursor: pointer;
  display: flex;
  font-family: 'Open Sans';
  font-size: 1.5rem;
  font-weight: 700;
  gap: 8px;
  line-height: 1;
  padding: 0;
  position: absolute;
  right: 32px;
  text-decoration: none;
  text-shadow: 0px 1px 8px rgba(0, 0, 0, 0.9);
  z-index: 5;

  @media screen and (max-width: 640px) {
    bottom: auto;
    left: 50%;
    right: auto;
    margin: 16px 0 0;
    top: 50px;
    transform: translate3d(-50%, 0, 0);
    -webkit-transform: translate3d(-50%, 0, 0);
  }
}

.ce-explore-select__replay-video-link--icon {
  fill: #ffffff;
  filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.9) ;);
}

.ce-explore-select__image-preload-container {
  display: none;
}
</style>
