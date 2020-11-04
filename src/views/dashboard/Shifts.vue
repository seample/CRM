<template>
  <v-app id="inspire">
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>نوبت های من</v-card-title>
              <v-card-text>
                <p>به سامانه نوبت دهی آنلاین کلینیک ساعی خوش آمدید.</p>
                <p>
                  برای ثبت نوبت جدید از منوی سمت راست به قسمت نوبت دهی رفته و بر
                  روی گزینه ثبت نوبت جدید کلیک نمایید. سپس با انتخاب زمان و
                  خدمات مورد نظر نوبت دلخواه خود را ثبت کنید.
                </p>
                <p>
                  در صورت داشتن هر گونه سوال با شماره ۸۸۱۰۰۰۵۰-۰۲۱ تماس بگیرید.
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
  name: "NewShift",
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
</style>