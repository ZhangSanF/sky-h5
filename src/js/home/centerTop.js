import {store,base,process,storages} from "@/js/public/port";
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: "centerTop",
    components: {swiper, swiperSlide},
    data() {
        return {
            swiperOption: {
                direction: 'horizontal',
                loop: true,
                autoplay: {
                    delay: 5000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                slidesPerView: 'auto',
                centeredSlides:true,
                spaceBetween: 10,
                paginationClickable:true,
                pagination: {
                    el: '.swiper-pagination',
                },
            }
        };
    },
    methods: {

    },
    mounted() {

    },
  computed:{
    image_zw() {
      if(store.state.isImageLbNotNul) {
        console.log("imagesList",store.state.imagesList)
        return store.state.imagesList
      } else {
        return [
          { id: 0, src: require("../../../static/imgs/perch/lb.png") },
          { id: 1, src: require("../../../static/imgs/perch/lb.png") },
          { id: 2, src: require("../../../static/imgs/perch/lb.png") }
        ]
      }
    },
  },
  watch:{

  }
};
