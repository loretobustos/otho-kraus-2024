<template>
<el-container>
    <el-header>
        M&oacute;dulo ajustes
        <el-button type="info" icon="el-icon-back" circle @click="logout" title="logout"></el-button>
    </el-header>
    <el-container>

    </el-container>
</el-container>
</template>

<script>
import Firebase from 'firebase';

export default {
    methods: {
        logout() {
            Firebase.auth().signOut()
                .then(accept => {
                    this.$router.push('login');
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;

    .el-button {
        float: right;
        margin-top: 10px;
    }
}

.el-aside {
    color: #333;
}
</style>
