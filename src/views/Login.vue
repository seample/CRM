<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#321fdb" dark flat>
                <v-toolbar-title>پنل مدیریت</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <p>فرم ورود به پنل مدیریت</p>
                <v-form>
                  <v-text-field
                    label="ایمیل"
                    v-model="email"
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
                <!-- <v-btn color="#321fdb" text @click="forgotpassword">فراموشی رمز عبور</v-btn> -->
                <v-btn color="#321fdb" class="vbtn" :loading="loading" @click="login">ورود</v-btn>
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
      email: null,
      password: null,
      loading: false,
    };
  },
  props: {
    source: String,
  },
  methods: {
    login: function () {
      this.loading = true;
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          this.storeme();
        })
        .catch(() => {
          this.$fire({
            title: "خطا !",
            text: "نام کاربری و رمز عبور وارد شده صحیح نمی‌باشد",
            type: "error",
            confirmButtonText: "دوباره تلاش می‌کنم",
          }).then((r) => {
            console.log(r.value);
          });
          this.loading = false;
        });
    },
    storeme: function () {
      this.$store.dispatch("storeme").then(() => {
        // console.log(res);
        // window.location = "/";
        this.$router.push({ name: "Dashboard" });
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