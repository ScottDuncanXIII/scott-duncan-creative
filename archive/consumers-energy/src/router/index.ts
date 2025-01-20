import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExploreView from '@/views/ExploreView.vue'
import ExploreSelectView from '@/views/ExploreSelectView.vue'
import ExploreResidentialInteriorView from '@/views/explore/residential/InteriorView.vue'
import ExploreResidentialExteriorView from '@/views/explore/residential/ExteriorView.vue'
import ExploreSmallBusinessInteriorView from '@/views/explore/small-business/InteriorView.vue'
import ExploreSmallBusinessExteriorView from '@/views/explore/small-business/ExteriorView.vue'
import ExploreLargeBusinessInteriorView from '@/views/explore/large-business/InteriorView.vue'
import ExploreLargeBusinessExteriorView from '@/views/explore/large-business/ExteriorView.vue'
import LocationSelector from '@/components/LocationSelector.vue'

const router = createRouter({
  history: createWebHistory('/archive/consumers-energy/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/explore',
      component: ExploreView,
      name: 'Explore',
      children: [
        {
          path: '',
          components: {
            main: ExploreSelectView
          },
          name: 'ExploreSelect'
        },
        {
          path: 'residential-exterior',
          components: {
            locationSelector: LocationSelector,
            main: ExploreResidentialExteriorView
          },
          name: 'ResidentialExterior'
        },
        {
          path: 'residential-interior',
          components: {
            locationSelector: LocationSelector,
            main: ExploreResidentialInteriorView
          },
          name: 'ResidentialInterior'
        },
        {
          path: 'small-business-exterior',
          components: {
            locationSelector: LocationSelector,
            main: ExploreSmallBusinessExteriorView
          },
          name: 'SmallBusinessExterior'
        },
        {
          path: 'small-business-interior',
          components: {
            locationSelector: LocationSelector,
            main: ExploreSmallBusinessInteriorView
          },
          name: 'SmallBusinessInterior'
        },
        {
          path: 'large-business-exterior',
          components: {
            locationSelector: LocationSelector,
            main: ExploreLargeBusinessExteriorView
          },
          name: 'LargeBusinessExterior'
        },
        {
          path: 'large-business-interior',
          components: {
            locationSelector: LocationSelector,
            main: ExploreLargeBusinessInteriorView
          },
          name: 'LargeBusinessInterior'
        }
      ]
    }
  ]
})

export default router
