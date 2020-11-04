<template>
  <v-app id="inspire">
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>پرداخت بیعانه</v-card-title>
              <v-form v-model="valid">
                <v-container>
                  <p>
                    مبلغ بیعانه را به تومان وارد نمایید و بر روی گزینه صدور صورت
                    حساب کلیک کنید:
                  </p>
                  <p>
                    <strong style="color: red"
                      >حداقل مبلغ بیعانه ۲۰۰،۰۰۰ تومان می‌باشد</strong
                    >
                  </p>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="مبلغ (تومان)"
                        v-model="price"
                        type="number"
                        autofocus
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        label="کد تخفیف خود را وارد نمایید"
                        type="number"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                      <v-btn
                        class="searchshift"
                        color="#00acc1"
                        :loading="Tloading"
                        @click="storeFactor"
                        >صدور صورتحساب</v-btn
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
    valid: false,
    Tloading: false,
    price: null,
    shift_id: localStorage.shift_id,
    user_id: localStorage.id,
  }),
  methods: {
    storeFactor: function () {
      this.Tloading = true;
      let shift_id = this.shift_id;
      let price = this.price;
      let user_id = this.user_id;
      this.$store
        .dispatch("storeFactor", { user_id, shift_id, price })
        .then(() => {
          this.$fire({
            title: "صورت حساب صادر شد",
            text:
              "برای مشاهده صورتحساب خود و پرداخت آن بر روی گزینه زیر کلیک نمایید",
            type: "success",
            confirmButtonText: "رفتن به صفحه صورت حسابها",
            focusConfirm: false,
          }).then((res) => {
            localStorage.removeItem("shift_id");
            if (res.value) {
              this.$router.push({ name: "Factors" });
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
  created() {},
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