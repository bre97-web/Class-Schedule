<script>

import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import { getWeekday, getHour } from '../assets/time'

import Edit from '../views/Edit.vue'

export default {
    data() {
        return {
            time: {
                hour: getHour(),
            },
        }
    },
    computed: {
        ...mapState('ClassStore', {
            classList: state => state.class
        }),
        ...mapGetters('ClassStore', {'getClass':'get'}),
        ...mapGetters('GridStore', {'getGrid':'get'}),
    },
    methods: {
        ...mapActions('ClassStore', {'saveClass':'save', 'add':'add'}),

        /**
         * @param {Number} grid
         * @returns 得到指定x、y的所有元素。
         */
        getClassByGrid(x, y) {
            var a = null

            for(let i in this.getClass) {
                if(this.getClass[i].x == x && this.getClass[i].y == y) {
                    return this.getClass[i]
                }
            }

            return null
        },

        getWeekdayTime() {
            return getWeekday()
        },
        getHourTime() {
            return getHour()
        },
    },
    mounted() {

        // setInterval(() => {
        //     //this.time.hour = getHour()
        // }, 900000)

    },
    components: {
        Edit,
    },
}
</script>

<template>

    <main>

        <div class="relative flex">

            <!-- Lists -->
            <!-- 由GridX和GridY限制网格的大小 -->
            <!-- Grid.dividie分割上午和下午 -->
            <ul class="w-full grid grid-cols-7 gap-2 z-0">

                
                <!-- x为列数 -->
                <ul v-for="x in parseInt(getGrid.x)" class="flex gap-2 flex-col p-2 rounded-md" :class="{'bg-orange-100':x == parseInt(getWeekdayTime())}">
                    
                    <!-- Show weekday -->
                    <h2 class="font-medium">Part {{ x }}</h2>

                    <li v-for="y in parseInt(getGrid.y)"  class="relative hover:animate-pulse" :class="{'bg-white hover:bg-gray-50 flex items-center justify-center':getClassByGrid(x, y) == null,'bg-yellow-500 hover:bg-yellow-300':getClassByGrid(x, y) != null}">
                        
                        <!-- 如果getClassByGrid(x, y)得到了一个存在的class，则显示class -->
                        <div v-if="getClassByGrid(x, y) == null" class="block w-24 h-24 bi bi-calendar2-plus text-white hover:text-black"></div>
                        <p v-else>
                            {{ getClassByGrid(x, y).text }}
                        </p>
                        
                        <!-- 如果class存在： 修改， 不存在: 新增 -->
                        <!-- 修改点击的class -->
                        <router-link v-if="getClassByGrid(x, y) != null" :to="{
                            path: '/edit',
                            query: {
                                text: getClassByGrid(x, y).text,
                                x: x,
                                y: y,
                                index: getClassByGrid(x, y).index,
                            },
                        }" class="absolute left-0 top-0 h-full w-full"></router-link>
                        <!-- 新增一个class到点击位置 -->
                        <router-link v-else :to="{
                            path: '/add',
                            query: {
                                text: '',
                                x: x,
                                y: y,
                            }
                        }" class="absolute left-0 top-0 h-full w-full flex items-center justify-center bi bi-calendar2-plus text-sm opacity-0 hover:opacity-100 hover:text-2xl"></router-link>
                   </li>
                
                </ul>
            
            </ul>
            <RouterView></RouterView>
        </div>
    </main>
        
</template>

<style scoped>
    li {
        @apply rounded-md  w-full h-24 font-extrabold hover:shadow-md ;
    }
</style>