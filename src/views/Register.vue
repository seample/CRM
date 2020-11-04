<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#321fdb" dark flat>
                <v-toolbar-title>عضویت</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <p>فرم عضویت در سایت</p>
                <v-form>
                  <v-text-field label="نام" v-model="name" prepend-icon="mdi-account" type="text"></v-text-field>
                  <v-text-field
                    label="نام خانوادگی"
                    v-model="last_name"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="کد ملی"
                    v-model="national_code"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="موبایل"
                    v-model="phone_number"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="رمز عبور"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#321fdb" text @click="forgotpassword">فراموشی رمز عبور</v-btn>
                <v-btn color="#321fdb" text @click="login">ورود</v-btn>
                <v-btn color="#321fdb" class="vbtn" :loading="loading" @click="register">ثبت نام</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      last_name: null,
      national_code: null,
      phone_number: null,
      password: null,
      loading: false,
    };
  },
  props: {
    source: String,
  },
  methods: {
    login: function () {
      this.$router.push({ name: "Login" });
    },
    forgotpassword: function () {
      this.$router.push({ name: "ForgotPassword" });
    },
    register: function () {
      this.loading = true;
      let data = {
        name: this.name,
        last_name: this.last_name,
        national_code: this.national_code,
        phone_number: this.phone_number,
        password: this.password,
      };
      this.$store
        .dispatch("register", data)
        .then(() => {
          this.$fire({
            title: "ثبت نام انجام شد",
            text: "برای ورود کد ملی و روز عبور خود را وارد نمایید",
            type: "success",
            confirmButtonText: "باشه",
          }).then((r) => {
            console.log(r.value);
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.$fire({
            title: "خطا !",
            text: "اطلاعات وارد شده تکراری و یا صحیح نمی‌باشد",
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
.v-input .v-input__prepend-outer .v-input__icon .theme--light.v-icon {
  color: rgba(0, 0, 0, 0.54) !important;
}
.v-toolbar__title {
  color: #fff !important;
}
.vbtn {
  color: #fff !important;
}
</style>