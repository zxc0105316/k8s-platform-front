<template>
    <div class="main-body-div">

      <el-row>
        <!--图片-->
        <el-col :span="24">

          <img class="main-body-img" src="../../assets/img/404.png"  alt=""/>

        </el-col>

        <el-col :span="24">
          <div>
            <p class="status-code">
                404
            </p>
            <p class="status-describe">你访问的页面不存在······</p>
          </div>
        </el-col>

      </el-row>

    </div>
</template>

<script>
export default {

  name: "404View"
}
</script>

<style scoped>

。main-body-img {
    margin-top: 150px;
}

.main-body-div {

  text-align: center;
  height: 100vh;
  width: 100vh;

}

.status-code{

  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 95px;
  font-weight: bold;
  color: rgb(54,95,230);

}

.status-describe{
  color: rgb(145,143,143)
}




</style>
