<template>
  <v-app id="inspire">
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>ثبت نوبت جدید</v-card-title>

              <v-form v-model="valid">
                <v-container>
                  <p>خدمات و تاریخ مورد نظر خود را وارد نمایید:</p>
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
                      >جستجو</v-btn>
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
                    <td>{{row.item.name}}</td>
                    <td>{{row.item.date}}</td>
                    <td>{{row.item.clock}}</td>
                    <td>
                      {{(row.item.Uname == null) ? '' : `${row.item.Uname.name} ${row.item.Uname.last_name}`}}
                      <br />
                      {{(row.item.Uname == null) ? '' : 'کد ملی: ' + row.item.Uname.national_code}}
                      <br />
                      {{(row.item.Uname == null) ? '' : 'موبایل: ' + row.item.Uname.phone_number}}
                    </td>
                    <td>{{row.item.method}}</td>
                    <td>{{row.item.nobat}}</td>
                    <td>{{row.item.status}}</td>
                    <td align="left">
                      <v-btn
                        color="success"
                        class="searchshiftbtn"
                        :disabled="row.item.disabled"
                        @click="updateshift(row.item.id)"
                      >{{row.item.btn}}</v-btn>
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
      {
        text: "ساعت",
        value: "clock",
      },
      {
        text: "کاربر",
        value: "user",
      },
      {
        text: "نوع کاشت",
        value: "method",
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
                id: robot.id,
                name: robot.service_title,
                date: robot.date.replace(/-/g, "/"),
                clock: robot.clock,
                Uname: robot.user,
                method: robot.method,
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
                  "مدیریت نوبت"
                ),
                disabled: false,
              };
            } else {
              return {
                id: robot.id,
                name: robot.service_title,
                date: robot.date.replace(/-/g, "/"),
                clock: robot.clock,
                Uname: robot.user,
                method: robot.method,
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
                  "مدیریت نوبت"
                ),
                disabled: false,
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
    updateshift(id) {
      localStorage.setItem("shiftId", id);
      this.$router.push({ name: "UpdateShift" });
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
            id: robot.id,
            name: robot.service_title,
            date: robot.date.replace(/-/g, "/"),
            clock: robot.clock,
            Uname: robot.user,
            method: robot.method,
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
            btn: robot.status.replace(/bookable|reserved|done/g, "مدیریت نوبت"),
            disabled: false,
          };
        } else {
          return {
            id: robot.id,
            name: robot.service_title,
            date: robot.date.replace(/-/g, "/"),
            clock: robot.clock,
            Uname: robot.user,
            method: robot.method,
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
            btn: robot.status.replace(/bookable|reserved|done/g, "مدیریت نوبت"),
            disabled: false,
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