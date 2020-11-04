<template>
  <v-app id="inspire">
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>ویرایش پروفایل</v-card-title>
              <v-card-text>
                <p>لطفا تمامی فیلدها را با دقت تکمیل نمایید:</p>
              </v-card-text>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="نام"
                        type="text"
                        v-model="name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="نام خانوادگی"
                        type="text"
                        v-model="last_name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="موبایل"
                        type="text"
                        v-model="phone_number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="ایمیل"
                        type="text"
                        v-model="email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="رمز عبور"
                        type="text"
                        v-model="password"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <custom-date-picker
                        v-model="birth"
                        placeholder="تاریخ تولد"
                      ></custom-date-picker>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="استان"
                        type="text"
                        v-model="state"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="شهر"
                        type="text"
                        v-model="city"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-btn
                        class="searchshift"
                        color="#00acc1"
                        @click="editProfile"
                        >بروزرسانی</v-btn
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
  name: "NewShift",
  components: {
    Sidebar,
  },
  props: {
    source: String,
  },
  data: () => ({
    name: localStorage.name,
    last_name: localStorage.last_name,
    phone_number: localStorage.phone_number,
    email: localStorage.email,
    password: null,
    birth: localStorage.birth,
    state: localStorage.state,
    city: localStorage.city,
  }),
  methods: {
    undefinedCheck(text) {
      if (text == "undefined") {
        return null;
      } else {
        return text;
      }
    },
    editProfile: function () {
      let name = this.name;
      let last_name = this.last_name;
      let phone_number = this.phone_number;
      let email = this.email;
      let password = this.password;
      let birth = this.birth;
      let state = this.state;
      let city = this.city;
      this.$store
        .dispatch("editProfile", {
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
            title: "بروزرسانی انجام شد",
            text:
              "برای مشاهده صورتحساب خود و پرداخت آن بر روی گزینه زیر کلیک نمایید",
            type: "success",
            confirmButtonText: "بازگشت به پنل کاربری",
            focusConfirm: false,
          }).then((res) => {
            localStorage.setItem("name", this.name);
            localStorage.setItem("last_name", this.last_name);
            localStorage.setItem("phone_number", this.phone_number);
            localStorage.setItem("email", this.email);
            localStorage.setItem("birth", this.birth);
            localStorage.setItem("state", this.state);
            localStorage.setItem("city", this.city);
            if (res.value) {
              this.$router.push({ name: "Dashboard" });
            }
          });
        })
        .catch(() => {
          this.$fire({
            title: "خطا !",
            text: "صدور صورتحساب انجام نشد، لطفا مجدد تلاش نمایید",
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