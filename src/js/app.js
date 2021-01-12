import 'promise-polyfill/src/polyfill';
import Vue from 'vue'
import quiz from './components/quiz.vue'

const app = new Vue({
	el: '#app',
	components: {
		quiz
	},
	methods: {
		// non blocking sleep function, see https://www.sitepoint.com/delay-sleep-pause-wait/
		sleep(ms) {
			// return new Promise(resolve => setTimeout(resolve, ms));
			return new Promise((resolve) => setTimeout(resolve, ms))
		}
	},
});
