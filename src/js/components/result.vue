<template>
  <div class="quiz__slide quiz__slide--result active">
    <div class="quiz__headline">Your result: {{correctAnswers}} Points</div>
    <div class="quiz__result">
      <div>
        <div class="quiz__circleIcon animate">
          <span class="icon1">
            <img src="/assets/images/icons/result1.svg" alt="result">
          </span>
          <span class="icon2">
            <img src="/assets/images/icons/result2.svg" alt="result">
          </span>
        </div>
        <p class="quiz__headline">
          You’re Bania. You owe us two Mendy’s.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['correctAnswers'],
  }
</script>