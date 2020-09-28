<template>
  <div>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div>
          <div slot="header">Test</div>

          <div>
            <!-- 搜索 -->
            <el-divider content-position="left">搜索</el-divider>
            <search-wrap>
              <el-form ref="form" :model="form" label-width="80px">
                <search-item>
                  <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </search-item>
                <search-item>
                  <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </search-item>
                <search-item>
                  <el-form-item label="活动名称">
                    <el-date-picker
                      v-model="form.loadDate"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      value-format="timestamp"
                      type="daterange"
                      range-separator="-"
                      :default-time="['00:00:00', '23:59:59']"
                    >
                    </el-date-picker>
                  </el-form-item>
                </search-item>
                <search-item>
                  <el-form-item label="活动时间">
                    <el-date-picker
                      v-model="form.date1"
                      type="date"
                      placeholder="选择日期"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-form-item>
                </search-item>
              </el-form>
            </search-wrap>

            <!-- 数据字典 -->
            <el-divider content-position="left">数据字典</el-divider>
            <el-button @click="getDic('price-type')">
              获取数据字典 price-type
            </el-button>
            <el-button @click="getDic('return-type')">
              获取数据字典 return-type
            </el-button>

            <el-button
              @click="getDics(['return-type', 'price-type', 'down-type'])"
            >
              批量获取数据字典 return-type price-type
            </el-button>

            <!-- other -->
            <el-divider content-position="left">other</el-divider>
            <el-input v-model="input"></el-input>

            <!-- little -->
            <el-divider content-position="left">little</el-divider>
            <el-button @click="ab">error</el-button>
            <el-button @click="aa">loading </el-button>

            <el-button @click="dialoga = true"> 弹框1 </el-button>
            <el-button @click="dialogb = true"> 弹框2 </el-button>

            <!-- 表格 -->
            <el-divider content-position="left">表格</el-divider>
            <el-table :data="tableData" stripe>
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
            </el-table>

            <el-divider content-position="left">分页</el-divider>
            <Pagination :total="500" :current-page="5" @current-change="aaa" />

            <el-divider content-position="left">图片查看</el-divider>
            <!-- tyest -->
            <el-button @click="viewPic"> 图片查看 </el-button>
            <el-divider content-position="left">upload</el-divider>
            <!-- upload1 -->
            {{ curkeyList }}
            <br />
            {{ imgkeyList }}

            <d5c-upload :imgkey-list.sync="imgkeyList1" name="测试上传" />
            <d5c-upload
              :is-see="true"
              :imgkey-list.sync="imgkeyList"
              :curkey-list="curkeyList"
              name="测试上传"
            />
            <br /><br /><br />

            <!-- upload2 -->
            {{ curkeyList2 }}
            <br />
            {{ imgkeyList2 }}

            <d5c-upload
              :imgkey-list.sync="imgkeyList2"
              :curkey-list="curkeyList2"
              mode="picture-card"
              name="测试上传"
            />
            <d5c-upload
              :is-see="true"
              :imgkey-list.sync="imgkeyList2"
              :curkey-list="curkeyList2"
              mode="picture-card"
              name="测试上传"
            />

            <!-- 弹框 -->
            <Dialog :visible.sync="dialoga" title="asd">
              <div>asdasd</div>
            </Dialog>
            <Dialog :visible.sync="dialogb" title="asd">
              <div v-for="n in 100" :key="n">
                {{ n }}
              </div>
            </Dialog>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Test",
  data() {
    return {
      form: {},
      input: "",
      queryForm: {},
      nodeEnv: process.env.NODE_ENV,
      dialoga: false,
      dialogb: false,
      imgkeyList1: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      imgkeyList: [],
      curkeyList: [],
      imgkeyList2: [],
      curkeyList2: [],
    };
  },
  computed: {
    ...mapGetters({
      userId: "user/userId",
    }),
  },
  created() {
    console.log(this.$route.fullPath, "created");
    console.log(this.$store.getters);
  },
  mounted() {
    this.curkeyList = [
      "J95EE039330126D5D6F",
      "J996C9ECEC01274E3D2",
      "JF60C7DC3D01275356D",
      "J8F5977BB5013A34122",
    ];
    this.curkeyList2 = [
      "J95EE039330126D5D6F",
      "J996C9ECEC01274E3D2",
      "JF60C7DC3D01275356D",
      "J8F5977BB5013A34122",
    ];
  },
  activated() {
    console.log(this.$route.fullPath, "activated");
  },
  methods: {
    aaa(page) {
      console.log("aaa -> page", page);
    },
    aa() {
      this.$baseLoading();
    },
    ab() {
      console.log(error);
    },
    viewPic() {
      this.$viewer({
        urlList: [
          "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
          "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
        ],
        curIndex: 1, //默认展示urlList数组下标
        onSwitch: (val) => {
          console.log(val);
        },
        close: () => {
          console.log("cancel");
        },
      });
    },
    async getDic(key) {
      const data = await this.$store.dispatch("dictionary/get", key);
      console.log("yemian -> data", data);
    },
    async getDics(keyarr) {
      const data = await this.$store.dispatch("dictionary/getAll", keyarr);
      console.log("yemian -> data", data);
    },
  },
};
</script>
