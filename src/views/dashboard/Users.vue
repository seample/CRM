<template>
  <v-app id="inspire">
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>لیست کاربران</v-card-title>
              <v-card-text>
                <p>در این قسمت لیست کاربران سایت را مشاهده می‌کنید.</p>
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
                    <td>{{row.item.national_code}}</td>

                    <td>{{row.item.name}} {{row.item.last_name}}</td>
                    <td>{{row.item.phone_number}}</td>
                    <td>{{row.item.created_at}}</td>
                    <td align="left">
                      <v-btn
                        color="success"
                        class="searchshiftbtn"
                        :disabled="row.item.disabled"
                      >ویرایش اطلاعات</v-btn>
                    </td>
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
        text: "کد ملی",
        value: "national_code",
      },
      {
        text: "نام و نام خانوادگی",
        value: "name",
      },
      { text: "موبایل", value: "phone_number" },
      { text: "تاریخ عضویت", value: "created_at" },
      { text: "", value: "btn", align: "end", sortable: false },
    ],
    desserts: [],
  }),
  created() {
    this.Tloading = true;
    this.$store.dispatch("users").then((resu) => {
      this.desserts = resu.data.data.map((robot) => {
        return {
          national_code: robot.national_code,
          name: robot.name,
          last_name: robot.last_name,
          phone_number: robot.phone_number,
          created_at: robot.created_at.substr(0, 10).replace(/-/g, "/"),
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