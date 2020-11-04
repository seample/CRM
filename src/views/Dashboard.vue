<template>
  <v-app id="inspire">
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <v-row class="dwidgets">
          <v-col cols="12" lg="3" md="6" sm="12">
            <v-card>
              <v-card-title>۱</v-card-title>
              <v-card-subtitle>تعداد کاربران</v-card-subtitle>
              <v-card-actions>
                <v-icon>mdi-google-analytics</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" lg="3" md="6" sm="12">
            <v-card>
              <v-card-title>۰</v-card-title>
              <v-card-subtitle>نوبت‌های فعال</v-card-subtitle>
              <v-card-actions>
                <v-icon>mdi-plus</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" lg="3" md="6" sm="12">
            <v-card>
              <v-card-title>۰</v-card-title>
              <v-card-subtitle>نوبت‌های انجام شده</v-card-subtitle>
              <v-card-actions>
                <v-icon>mdi-alarm-check</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" lg="3" md="6" sm="12">
            <v-card>
              <v-card-title>۰</v-card-title>
              <v-card-subtitle>فاکتور پرداخت نشده</v-card-subtitle>
              <v-card-actions>
                <v-icon>mdi-id-card</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>به ساعی خوش آمدید</v-card-title>
              <v-card-text>
                <p>به سامانه نوبت دهی آنلاین کلینیک ساعی خوش آمدید.</p>
                <p>
                  در صورت داشتن هر گونه سوال با شماره 5555555-5555 تماس بگیرید.
                </p>
                <p>پیروز باشید</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="cyan" app>
      <v-spacer></v-spacer>

      <span class="white--text footer">
        ©
        <span target="_blank" class="mr-1">طراحی و پیاده سازی</span> &nbsp;
        <a href="https://ponisha.ir/profile/demaks" target="_blank"
          >داود نظری فرد</a
        >
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "Dashboard",
  components: {
    Sidebar,
  },
  props: {
    source: String,
  },
  data: () => ({}),
};
</script>

<style scoped>
.dwidgets .v-card {
  border-radius: 5px !important;
}
.dwidgets div:nth-child(1) .v-card,
.dwidgets div:nth-child(1) .v-card .v-card__title,
.dwidgets div:nth-child(1) .v-card .v-card__subtitle {
  background-color: #321fdb !important;
  border: none;
  color: #fff;
}
.dwidgets div:nth-child(2) .v-card,
.dwidgets div:nth-child(2) .v-card .v-card__title,
.dwidgets div:nth-child(2) .v-card .v-card__subtitle {
  background-color: #39f !important;
  border: none;
  color: #fff;
}
.dwidgets div:nth-child(3) .v-card,
.dwidgets div:nth-child(3) .v-card .v-card__title,
.dwidgets div:nth-child(3) .v-card .v-card__subtitle {
  background-color: #f9b115 !important;
  border: none;
  color: #fff;
}
.dwidgets div:nth-child(4) .v-card,
.dwidgets div:nth-child(4) .v-card .v-card__title,
.dwidgets div:nth-child(4) .v-card .v-card__subtitle {
  background-color: #e55353 !important;
  border: none;
  color: #fff;
}
.v-card .v-card__subtitle {
  padding-top: 10px;
}

.v-card .v-card__actions i {
  position: absolute;
  left: 1vw;
  top: 1vw;
  font-size: 5vw;
  opacity: 0.5;
}
</style>