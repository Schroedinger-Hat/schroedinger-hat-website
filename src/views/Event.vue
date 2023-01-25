<script>
import text from '../i18n/messages.json'

export default {
  name: 'Event',
  data() {
    return {
      eventKey: '',
    }
  },
  mounted() {
    const eventKey = this.$route.params.event
    if (text.it.events[eventKey] !== undefined)
      this.eventKey = eventKey
  },
  methods: {
    getCalendarLink() {
      let calendarString = 'http://www.google.com/calendar/event?action=TEMPLATE&dates='
      try {
        const { title, location } = text.it.events[this.$route.params.event]
        const [date, time] = text.it.events[this.$route.params.event].date.split(' ')
        const startUTCDate = new Date(`${date} ${time}`)
        const startDate = startUTCDate.toISOString().replace(/[:-]/g, '').replace('.000Z', 'Z')
        startUTCDate.setTime(startUTCDate.getTime() + 3600 * 2 * 1000)
        const endDate = startUTCDate.toISOString().replace(/[:-]/g, '').replace('.000Z', 'Z')
        calendarString += `${startDate}%2F${endDate}`
        calendarString += `&text=${title}&location=${location}&details=`
      }
      catch (err) {
        console.log(err)
      }
      finally {
        console.log('calendar link')
      }
      return calendarString
    },
  },
}
</script>

<template>
  <div class="event">
    <div class="container">
      <div class="content">
        <h1>{{ $t(`events.${eventKey}.title`) }}</h1>
        <h4>
          <a class="external-link-color" target="_blank" :href="getCalendarLink()">
            {{ $t(`events.${eventKey}.date`) }}</a>
          |
          <a
            class="external-link-color"
            target="_blank"
            :href="$t(`events.${eventKey}.location-link`)"
          >
            {{ $t(`events.${eventKey}.location`) }}</a>
        </h4>
        <p>
          <i>{{ $t(`events.${eventKey}.subtitle`) }}</i>
        </p>
        <div v-if="$t(`events.${eventKey}.description`) !== ''" class="description" v-html="$t(`events.${eventKey}.description`)" />
        <div class="cta">
          <a
            v-if="$t(`events.${eventKey}.signup-link`) !== ''"
            class="btn btn-primary"
            target="_blank"
            :href="$t(`events.${eventKey}.signup-link`)"
          >{{ $t(`message.common.go-to-event`) }}</a>
          <a
            v-if="$t(`events.${eventKey}.cfp`) !== ''"
            class="btn btn-primary"
            target="_blank"
            :href="$t(`events.${eventKey}.cfp`)"
          >{{ $t(`message.common.go-to-cfp`) }}</a>
          <a
            v-if="$t(`events.${eventKey}.donation`) !== ''"
            class="btn btn-primary"
            target="_blank"
            :href="$t(`events.${eventKey}.donation`)"
          >{{ $t(`message.common.go-to-donation`) }}</a>
          <a
            v-if="$t(`events.${eventKey}.conference-website`) !== ''"
            class="btn btn-primary"
            target="_blank"
            :href="$t(`events.${eventKey}.conference-website`)"
          >{{ $t(`message.common.go-to-conference-website`) }}</a>
        </div>
        <div class="sponsors">
          <br>
          <h3 v-if="$t(`events.${eventKey}.sponsors`) !== ''">
            Sponsors
          </h3>
          <div class="sponsor-logos" v-html="$t(`events.${eventKey}.sponsors`)" />
          <br><br>
          <h3 v-if="$t(`events.${eventKey}.comunity-sponsors`) !== ''">
            Community Sponsors
          </h3>
          <div
            v-if="$t(`events.${eventKey}.comunity-sponsors`) !== ''"
            class="sponsor-logos"
            v-html="$t(`events.${eventKey}.comunity-sponsors`)"
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
