<template>
  <v-app id="inspire">
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>ثبت اطلاعات نوبت</v-card-title>
              <v-card-text>
                <p>لطفا تمامی فیلدهای اجباری را با دقت تکمیل نمایید:</p>
              </v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="نام پزشک / کاشت کار"
                        v-model="national_code"
                        :rules="national_codeRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="نوع کاشت"
                        v-model="name"
                        :rules="nameRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="ساعت (00:00)"
                        type="text"
                        v-model="last_name"
                        :rules="last_nameRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-textarea
                        label="توضیحات اختصاصی نوبت ..."
                        v-model="city"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-btn
                        class="searchshift"
                        color="#00acc1"
                        @click="store_user"
                        :loading="loading"
                        >ثبت نام</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
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
  name: "UpdateShift",
  components: {
    Sidebar,
  },
  props: {
    source: String,
  },
  data: () => ({
    valid: false,
    national_code: null,
    national_codeRules: [(v) => !!v || "فیلد نام پزشک اجباری می‌باشد"],
    name: null,
    nameRules: [(v) => !!v || "فیلد نوع کاشت اجباری می‌باشد"],
    last_name: null,
    last_nameRules: [(v) => !!v || "فیلد ساعت اجباری می‌باشد"],
    email: null,
    password: Math.floor(Math.random() * 1000 + 1000),
    birth: null,
    state: null,
    city: null,
    loading: false,
  }),
  methods: {
    undefinedCheck(text) {
      if (text == "undefined") {
        return null;
      } else {
        return text;
      }
    },
    store_user: function () {
      this.loading = true;
      let national_code = this.national_code;
      let name = this.name;
      let last_name = this.last_name;
      let phone_number = this.phone_number;
      let email = this.email;
      let password = this.password;
      let birth = this.birth;
      let state = this.state;
      let city = this.city;
      this.$store
        .dispatch("store_user", {
          national_code,
          name,
          last_name,
          phone_number,
          email,
          password,
          birth,
          state,
          city,
        })
        .then(() => {
          this.$fire({
            title: "ثبت نام کاربر انجام شد",
            text: "ثبت نام کاربر جدید با موفقیت انجام شد",
            type: "success",
            confirmButtonText: "بازگشت به لیست کاربران",
            focusConfirm: false,
          }).then((res) => {
            if (res.value) {
              this.loading = false;
              this.$router.push({ name: "Users" });
            }
          });
        })
        .catch(() => {
          this.$fire({
            title: "خطا !",
            text: "ثبت نام انجام نشد، لطفا مجدد تلاش نمایید",
            type: "error",
            confirmButtonText: "دوباره تلاش می‌کنم",
          }).then((r) => {
            console.log(r.value);
          });
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.searchshift {
  margin-top: 6px;
  padding: 22px 40px !important;
  color: #fff;
}
.searchshiftbtn {
  color: #fff;
}
</style>