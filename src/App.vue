<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          {{ $t("common.home") }}
        </q-toolbar-title>
        <q-btn-dropdown flat label="Language">
          <q-list>
            <q-item clickable v-close-popup @click="changeLocale('ko')">
              <q-item-section>한국어</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="changeLocale('en')">
              <q-item-section>English</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item to="/" clickable v-ripple>
          <q-item-section>{{ $t("common.home") }}</q-item-section>
        </q-item>
        <q-item to="/login" clickable v-ripple>
          <q-item-section>{{ $t("common.login") }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const changeLocale = (lang: string) => {
  locale.value = lang;
};
</script>
