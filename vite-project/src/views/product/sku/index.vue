<template>
  <el-card style="max-width: 1420px">
    <el-table border :data="skuArr">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="200px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="200px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="200px">
        <template #="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      prop="skuDesc"
      <el-table-column
        label="重量"
        width="200px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格"
        width="200px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="300px" fixed="right">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale ? 'Bottom' : 'Top'"
            @click="updataIsSale(row)"
          ></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button
            type="primary"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-popconfirm
            title="Are you sure to delete this?"
            @confirm="removeSku(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm> </template
      ></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 15, 20, 25]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="currentChangeHandler"
      @size-change="sizeChangeHandler"
    />
    <el-drawer v-model="drawer" title="查看商品详情" :direction="direction">
      <template #default>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="(item, index) in skuInfo.skuAttrValueList"
              >{{ item.valueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row style="margin: 10px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="(item, index) in skuInfo.skuSaleAttrValueList"
              >{{ item.saleAttrValueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row style="margin: 10px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img :src="item.imgUrl" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, resultProps } from "element-plus";
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSale,
  reqSkuInfo,
  reqRemoveSku,
} from "../../../api/product/sku";
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from "../../../api/product/sku/type";
import type { DrawerProps } from "element-plus";
let currentPage = ref<number>(1);
let pageSize = ref<number>(10);
let skuArr = ref<SkuData[]>();
let total = ref<number>(0);
const direction = ref<DrawerProps["direction"]>("rtl");
const drawer = ref(false);
let skuInfo = ref<SkuData>({
  category3Id: "", // 三级分类的ID
  spuId: "", // 已有的SPU的ID
  tmId: "", // SPU品牌的ID
  skuName: "", // sku名字
  price: "", // sku价格
  weight: "", // sku重量
  skuDesc: "", // sku的描述
  skuAttrValueList: [], // 初始化为空数组
  skuSaleAttrValueList: [], // 初始化为空数组
  skuDefaultImg: "", // sku图片地址
  isSale: 0,
  id: 0,
});
onMounted(() => {
  getHasSku();
});
const getHasSku = async () => {
  let result: SkuResponseData = await reqSkuList(
    currentPage.value,
    pageSize.value
  );
  if (result.code == 200) {
    skuArr.value = result.data.records;
    total.value = result.data.total;
  }
};
const currentChangeHandler = (currentPageNumber: number) => {
  currentPage.value = currentPageNumber;
  getHasSku();
};
const sizeChangeHandler = (pageSizeNumber: number) => {
  pageSize.value = pageSizeNumber;
  getHasSku();
};
const updataIsSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    let result = await reqCancelSale(row.id as number);
    if (result.code == 200) {
      ElMessage({
        type: "success",
        message: "下架成功",
      });
      getHasSku();
    }
  } else {
    let result = await reqSaleSku(row.id as number);
    if (result.code == 200) {
      ElMessage({
        type: "success",
        message: "上架成功",
      });
      getHasSku();
    }
  }
};
const findSku = async (row: SkuData) => {
  drawer.value = !drawer.value;
  let result = await reqSkuInfo(row.id as number);
  if (result.code == 200) {
    skuInfo.value = result.data;
  }
};
const removeSku = async (id: number) => {
  let result = await reqRemoveSku(id);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "删除成功" });
    getHasSku();
  } else {
    ElMessage({ type: "error", message: "删除失败" });
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
