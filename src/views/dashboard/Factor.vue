<template>
  <v-app id="inspire">
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>تایید نوبت و پرداخت بیعانه</v-card-title>
              <v-form v-model="valid">
                <v-container>
                  <p>
                    در صورت تایید اطلاعات مبلغ بیعانه مورد نظر را وارد و پرداخت
                    نمایید:
                  </p>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-select
                        :items="services"
                        label="خدمات مورد نظر را انتخاب کنید"
                        v-model="service"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <custom-date-picker v-model="date"></custom-date-picker>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-btn
                        class="searchshift"
                        color="#00acc1"
                        @click="search"
                        :loading="searchLoading"
                        >جستجو</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-data-table
                :headers="headers"
                :items="desserts"
                :items-per-page="10"
                class="elevation-1"
                :loading="Tloading"
              >
                <template v-slot:item="row">
                  <tr>
                    <td>{{ row.item.name }}</td>
                    <td>{{ row.item.date }}</td>
                    <td>{{ row.item.nobat }}</td>
                    <td>{{ row.item.status }}</td>
                    <td align="left">
                      <v-btn
                        color="success"
                        class="searchshiftbtn"
                        :disabled="row.item.disabled"
                        @click="reserve(row.item.id)"
                        >{{ row.item.btn }}</v-btn
                      >
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
    date: null,
    valid: false,
    Tloading: false,
    services: [],
    service: null,
    searchLoading: false,
    headers: [
      {
        text: "عنوان",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "تاریخ",
        value: "date",
      },
      { text: "نوبت", value: "nobat" },
      { text: "وضعیت", value: "status" },
      { text: "", value: "btn", align: "end", sortable: false },
    ],
    desserts: [],
  }),
  methods: {
    search: function () {
      let date = this.date;
      let service_id = this.service;
      this.searchLoading = true;
      this.Tloading = true;
      this.$store
        .dispatch("searchShift", { date, service_id })
        .then((res) => {
          // window.location = "/";
          this.desserts = res.data.data.map((robot) => {
            if (robot.status === "bookable") {
              return {
                name: robot.service_title,
                date: robot.date.replace(/-/g, "/"),
                nobat: robot.time.replace(/morning|evening/g, (x) => {
                  if (x === "morning") {
                    return "نوبت صبح";
                  } else {
                    return "نوبت عصر";
                  }
                }),
                status: robot.status.replace(/bookable|reserved|done/g, (x) => {
                  if (x === "bookable") {
                    return "قابل رزرو";
                  } else if (x === "reserved") {
                    return "رزرو شده";
                  } else {
                    return "انجام شده";
                  }
                }),
                btn: robot.status.replace(
                  /bookable|reserved|done/g,
                  "ثبت نوبت"
                ),
                disabled: false,
              };
            } else {
              return {
                name: robot.service_title,
                date: robot.date.replace(/-/g, "/"),
                nobat: robot.time.replace(/morning|evening/g, (x) => {
                  if (x === "morning") {
                    return "نوبت صبح";
                  } else {
                    return "نوبت عصر";
                  }
                }),
                status: robot.status.replace(/bookable|reserved|done/g, (x) => {
                  if (x === "bookable") {
                    return "قابل رزرو";
                  } else if (x === "reserved") {
                    return "رزرو شده";
                  } else {
                    return "انجام شده";
                  }
                }),
                btn: robot.status.replace(
                  /bookable|reserved|done/g,
                  "ثبت نوبت"
                ),
                disabled: true,
              };
            }
          });
          // console.log(res.data.data);
          this.searchLoading = false;
          this.Tloading = false;
        })
        .catch(() => {
          this.$fire({
            title: "خطا !",
            text: "اتصال با سرور برقرار نمی‌باشد",
            type: "error",
            confirmButtonText: "دوباره تلاش می‌کنم",
          });
          this.searchLoading = false;
        });
    },
    reserve() {
      this.$fire({
        title: "تایید رزرو نوبت",
        text:
          "در صورت اطمینان از تایید نوبت انتخاب شده بر روی گزینه پرداخت بیعانه کلیک نمایید",
        type: "success",
        confirmButtonText: "پرداخت بیعانه",
        cancelButtonText: "انصراف",
        showCancelButton: true,
        cancelButtonColor: "#d33",
      }).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    this.$store.dispatch("services").then((res) => {
      this.services = res.data.data.map((robot) => {
        return { value: robot.id, text: robot.title };
      });
      // console.log(this.services);
    });
    this.Tloading = true;
    this.$store.dispatch("shifts").then((resu) => {
      this.desserts = resu.data.data.map((robot) => {
        if (robot.status === "bookable") {
          return {
            name: robot.service_title,
            date: robot.date.replace(/-/g, "/"),
            nobat: robot.time.replace(/morning|evening/g, (x) => {
              if (x === "morning") {
                return "نوبت صبح";
              } else {
                return "نوبت عصر";
              }
            }),
            status: robot.status.replace(/bookable|reserved|done/g, (x) => {
              if (x === "bookable") {
                return "قابل رزرو";
              } else if (x === "reserved") {
                return "رزرو شده";
              } else {
                return "انجام شده";
              }
            }),
            btn: robot.status.replace(/bookable|reserved|done/g, "ثبت نوبت"),
            disabled: false,
          };
        } else {
          return {
            name: robot.service_title,
            date: robot.date.replace(/-/g, "/"),
            nobat: robot.time.replace(/morning|evening/g, (x) => {
              if (x === "morning") {
                return "نوبت صبح";
              } else {
                return "نوبت عصر";
              }
            }),
            status: robot.status.replace(/bookable|reserved|done/g, (x) => {
              if (x === "bookable") {
                return "قابل رزرو";
              } else if (x === "reserved") {
                return "رزرو شده";
              } else {
                return "انجام شده";
              }
            }),
            btn: robot.status.replace(/bookable|reserved|done/g, "ثبت نوبت"),
            disabled: true,
          };
        }
      });
      // console.log(this.desserts);
      this.Tloading = false;
    });
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