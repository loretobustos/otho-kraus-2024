<template>
  <div>
    <h1>Editar Juguete</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Código">
        <el-input v-model="form.codigo" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Nombre">
        <el-input v-model="form.nombre"></el-input>
      </el-form-item>
      <el-form-item label="Stock">
        <el-input v-model="form.stock"></el-input>
      </el-form-item>
      <el-form-item label="Precio">
        <el-input v-model="form.precio"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="volver">Volver</el-button>
        <el-button type="primary" @click="dialogActualizar(form)"
          >Actualizar Juguete</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["juguete"],
  data() {
    return {
      form: {
        codigo: "",
        nombre: "",
        stock: "",
        precio: "",
      },
    };
  },
  mounted() {
    this.form = this.juguete.data;
  },
  methods: {
    ...mapActions(["actualizarJuguete"]),
    dialogActualizar(juguete) {
      this.$confirm(
        "Actualizará el juguete seleccionado. ¿Desea continuar?",
        "Warning",
        {
          confirmButtonText: "Actualizar",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then(async () => {
          const juguete = this.form;
          const id = this.juguete.id;
          await this.actualizarJuguete({ juguete, id });
          let options = { type: "success", message: "Juguete actualizado" };

          this.$message({
            ...options,
          });
          this.$router.push({ name: "juguetes" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Acción cancelada",
          });
        });
    },
    volver() {
      this.$router.push({ name: "juguetes" });
    },
  },
};
</script>
