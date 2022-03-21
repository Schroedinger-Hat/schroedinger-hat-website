<template>
  <div class="eventlist">
    <div class="container">
      <div class="content">
        <div class="headline">
          <h1>{{ $t(`message.navbar.events`) }}</h1>
        </div>
        <router-link
          v-for="event in events"
          :key="event.permalink"
          :to="`/events/${$t(`events.${event}.permalink`)}`"
        >
          <div class="blog-card">
            <div class="meta">
              <div
                class="photo"
                :style="`background-image: url( ${$t(`events.${event}.image`)} );`"
              ></div>
            </div>
            <div class="description">
              <h1>{{ $t(`events.${event}.title`) }}</h1>
              <h2>{{ $t(`events.${event}.date`) }} | {{ $t(`events.${event}.location`) }}</h2>
              <p>
                {{ $t(`events.${event}.subtitle`) }}
                <br /><br />
              </p>
              <!-- <div class="sponsors">
                <div class="logos" v-html="$t(`events.${event}.sponsors`)"></div>
              </div> -->
              <p class="read-more">
                <a href="#">{{ $t(`message.common.read-more`) }}</a>
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import text from '../i18n/messages.json';

export default {
  name: 'EventList',
  data() {
    return {
      events: Object.keys(text.it.events),
    };
  },
};
</script>
<style scoped lang="scss">
$color_white: #fff;
$color_prime: $nord3;
$color_grey: $nord4;
$color_grey_dark: $nord2;

.eventlist {
  .content {
    padding: 1.5em 3em;
  }

  .headline {
    margin: auto;
    max-width: 700px;
  }

  .blog-card {
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    box-shadow: 0 3px 7px -1px rgba(#000, 0.1);
    margin-bottom: 1.6%;
    background: $color_white;
    line-height: 1.4;
    font-family: sans-serif;
    border-radius: 5px;
    overflow: hidden;
    z-index: 0;
    a,
    li {
      color: $color_white;
    }
    &:hover {
      .photo {
        transform: scale(1.3) rotate(3deg);
      }
    }
    .meta {
      position: relative;
      z-index: 0;
      height: 200px;
    }
    .photo {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-size: cover;
      background-position: center;
      transition: transform 0.2s;
    }

    .description {
      padding: 1rem;
      background: $color_white;
      position: relative;
      z-index: 1;
      h1,
      h2 {
        font-family: Poppins, sans-serif;
      }
      h1 {
        line-height: 1;
        margin: 0;
        font-size: 1.7rem;
      }
      h2 {
        font-size: 1rem;
        font-weight: 300;
        color: $color_grey_dark;
        margin-top: 5px;
      }
      .read-more {
        text-align: right;
        a {
          color: $color_prime;
          display: inline-block;
          position: relative;
        }
      }
    }
    p {
      position: relative;
      margin: 1rem 0 0;
      &:first-of-type {
        margin-top: 1.25rem;
      }
    }

    @media (min-width: 640px) {
      flex-direction: row;
      max-width: 700px;
      .meta {
        flex-basis: 40%;
        height: auto;
      }
      .description {
        flex-basis: 60%;
        &:before {
          transform: skewX(-3deg);
          content: '';
          background: #fff;
          width: 30px;
          position: absolute;
          left: -10px;
          top: 0;
          bottom: 0;
          z-index: -1;
        }
      }
      &.alt {
        flex-direction: row-reverse;
        .description {
          &:before {
            left: inherit;
            right: -10px;
            transform: skew(3deg);
          }
        }
      }
    }
  }
}

.#{$dark-mode-class} {
  .blog-card {
    background: $nord2;
    .description {
      background: $nord2;
      h2,
      .read-more a {
        color: $nord4;
      }
      &:before {
        background: $nord2;
      }
    }
  }
}
</style>
