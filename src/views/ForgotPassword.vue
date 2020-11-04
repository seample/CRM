<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#321fdb" dark flat>
                <v-toolbar-title>بازیابی رمز عبور</v-toolbar-title>

                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <p>کد ملی خود را برای دریافت رمز جدید وارد نمایید</p>
                <v-form>
                  <v-text-field
                    label="کد ملی"
                    v-model="national_code"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#321fdb" text @click="login">ورود</v-btn>
                <v-btn color="#321fdb" text @click="register">ثبت نام</v-btn>
                <v-btn color="#321fdb" class="vbtn" :loading="loading" @click="forgotpass">ارسال رمز</v-btn>
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
      loading: false,
      national_code: null,
    };
  },
  methods: {
    forgotpass: function () {
      this.loading = true;
      let national_code = this.national_code;
      this.$store.dispatch("resetpass", { national_code }).then((res) => {
        this.$fire({
          title: res.data.title,
          text: res.data.message,
          type: res.data.status,
          confirmButtonText: "بستن",
        }).then((r) => {
          console.log(r.value);
        });
        this.loading = false;
        this.national_code = null;
      });
    },
    login: function () {
      this.$router.push({ name: "Login" });
    },
    register: function () {
      this.$router.push({ name: "Register" });
    },
  },
  props: {
    source: String,
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