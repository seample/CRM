<template>
  <div>
    <v-navigation-drawer v-model="drawer" app right>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="@/assets/img/profile.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="name"></v-list-item-title>
            <v-list-item-subtitle>خوش آمدید</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link @click="gotothelink(item.type,item.url)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="cyan" dark class="appbut">
      <v-spacer></v-spacer>

      <v-toolbar-title>سامانه آنلاین کلینیک ساعی</v-toolbar-title>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="appbuticon"></v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    source: String,
  },
  data: () => ({
    name: `${localStorage.name} ${localStorage.last_name}`,
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-home", text: "پنل مدیریت", type: 1, url: "Dashboard" },
      {
        icon: "mdi-account-group",
        text: "لیست کاربران",
        type: 1,
        url: "Users",
      },
      {
        icon: "mdi-account-plus",
        text: "ثبت کاربر جدید",
        type: 1,
        url: "NewUser",
      },
      {
        icon: "mdi-alarm-check",
        text: "لیست نوبت‌ها",
        type: 1,
        url: "NewShift",
      },
      {
        icon: "mdi-alarm-plus",
        text: "ثبت نوبت جدید",
        type: 1,
        url: "NewShift",
      },
      {
        icon: "mdi-google-analytics",
        text: "لیست صورت حسابها",
        type: 1,
        url: "Factors",
      },
      // { icon: "mdi-id-card", text: "تراکنش‌ها", type: 1, url: "Transactions" },

      { icon: "mdi-logout-variant", text: "خروج", type: 2, url: "logout" },
    ],
  }),
  methods: {
    gotothelink(type, url) {
      if (type == 1) {
        if (this.$route.name !== url) this.$router.push({ name: url });
      } else if (type == 2) {
        return this.logout();
      }
    },
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
.appbut {
  direction: ltr;
}
.appbuticon {
  margin-right: -12px;
  margin-left: 0px !important;
}
.v-list-item .v-list-item__content,
.v-list-item .v-list-item__subtitle {
  color: #fff !important;
}
.v-navigation-drawer__content .v-icon {
  color: #fff !important;
}
</style>