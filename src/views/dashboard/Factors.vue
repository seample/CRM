<template>
  <v-app id="inspire">
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>صورت حساب‌ها</v-card-title>
              <v-card-text>
                <p>در این قسمت لیست صورت حسابهای خود را می‌توانید مشاهده نمایید و آنها را پرداخت کنید.</p>
              </v-card-text>
              <v-card-title>
                <v-col cols="12" md="5">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="جستجو ..."
                    single-line
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="desserts"
                :items-per-page="10"
                class="elevation-1"
                :loading="Tloading"
                :search="search"
              >
                <template v-slot:item="row">
                  <tr>
                    <td>{{row.item.name}} {{row.item.last_name}}</td>
                    <td>{{row.item.national_code}}</td>
                    <td>{{row.item.phone_number}}</td>
                    <td>{{formatPrice(row.item.invoice_amount)}} تومان</td>

                    <td>{{factorStatus(row.item.status)}}</td>
                    <td>{{factordate(row.item.receipt_date)}}</td>
                    <td>{{factordate(row.item.payment_date)}}</td>
                  </tr>
                </template>
              </v-data-table>
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
        <a href="https://saeeclinic.com" target="_blank">دپارتمان انفورماتیک ساعی</a>
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
    Tloading: false,
    search: null,
    headers: [
      {
        text: "نام و نام خانوادگی",
        value: "name",
      },
      {
        text: "کد ملی",
        value: "national_code",
      },
      {
        text: "موبایل",
        value: "phone_number",
      },
      {
        text: "مبلغ",
        value: "invoice_amount",
      },
      {
        text: "وضعیت",
        value: "status",
      },
      { text: "تاریخ صدور", value: "receipt_date" },
      { text: "تاریخ پرداخت", value: "payment_date" },
    ],
    desserts: [],
  }),
  created() {
    this.Tloading = true;
    this.$store.dispatch("factors").then((resu) => {
      this.desserts = resu.data.data.map((robot) => {
        return {
          national_code: robot.user.national_code,
          name: robot.user.name,
          last_name: robot.user.last_name,
          phone_number: robot.user.phone_number,
          invoice_amount: robot.invoice_amount,
          receipt_date: robot.receipt_date,
          payment_date: robot.payment_date,
          status: robot.status,
          btn: robot.status.replace(/Waiting|accepted/g, "پرداخت"),
          disabled: false,
        };
      });
      // console.log(this.desserts);
      this.Tloading = false;
    });
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    factorStatus(status) {
      if (status == "Waiting") {
        return "پرداخت نشده";
      } else {
        return "پرداخت شده";
      }
    },
    factorbtn(status) {
      if (status === "Waiting") {
        return false;
      } else {
        return true;
      }
    },
    factorinfo(information) {
      if (information == null) {
        return "بدون توضیحات";
      } else {
        return information;
      }
    },
    factordate(date) {
      if (date == null) {
        return "0000/00/00";
      } else {
        return date.replace(/-/g, "/");
      }
    },
    pay(status, id) {
      if (status === "Waiting") {
        let userId = localStorage.id;
        let url = "https://crm.saeeclinic.com/api/public";
        // let url = "http://localhost:8000";
        window.open(`${url}/user/gateway/${userId}/${id}/`, "_blank");
      }
    },
  },
};
</script>

<style scoped>
</style>