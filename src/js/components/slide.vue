<template>
  <div class="quiz__slide">
    <div class="row">
      <div class="col-md-5 col-sm-5">
        <div class="quiz__img">
          <img :src="'assets/images/questions/' + slide.img" :alt="`question ${index}`" class="img-fluid">
        </div>
      </div>
      <div class="col-md-7 col-sm-7 quiz__content">
        <div class="quiz__question">
          {{ slide.question }}
        </div>
        <div class="quiz__answers-container">
          <ul class="quiz__answers-list">
            <!--
              - build list-item with each answer
              - emit clicked answer to parent
              - set answer state:
                - danger: wrong answer clicked
                - success: right answer clicked
                - warning: wrong answer clicked, right answer highlighted
            -->
            <li
                v-for="(answer, idx) in slide.answers"
                @click="showAnswer(idx)"
                class="quiz__answer"
                :class="{
                'success' : clickedAnswer == slide.correctAnswer && clickedAnswer == idx,
                'danger' : clickedAnswer != slide.correctAnswer && clickedAnswer == idx,
                'warning' : clickedAnswer != slide.correctAnswer && slide.correctAnswer == idx && isClicked,
              }"
            >
              <span class="quiz__answer-icon"></span>
              <span>{{ answer }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "slide",
  data() {
    return {
      result: false,
      answer: 0,
      clickedAnswer: undefined,
      isClicked: false,
      isSlideActive: true
    }
  },
  props: ['index', 'slide'],
  methods: {
    /*
     * Submit result to parent
     * - allow only one answer
     * - set answer state to success/danger
     * - emit result to parent
     */
    showAnswer(answer) {
      if (!this.isClicked) {
        this.clickedAnswer = answer
        // console.log(this.clickedAnswer)
        this.isClicked = true

        if(answer == this.slide.correctAnswer) {
          this.result = true
        }
        //emit result
        this.$emit('submitAnswer', this.result)
      }
    }
  }
}
</script>
