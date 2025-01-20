<template>
  <section class="ce-explore">
    <HeaderBar />

    <router-view
      v-slot="{ Component }"
      name="main"
      @asset-loading="$refs?.preloader.incrementTotalImagesCount()"
      @asset-loaded="$refs?.preloader.incrementTotalImagesLoaded()"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" @on-export-button-click="onExportButtonClick" />
      </transition>
    </router-view>

    <Preloader ref="preloader" />

    <button
      @click="soundSettings.isMuted = !soundSettings.isMuted"
      class="ce-home__video-control--mute"
      type="button"
    >
      <IconVideoSoundIcon :is-muted="soundSettings.isMuted" />
    </button>

    <div class="ce-explore__export-pdf-container" aria-hidden="true">
      <div id="ce-explore__export-pdf" class="ce-explore__export-pdf">
        <div class="ce-explore__export-pdf-header">
          <img class="ce-explore__export-pdf-header-logo" src="\imgs\ce-logo-pdf.png" />
          <h1 class="ce-explore__export-pdf-header-heading" v-html="model.Heading"></h1>
          <img class="ce-explore__export-pdf-header-mascot" src="\imgs\pdf-header-mascot.png" />
        </div>

        <div class="ce-explore__export-pdf-body-heading-container">
          <h2 class="ce-explore__export-pdf-body-heading" v-html="model.Subheading"></h2>
        </div>

        <div
          v-for="(product, index) in exportProductList"
          class="ce-explore__export-pdf-product"
          :key="index"
        >
          <div class="ce-explore__export-pdf-product-header">
            <div class="ce-explore__export-pdf-product-header-checkbox"></div>

            <div class="ce-explore__export-pdf-product-header-content">
              <h3
                class="ce-explore__export-pdf-product-header-heading"
                v-html="product.Heading"
              ></h3>
              <div
                class="ce-explore__export-pdf-product-header-savings"
                v-html="product.Savings"
              ></div>
            </div>
          </div>

          <div v-if="product.Subheading" class="ce-explore__export-pdf-product-content">
            <h4
              class="ce-explore__export-pdf-product-content-heading"
              v-html="product.Subheading"
            ></h4>
            <p
              class="ce-explore__export-pdf-product-content-overview"
              v-html="product.Overview"
            ></p>
          </div>

          <div v-if="product.Tip?.Heading" class="ce-explore__export-pdf-product-content">
            <h4
              class="ce-explore__export-pdf-product-content-heading"
              v-html="product.Tip?.Heading"
            ></h4>
            <p
              class="ce-explore__export-pdf-product-content-overview"
              v-html="product.Tip?.Paragraph"
            ></p>
          </div>

          <div v-if="product?.SlideShow?.Slides && product?.SlideShow?.Slides.length >= 0 && product?.SlideShow?.Slides[0].Content" class="ce-explore__export-pdf-slideshow">
            <h2 v-if="product.SlideShow.Heading" class="ce-explore__export-pdf-slideshow-heading" v-html="product.SlideShow.Heading"></h2>

            <ul class="ce-explore__export-pdf-slideshow-list">
              <li
                v-for="(slide, index) in product?.SlideShow?.Slides"
                class="ce-explore__export-pdf-slideshow-item" :key="index">
                <h3 v-if="slide.Heading" class="ce-explore__export-pdf-slideshow-item-heading" v-html="slide.Heading"></h3>
                <p class="ce-explore__export-pdf-slideshow-item-paragraph" v-html="slide.Content"></p>
              </li>
            </ul>
          </div>

          <div class="ce-explore__export-pdf-product-legal" v-html="product.Legal"></div>

          <div v-if="product.CtaPrimary?.Url" class="ce-explore__cta-container">
            <a class="ce-explore__cta-primary" :href="product.CtaPrimary?.Url" target="_blank">{{
              product.CtaPrimary?.Label
            }}</a>

            <a class="ce-explore__cta-link" :href="product.CtaPrimary?.Url" target="_blank">{{
              product.CtaPrimary?.Url
            }}</a>
          </div>

          <div v-if="product.CtaSecondary?.Url" class="ce-explore__cta-container">
            <a class="ce-explore__cta-secondary" :href="product.CtaSecondary?.Url" target="_blank"
              >{{ product.CtaSecondary?.Label }}
            </a>

            <a class="ce-explore__cta-link" :href="product.CtaSecondary?.Url" target="_blank">{{
              product.CtaSecondary?.Url
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import LocationSelector from '@/components/LocationSelector.vue'
import IconVideoSoundIcon from '@/components/icons/IconVideoSoundIcon.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import Preloader from '@/components/Preloader.vue'
import html3pdf from 'html3pdf'

import { register } from 'swiper/element/bundle'
import { useModelStore } from '@/stores/model'
import { useSoundSettingsStore } from '@/stores/soundSettings'

register()
export default {
  setup() {
    const model = useModelStore().model?.Explore?.Pdf
    const soundSettings = useSoundSettingsStore()

    return {
      model,
      soundSettings
    }
  },
  data() {
    return {
      exportProductList: []
    }
  },
  components: {
    IconVideoSoundIcon,
    HeaderBar,
    LocationSelector,
    Preloader
  },
  methods: {
    onExportButtonClick(exportList: Array<{}>, location: String) {
      this.exportProductList = exportList

      var pdfElement = document.getElementById('ce-explore__export-pdf')
      const pdfOptions = {
        margin: [0, 0, 2, 0],
        pagebreak: { mode: 'avoid-all' },
        filename: 'CE Ways to Save - ' + location + '.pdf',
        html2canvas: { scale: 2 }
      }

      html3pdf().set(pdfOptions).from(pdfElement).save()
    }
  },
  watch: {
    $route(to, from) {
      this.$refs?.preloader?.reset()
    }
  }
}
</script>

<style lang="less" scoped>
.ce-explore {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  width: 100%;
}

.ce-home__video-control--mute {
  background: none;
  border: none;
  bottom: 10px;
  cursor: pointer;
  left: 28px;
  padding: 0;
  position: absolute;
  z-index: 8;

  @media screen and (max-width: 640px) {
    bottom: 20px;
    left: 20px;
  }
}

.ce-explore__export-pdf-container {
  display: none;
  position: absolute;
  top: -10000px;
  left: -10000px;
}

.ce-explore__export-pdf {
  background-color: #ffffff;
}

.ce-explore__export-pdf-header {
  align-items: center;
  background-color: #0079c1;
  display: flex;
  justify-content: space-between;
  padding: 15px 0 0 25px;
  position: relative;
}

.ce-explore__export-pdf-header-logo {
  display: inline-block;
  margin: 0 0 15px;
  width: 120px;
}

.ce-explore__export-pdf-header-mascot {
  flex-shrink: 0;
  width: 125px;
}

.ce-explore__export-pdf-header-heading {
  color: #ffffff;
  font-size: 3rem;
  margin: 0 0 15px;
  text-align: center;
}

.ce-explore__export-pdf-body {
  background-color: #ffffff;
  padding: 25px 56px;
}

.ce-explore__export-pdf-body-heading-container {
  padding: 25px 56px 0;
}

.ce-explore__export-pdf-body-heading {
  border: 2px solid #000000;
  color: #000000;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0 25px;
  padding: 10px;
  text-align: center;
}

.ce-explore__export-pdf-product {
  padding: 0 56px;
  page-break-inside: avoid;
}

.ce-explore__export-pdf-product-header {
  align-items: center;
  display: flex;
  gap: 16px;
  margin: 0 0 20px;
  padding: 44px 0 0 0;
}

.ce-explore__export-pdf-product-header-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ce-explore__export-pdf-product-header-checkbox {
  border: 2px solid #0079c1;
  border-radius: 4px;
  height: 36px;
  width: 36px;
}

.ce-explore__export-pdf-product-header-heading {
  color: #000000;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.15px;
  line-height: 1.1;
}

.ce-explore__export-pdf-product-header-savings {
  color: #0079c1;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0.15px;
}

.ce-explore__export-pdf-product-content {
  margin: 0 0 13.5px;
}

.ce-explore__export-pdf-product-content-heading {
  color: #000000;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.15px;
}

.ce-explore__export-pdf-product-content-overview {
  color: #000000;
  font-size: 11.5px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.15px;
}

.ce-explore__export-pdf-slideshow {
  color: #000000;
  margin: 0 0 15px;
}

.ce-explore__export-pdf-slideshow-list {
  padding: 0 0 0 30px;
}

.ce-explore__export-pdf-slideshow-heading {
  color: #000000;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.15px;
}

.ce-explore__export-pdf-slideshow-item-heading {
  color: #000000;
  font-size: 12px;
  font-weight: 600;
}

.ce-explore__export-pdf-slideshow-item-paragraph {
  color: #000000;
  font-size: 11.5px;
}

.ce-explore__export-pdf-product-legal {
  color: #000000;
  font-size: 11.5px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  /* 138.462% */
  letter-spacing: 0.15px;
}

.ce-explore__cta-container {
  padding: 24px 0 0;
}

.ce-explore__cta-primary {
  background-color: #639d36;
  color: #ffffff;
  display: block;
  font-size: 13px;
  font-weight: 700;
  margin: 0;
  line-height: 24px;
  padding: 12px;
  text-align: center;
  text-decoration: none;
  width: 100%;
}

.ce-explore__cta-secondary {
  align-items: center;
  color: #0079c1;
  display: block;
  font-weight: 700;
  font-size: 12px;
  line-height: 24px;
  margin: 0;
  text-align: center;
}

.ce-explore__cta-secondary-icon {
  height: 10px;
  margin: 3px 0 0 10px;
  width: 6px;
}

.ce-explore__cta-link {
  color: #0079c1;
  display: block;
  font-size: 11.5px;
  margin: 6px 0 0;
  text-align: center;
}
</style>
