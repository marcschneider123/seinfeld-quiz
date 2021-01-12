<template>
  <div class="quiz">
    <div class="quiz__container">
<!--      show navigation until result -->
      <div v-if="!hasFinished" class="quiz__navigation">
        <div class="quiz__counter">
          {{activeSlide+1}} / {{ slideCount}}
        </div>
        <ul class="quiz__dots">
  <!--        questions done with highlighted correct answers -->
          <li
            v-for="idx in answerCount"
            :class="answers[idx-1] == true ? 'success' : 'danger'"
          >
          </li>
  <!--        questions remaining -->
          <li v-for="idx in (remainingQuestions)"
          >
          </li>
        </ul>
      </div>
      <div class="quiz__track"
        :class="{active : !isOverlayActive}"
      >
<!--       build slide for each question -->
        <slide
          v-for="(slide, idx) in slides" :key="idx"
          :class="{active : idx == activeSlide}"
          @submitAnswer="onAnswer" :slide=slide :index="idx"
        ></slide>
<!--        show result on last slide -->
        <result v-if="hasFinished" :correctAnswers="correctAnswers"></result>
      </div>
    </div>
<!--    overlay between questions -->
    <div class="quiz__overlay quiz__overlay--question" :class="{active: isOverlayActive}">
      <div v-if="hasFinished" class="overlay__content">
        <p class="quiz__headline">You did it!</p>
        <div class="quiz__circleIcon">
          <span class="icon1">!</span>
        </div>
      </div>
      <div v-else class="overlay__content">
        <p class="quiz__headline">Question {{activeSlide+1}}</p>
        <div class="quiz__circleIcon">
          <span class="icon1">?</span>
        </div>
      </div>
    </div>
<!--    overlay at start -->
    <div class="quiz__overlay quiz__overlay--bg-yellow quiz__overlay--start" :class="{active: !hasStarted}">
      <div class="overlay__content">
        <p class="quiz__headline">The Seinfeld-Quiz</p>
        <div class="quiz__circleIcon animate">
          <span class="icon1">!</span>
          <span class="icon2">?</span>
        </div>
        <a href="" @click.prevent="startQuiz" class="btn btn-danger btn-lg">Start</a>
      </div>
    </div>
  </div>
</template>

<script>
  import slide from "./slide";
  import result from "./result";
  import questions from "./questions.json"

  export default {
    name: 'quiz',
    components: {
      slide,
      result
    },
    computed: {
      //answered questions
      answerCount() {
        return this.answers.length
      },
      slideCount() {
        return this.slides.length
      },
      // remaining unanswered questions
      remainingQuestions() {
        return this.slideCount - this.answerCount
      },
      // count correct answers
      correctAnswers() {
        return this.answers.filter(Boolean).length;
      }
    },
    data() {
      return {
        activeSlide: 0,
        answers: [],
        hasStarted: false,
        hasFinished: false,
        isOverlayActive: false,
        slides: questions,
      }
    },
    methods: {
      /*
       * move to next question or result on last
      */
      showNext() {
        if (this.activeSlide >= this.slides.length - 1 ) {
          this.hasFinished = true
          // this.toggleOverlay()
        } else {

        }
        this.toggleOverlay()
        this.activeSlide++
      },

      // show overlay and hide again after delay
      async toggleOverlay() {
        this.isOverlayActive = !this.isOverlayActive
        await this.$root.sleep(this.delay)
        this.isOverlayActive = !this.isOverlayActive
      },

      /*
       * Highlight correct answer and push to results array
       * Emitted from clicked answer on slide-child
       */
      async onAnswer(answer) {
        //push answer to answers result array
        this.answers.push(answer)
        //delay to highlight answer
        await this.$root.sleep(this.delay)
        //show next question
        this.showNext()
      },

      //start quiz by user input
      startQuiz() {
        this.hasStarted = !this.hasStarted
        this.toggleOverlay()
      }
    },
    //next question delay in ms
    props: {
      delay: {
        type: Number,
        default: 2000
      }
    }
  };
</script>