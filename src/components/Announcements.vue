<template>
  <div class="cards">
    <div class="cardInfo rounded-1">
      <div>
        &nbsp; &nbsp;
        <vsa-list>
          <!-- Here you can use v-for to loop through items  -->
          <li :key="value.title" v-for="value in msgs">
            <vsa-item>
              <vsa-heading> {{ value.title }} </vsa-heading>
              <vsa-content>
                {{ value.description }}
                <br />
                <a
                  v-if="value.link != ''"
                  :href="value.link"
                  class="text-white"
                  target="_blank"
                >
                  More
                  <Icon name="external-link" class="ml-1" />
                </a>
              </vsa-content>
            </vsa-item>
          </li>
        </vsa-list>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import VueSimpleAccordion from 'vue-simple-accordion';
import 'vue-simple-accordion/dist/vue-simple-accordion.css';
Vue.use(VueSimpleAccordion, {
  // ... Options go here
});
export default {
  props: ['msgs']
};
</script>
<style>
.vsa-item__trigger {
  margin: 0;
  padding: 0;
  color: inherit;
  font-family: inherit;
  font-size: 30% !important;
  line-height: 0.15 !important;
  border-width: 0;
  background-color: transparent;
  background-image: none;
  overflow: visible;
  text-transform: none;
  flex: 1 1 auto;
  color: var(--vsa-text-color);
  transition: all 0.2s linear;
  padding: var(--vsa-heading-padding);
}
.vsa-item__trigger__content {
  font-weight: 900 !important;
  font-size: 0.8rem !important;
}
.vsa-list {
  --vsa-max-width: 100%;
  --vsa-min-width: 700px;
  --vsa-text-color: rgba(235, 235, 235, 0.774);
  --vsa-highlight-color: #566b79;
  --vsa-bg-color: #28282f;
  --vsa-border-color: #566b79;
  --vsa-border-width: 1px;
  --vsa-border-style: solid;
  --vsa-heading-padding: 0.1rem 0.41rem;
  --vsa-content-padding: 0.1rem 0.91rem;
  --vsa-default-icon-size: 0.21;
}
</style>
