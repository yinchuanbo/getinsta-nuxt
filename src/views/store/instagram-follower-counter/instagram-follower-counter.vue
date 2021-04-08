<template>
    <div class="instagram-follower-counter">
        <div class="header-blank pc"></div>
        <div class="counter-banner">
            <h2>Live Instagram Follower Counter</h2>
            <p>Real-time, accurate, exact Instagram follower count. No Instagram account log in.</p>
            <div class="counter-banner_inputs">
                <label>
                    <input
                    v-model="searchInsInput"
                    :disabled="searchInsLoading"
                    type="text"
                    placeholder="Type Instagram Username"
                    :style="{
                        borderColor: isBoxRed ? 'red!important' : '#E0E1E6!important',
                    }"
                    @input="changeInput"
                    @blur="inputBlur"
                    @focus="inputFocus"
                    />
                </label>
                <button-yellow-icon text="Check Now" :sharp="true" font-size="size-16" :loading="searchInsLoading"/>
            </div>
            <div class="counter-download"><a href="">Download</a> GetInsta to increase your Instagram follower count</div>
        </div>
        <div class="counter-container">
            <div class="counter-container-item1"></div>
            <div class="counter-container-item2"></div>
            <div class="counter-container-item3"></div>
            <div class="counter-container-item4"></div>
            <div class="counter-container-item5"></div>
            <div class="counter-container-item6"></div>
        </div>
        <div class="counter-signup"></div>
        <div class="counter-why">
            <div class="counter-why-item"></div>
            <div class="counter-why-item"></div>
            <div class="counter-why-item"></div>
            <div class="counter-why-item"></div>
        </div>
        <div class="counter-tips">
            <div class="counter-tips-item"></div>
            <div class="counter-tips-item"></div>
            <div class="counter-tips-item"></div>
            <div class="counter-tips-item"></div>
            <div class="counter-tips-item"></div>
            <div class="counter-tips-item"></div>
        </div>
    </div>
</template>

<script>
import ButtonYellowIcon from '@/components/button/button-yellow-icon';
export default {
  components: {
    ButtonYellowIcon
  }
}
</script>

<style scoped lang="scss" src="./instagram-follower-counter.scss"></style>