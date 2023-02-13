<script>

import { mapActions, mapGetters, mapState } from 'vuex'

import moment from 'moment'
import Class from './components/Class.vue'
import Next from './components/Next.vue'

export default {
  data() {
    return {
      tmp: {
          text: '',
          x: null,
          y: null,
      },

      date: null,
      time: null,
    }
  },
  computed: {
    ...mapState('ClassStore', {
      classList: (state) => state.class,
    }),
    ...mapGetters('ClassStore', ['get']),
  },
  watch: {
    classList: {
      immediate: true,
      deep: true,
      handler() {
        var position = []

        for(let e in this.get) {
          position.push({
            x: this.get[e].x,
            y: this.get[e].y,
          })
        }

        var maxX = position[0].x
        var index = 0
        for(let e in position) {
          if(maxX < position[e].x) {
            maxX = position[e].x
            index ++
          }
        }

        var maxY = position[index].y
        for(let e in position) {
          if(maxY < position[e].y) {
            maxY = position[e].y
          }
        }
        
        this.tmp.x = maxX + 1
        this.tmp.y = maxY + 1
      }
    }
  },
  methods: {
    ...mapActions('ClassStore', ['add', 'save']),

    /**
     * 得到目前state.class中最大的一个位置。
     */
    getMaxPosition() {
      
    }
  },
  created() {
    this.time = moment().format('HH-mm-ss')
    this.date = moment().format('YYYY-MM-DD')

    setInterval(() => {
        this.time = moment().format('HH-mm-ss')
        this.date = moment().format('YYYY-MM-DD')
    }, 1000)
  },
  components: {
    Class,
    Next
}
}
</script>

<template>
  <div>
    <header class="mt-16">
        <nav class="fixed z-50 noAnimation top-0 left-0 bg-blue-500 w-screen px-4 py-2 flex items-center justify-between">

          <!-- Title: Program Name -->
          <h1 class="font-bold text-white text-xl">Class Schedule</h1>

          <!-- Search Feature bar -->
          <div class="flex gap-2 justify-center w-5/6">
            <input v-model="tmp.text" type="text" class="outline-none rounded-md w-2/3 max-w-lg px-4 py-2">
            <button @click="add(tmp); " class="rounded-md px-4 py-2 bg-white">Save</button>
          </div>

          <!-- Others bar -->
          <div class="pr-4">
            <router-link :to="{
              path: '/setting',
            }" class="px-4 py-2 bg-white rounded-md">Setting</router-link>
          </div>
        </nav>

      <!-- Title -->
    </header>

    <main>
      <div class="mt-32 flex flex-col gap-8 mx-auto w-full md:w-5/6 lg:w-4/5">
        
        <div class="flex gap-4 w-full">

          <!-- Time -->
          <div class="relative rounded-lg overflow-hidden border p-4 flex flex-col gap-2">
            <p class="bg-clip-text font-bold text-2xl flex flex-col items-center justify-center ">
              <p>
                {{ date }}
              </p>
              <p class="text-3xl">
                {{ time }}
              </p>
            </p>
          </div>
         
          <!-- Today's focus -->
          <div class="rounded-lg overflow-hidden border p-4 flex flex-col gap-2 flex-grow">
            <Next />
          </div>
        </div>
        
        <div class="rounded-lg overflow-hidden border  p-4 flex flex-col gap-2">
          <h2 class="font-bold text-2xl">ClassList</h2>
          <hr />
          <Class/>
        </div>
      </div>
        
    </main>
  </div>
</template>

<style scoped>
    .noAnimation {
        transition: none;
    }
</style>