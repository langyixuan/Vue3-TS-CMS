<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <el-row>
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round>Success</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </el-row>
  </div>
  <router-view />
</template>

<style lang="scss"></style>
