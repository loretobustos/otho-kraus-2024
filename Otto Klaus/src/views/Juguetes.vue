<template>
  <div class="juguetes">
    <el-row>
      <el-col><el-link @click="cerrarSesion">Cerrar sesión</el-link></el-col>
      <el-col><h1>Bienvenido a Otto Klaus</h1></el-col>
    </el-row>

    <el-row>
      <el-button
        type="primary"
        icon="el-icon-plus"
        circle
        title="Agregar Juguete"
        @click="agregar"
      ></el-button>
    </el-row>
    <div>
      <el-table :data="juguetesConStock">
        <el-table-column prop="data.codigo" label="Código"></el-table-column>
        <el-table-column prop="data.nombre" label="Nombre"></el-table-column>
        <el-table-column prop="data.stock" label="Stock"></el-table-column>
        <el-table-column prop="data.precio" label="Precio"></el-table-column>
        <el-table-column label="Acciones">
          <template slot-scope="scope">
            <el-button
              @click="editar(juguetesConStock[scope.$index])"
              type="text"
              size="small"
              >Editar</el-button
            >
            <el-button
              @click="dialogEliminar(juguetesConStock[scope.$index].id)"
              type="text"
              size="small"
              >Eliminar
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Firebase from "firebase";

export default {
  data() {
    return {};
  },
  mounted() {
    this.getJuguetes();
  },
  computed: {
    ...mapGetters(["juguetesConStock"]),
  },
  methods: {
    ...mapActions(["getJuguetes", "eliminarJuguete"]),
    agregar() {
      this.$router.push({ name: "agregar" });
    },
    editar(juguete) {
      this.$router.push({ name: "editar", params: { juguete: juguete } });
    },
    dialogEliminar(jugueteID) {
      this.$confirm(
        "Borrará el juguete seleccionado. ¿Desea continuar?",
        "Warning",
        {
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then(async () => {
          await this.eliminarJuguete(jugueteID);
          let options = { type: "success", message: "Juguete eliminado" };

          this.$message({
            ...options,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Acción cancelada",
          });
        });
    },
    cerrarSesion() {
      Firebase.auth()
        .signOut()
        .then(
          (accept) => {
            this.$router.push({ name: "login" });
          },
          (reject) => {
            var errorCode = reject.code;
            this.loading = false;
            this.$message({
              showClose: true,
              message: reject.message,
              type: "error",
            });
          }
        );
    },
  },
};
</script>

<style scoped>
.juguetes {
  padding: 60px;
}
</style>
