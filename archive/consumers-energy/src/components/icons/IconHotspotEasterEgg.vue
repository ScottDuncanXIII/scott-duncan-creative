<template>
  <div class="ce-interactive-scene__hotspot">
    <!--<div class="ce-interactive-scene__hotspot-outer"></div>-->
    <div class="ce-interactive-scene__hotspot-inner"></div>
    <!--<div class="ce-interactive-scene__hotspot-hover"></div>-->
  </div>
</template>

<style lang="less" scoped>
.ce-interactive-scene__hotspot {
  height: 4.5vh;
  position: relative;
  width: 4.5vh;

  &:hover {
    .ce-interactive-scene__hotspot-outer {
      animation-name: hoverAnimOuter;
      animation-duration: 0.8s;
      animation-delay: 0.1s;
    }

    .ce-interactive-scene__hotspot-inner {
      animation-name: hoverAnimInner;
      animation-duration: 0.8s;
    }

    .ce-interactive-scene__hotspot-hover {
      height: 130%;
      width: 130%;
    }
  }
}

.ce-interactive-scene__hotspot-outer {
  border: 0.4vh solid #ffffff;
  border-radius: 50%;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.9);
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 1;
}

.ce-interactive-scene__hotspot-inner {
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.9);
  content: '';
  height: 35%;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform-origin: 0 0;
  width: 35%;
  z-index: 2;
}

.ce-interactive-scene__hotspot-hover {
  background-color: RGBA(99, 157, 54, 0.6);
  border-radius: 50%;
  box-shadow: 0px 2px 8px RGBA(99, 157, 54, 0.6);
  content: '';
  height: 0;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  -webkit-transform: translate3d(-50%, -50%, 0);
  transition: 0.5s all 0.2s;
  width: 0;
  will-change: height, width;
  z-index: 0;
}

@keyframes hoverAnimOuter {
  0% {
    transform: scale(1) translate3d(0, 0, 0);
    -webkit-transform: scale(1) translate3d(0, 0, 0);
  }
  50% {
    transform: scale(1.3) translate3d(0, 0, 0);
    -webkit-transform: scale(1.3) translate3d(0, 0, 0);
  }
  100% {
    transform: scale(1) translate3d(0, 0, 0);
    -webkit-transform: scale(1) translate3d(0, 0, 0);
  }
}

@keyframes hoverAnimInner {
  0% {
    transform: scale(1) translate3d(-50%, -50%, 0);
    -webkit-transform: scale(1) translate3d(-50%, -50%, 0);
  }
  50% {
    transform: scale(1.4) translate3d(-50%, -50%, 0);
    -webkit-transform: scale(1.4) translate3d(-50%, -50%, 0);
  }
  100% {
    transform: scale(1) translate3d(-50%, -50%, 0);
    -webkit-transform: scale(1) translate3d(-50%, -50%, 0);
  }
}
</style>
