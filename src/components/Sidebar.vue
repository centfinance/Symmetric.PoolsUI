<template>
  <div
    id="sidebar"
    class="d-flex flex-column bottom-0 top-0 overflow-y-auto animate"
    :class="ui.sidebarIsOpen ? 'is-open' : 'is-closed'"
  >
    <nav class="nav d-flex flex-column height-full">
      <div class="flex-auto">
        <ul class="sidebar-top-section py-3">
          <li v-if="$auth.isAuthenticated">
            <router-link
              :to="{ name: 'home' }"
              :class="{ active: $router.currentRoute.name === 'home' }"
              v-text="$t('dashboard')"
            />
          </li>
          <li>
            <router-link
              :to="{ name: 'explore' }"
              :class="{ active: $router.currentRoute.name === 'explore' }"
              v-text="$t('explorePools')"
            />
          </li>
          <li>
            <router-link
              :to="{ name: 'create' }"
              :class="{ active: $router.currentRoute.name === 'create' }"
              v-text="$t('createPool')"
            />
          </li>
        </ul>
        <ul class="sidebar-bottom-section py-3">
          <li>
            <a
              :href="config.exchangeUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ $t('exchange') }}
              <Icon name="external-link" class="ml-3" />
            </a>
          </li>
          <li>
            <a
              href="https://symmetric.finance"
              target="_blank"
              rel="noopener noreferrer"
            >
              Home
              <Icon name="external-link" class="ml-3" />
            </a>
          </li>
          <li>
            <a
              href="https://docs.symmetric.exchange"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
              <Icon name="external-link" class="ml-3" />
            </a>
          </li>
          <li v-if="currentNetwork != 'celo'">
            <a
              href="https://celo-pools.symmetric.exchange"
              target="_blank"
              rel="noopener noreferrer"
            >
              Celo Pools
              <Icon name="external-link" class="ml-3" />
            </a>
          </li>
          <li v-if="currentNetwork != 'xdai'">
            <a
              href="https://xdai-pools.symmetric.exchange"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gnosis Pools
              <Icon name="external-link" class="ml-3" />
            </a>
          </li>
          <li>
            <router-link
              :to="{ name: 'chart' }"
              :class="{ active: $router.currentRoute.name === 'chart' }"
              v-text="'Charts'"
            />
          </li>
          <li>
            <a @click="modalOpen = true" v-text="$t('about')" />
          </li>
        </ul>
      </div>
      <div class="d-block m-4">
        <span
          >Network:
          <span class="network-name">{{
            config.network === 'xdai' ? 'gnosis' : config.network
          }}</span>
        </span>
        <br />
        <span
          >Build:
          <span class="network-name">{{ buildNumber }}</span>
        </span>

        <a
          v-if="commitSha"
          :href="`https://github.com/${pkg.repository}/tree/${commitSha}`"
          target="_blank"
        >
          Build {{ pkg.version }}#{{ commitSha.slice(0, 7) }}
          <Icon name="external-link" class="ml-3" />
        </a>
      </div>

      <div class="social-links">
        <div class="social-item">
          <a
            href="https://twitter.com/0xsymmetric"
            target="_black"
            rel="noopener noreferrer"
            ><font-awesome-icon :icon="['fab', 'twitter']"
          /></a>
        </div>
        <div class="social-item">
          <a
            href="https://github.com/centfinance"
            target="_black"
            rel="noopener noreferrer"
            ><font-awesome-icon :icon="['fab', 'github']"
          /></a>
        </div>
        <div class="social-item">
          <a
            href="https://discord.gg/rJd7azWx4V"
            target="_black"
            rel="noopener noreferrer"
            ><font-awesome-icon :icon="['fab', 'discord']"
          /></a>
        </div>
        <div class="social-item">
          <a
            href="https://t.me/SymmetricFinanceAnnouncements"
            target="_black"
            rel="noopener noreferrer"
            ><font-awesome-icon :icon="['fab', 'telegram']"
          /></a>
        </div>
        <div class="social-item">
          <a
            href="https://medium.com/@Symmetric.Finance"
            target="_black"
            rel="noopener noreferrer"
            ><font-awesome-icon :icon="['fab', 'medium']"
          /></a>
        </div>
      </div>
    </nav>
    <portal to="modal">
      <ModalAbout :open="modalOpen" @close="modalOpen = false" />
    </portal>
  </div>
</template>

<script>
import pkg from '@/../package.json';
import config from '@/config';

const commitSha = process.env.VUE_APP_COMMIT_SHA;

export default {
  data() {
    return {
      modalOpen: false,
      pkg,
      commitSha
    };
  },
  computed: {
    buildNumber() {
      return process.env.VUE_APP_BUILD_NUMBER;
    },
    currentNetwork() {
      return config.network;
    }
  }
};
</script>

<style lang="scss">
@import '../vars';

#sidebar {
  z-index: 5;
  box-shadow: $box-shadow-secondary;
  position: fixed;
  background-color: $panel-background;
  margin-top: 79px;
  width: 180px;
  left: -180px;
  transition: left 0.2s;

  @media (min-width: $width-xl) {
    left: 0;
  }

  .sidebar-top-section {
    border-bottom: $border-secondary;
  }

  .sidebar-bottom-section {
    li a {
      display: flex;
      align-items: center;
      justify-content: space-between;

      i {
        padding-top: 2px;
      }
    }
  }

  ul > li > a {
    font-size: 16px;
    color: var(--text-primary-color);
    display: block;
    padding: 10px 22px 12px;

    &.active {
      background-color: var(--panel-background);
      border-left: 3px solid $blue;
      padding-left: 19px;
    }
  }

  &.is-open {
    left: 0 !important;
  }

  .network-name {
    color: var(--text-primary-color);
  }

  .social-links {
    display: flex;
    padding: 0px 24px 24px;
    justify-content: space-between;

    .social-item {
      margin-right: 4px;

      a {
        font-size: 18px;
      }
    }
  }
}

@media (max-width: 543px) {
  #sidebar {
    margin-top: 159px;
  }
}
</style>
