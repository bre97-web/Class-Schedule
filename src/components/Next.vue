<script>

import moment from 'moment'

import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('ClassStore', {'getClass':'get'}),

        /**
         * 得到当前系统星期情况下的所有课程。
         */
        get() {
            return this.getClass.filter(e => e.x == parseInt(this.getDay()))
        }
    },
    methods: {
        /**
         * getDay将返回一个星期数，范围是1~7。
         * @returns 星期
         */
        getDay() {
            return moment().format('E')
        },


    }
}
</script>

<template>

    <div>
        <header>
            <h1 class="font-bold text-2xl">Next Focus</h1>
        </header>

        <main>
            <div class="mt-12">
                <ul class="flex gap-4">
                    <li id="focus" v-for="e in get" class="relative border border-green-500 rounded-lg px-4 py-2 text-green-900 font-bold h-24">
                        {{ e.text }}
                        <div class="ping"></div>
                        <div class="bgPing"></div>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>

<style scoped>
    #focus:first-child .ping {
        @apply animate-ping w-3 h-3 rounded-full absolute -top-1 -right-1 bg-green-900;
    }
    #focus:first-child .bgPing {
        @apply w-3 h-3 rounded-full absolute -top-1 -right-1 bg-green-900;
    }
</style>