<script setup lang="ts">
import { type Ref, onMounted, ref, watch } from 'vue'
import { type RouteParamValue, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import * as messages from '../i18n/messages'
import { type EventMessageName } from '@/i18n/types'

const { t } = useI18n()
const eventKey: Ref<RouteParamValue> = ref('')
const route = useRoute()

watch(() => route.params.event, () => {
  eventKey.value = route.params.event;
}, { immediate: true });

const getCalendarLink = () => {
  let calendarString = 'http://www.google.com/calendar/event?action=TEMPLATE&dates='
  try {
    const { title, location } = messages.it.events[eventKey.value as EventMessageName]
    const [date, time] = messages.it.events[eventKey.value as EventMessageName].date.split(' ')
    const startUTCDate = new Date(`${date} ${time}`)
    const startDate = startUTCDate.toISOString().replace(/[:-]/g, '').replace('.000Z', 'Z')
    startUTCDate.setTime(startUTCDate.getTime() + 3600 * 2 * 1000)
    const endDate = startUTCDate.toISOString().replace(/[:-]/g, '').replace('.000Z', 'Z')
    calendarString += `${startDate}%2F${endDate}`
    calendarString += `&text=${title}&location=${location}&details=`
  }
  catch (err) {
    // TODO: Redirect to missing event name
    console.log(err)
  }
  return calendarString
}
</script>

<template>
  <!-- TODO: Add loader -->
  <span v-if="!eventKey">Add loader</span>
  <div v-else class="event">
    <div class="container">
      <div class="content">
        <h1 :data-test="`${eventKey}-title`">
          {{ t(`events.${eventKey}.title`) }}
        </h1>
        <h4>
          <a
            :data-test="`${eventKey}-date`"
            class="external-link-color"
            target="_blank"
            :href="getCalendarLink"
          >
            {{ t(`events.${eventKey}.date`) }}</a>
          |
          <a
            :data-test="`${eventKey}-location`"
            class="external-link-color"
            target="_blank"
            :href="t(`events.${eventKey}.location-link`)"
          >
            {{ t(`events.${eventKey}.location`) }}</a>
        </h4>
        <p :data-test="`${eventKey}-subtitle`">
          <i>{{ t(`events.${eventKey}.subtitle`) }}</i>
        </p>
        <div
          v-if="t(`events.${eventKey}.description`) !== ''"
          :data-test="`${eventKey}-description`"
          class="description"
          v-html="$t(`events.${eventKey}.description`)"
        />
        <div class="cta">
          <a
            v-if="t(`events.${eventKey}.signup-link`) !== ''"
            :data-test="`${eventKey}-signup-link`"
            class="btn btn-primary"
            target="_blank"
            :href="t(`events.${eventKey}.signup-link`)"
          >{{ t(`message.common.go-to-event`) }}</a>
          <a
            v-if="t(`events.${eventKey}.cfp`) !== ''"
            :data-test="`${eventKey}-cfp`"
            class="btn btn-primary"
            target="_blank"
            :href="t(`events.${eventKey}.cfp`)"
          >{{ t(`message.common.go-to-cfp`) }}</a>
          <a
            v-if="t(`events.${eventKey}.donation`) !== ''"
            :data-test="`${eventKey}-donation`"
            class="btn btn-primary"
            target="_blank"
            :href="t(`events.${eventKey}.donation`)"
          >{{ $t(`message.common.go-to-donation`) }}</a>
          <a
            v-if="t(`events.${eventKey}.conference-website`) !== ''"
            :data-test="`${eventKey}-website`"
            class="btn btn-primary"
            target="_blank"
            :href="t(`events.${eventKey}.conference-website`)"
          >{{ t(`message.common.go-to-conference-website`) }}</a>
          <a
            v-if="t(`events.${eventKey}.video-link`) !== ''"
            class="btn btn-primary"
            target="_blank"
            :href="t(`events.${eventKey}.video-link`)"
          >{{ t(`message.common.video`) }}</a>

        </div>
        <div
          v-if="t(`events.${eventKey}.sponsors`) !== ''"
          class="sponsors"
        >
          <br>
          <h3
            :data-test="`${eventKey}-sponsors-title`"
          >
            Sponsors
          </h3>
          <div
            class="sponsor-logos"
            :data-test="`${eventKey}-sponsors-logo`"
            v-html="t(`events.${eventKey}.sponsors`)"
          />
        </div>
        <div v-if="t(`events.${eventKey}.community-sponsors`) !== ''">
          <h3
            :data-test="`${eventKey}-community-sponsors-title`"
          >
            Community Sponsors
          </h3>
          <div
            :data-test="`${eventKey}-community-sponsors-logo`"
            class="sponsor-logos"
            v-html="t(`events.${eventKey}.community-sponsors`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.event {
  .content {
    padding: 1.5em 3em;
    margin: auto;
    max-width: 700px;
  }
  .cta {
    text-align: left;
    margin-top: 20px;
    display: grid;
    .btn {
      margin: 0;
    }
  }
  .sponsor-logos {
    display: flex;
    flex: auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
}

@media (min-width: 56.25em) {
  .event {
    .cta {
      display: block;
      .btn {
        margin: 0 5px;
        &:nth-of-type(1) {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
