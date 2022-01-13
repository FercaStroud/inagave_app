<template lang="pug">
f7-view()
  f7-page.bg-login(login-screen='')
    f7-block(style="top:-12%; position:relative")
      img(
        style="width:60%;left:20%;position:relative;"
        src="../assets/agave.svg"
      )
      img(
        style="width:60%;left:20%;position:relative;top:-35px;"
        src="../assets/logo.svg"
      )
      f7-block
        f7-list.glass(form='' inset)
          f7-list-input(type='text' name='username' placeholder='Correo Electrónico')
          f7-list-input(type='password' name='password' placeholder='Contraseña' )
      f7-block
        f7-button.margin-bottom.glass(@click='' outline) Inicia Sesión
        f7-button(@click='' fill popup-open=".popup-swipe-handler") Quiero Registrarme
        f7-block-footer
          | Some text about login information.
          br
          | Click &quot;Sign In&quot; to close Login Screen
  f7-popup.popup-swipe-handler(swipe-to-close)
    f7-page
      f7-navbar()
        f7-nav-left Cancelar
        f7-nav-title
          img(
            style="height:32px"
            src="../assets/agave.svg"
          )
        f7-nav-right Regístrame

      f7-block
        f7-list.glass()
          f7-list-input(type='text' name='' placeholder='Nombre(s)' clear-button )
          f7-list-input(type='text' name='' placeholder='Apellido Paterno' clear-button )
          f7-list-input(type='text' name='' placeholder='Apellido Materno' clear-button )
      f7-block
        f7-list.glass()
          f7-list-input(type='email' name='' placeholder='Correo Electrónico' clear-button )
      f7-block
        f7-list.glass()
          f7-list-input(type='text' name='' placeholder='Dirección' clear-button )
          f7-list-input(type='text' name='' placeholder='País' clear-button )
          f7-list-input(type='text' name='' placeholder='Ciudad' clear-button )
          f7-list-input(type='text' name='' placeholder='Estado' clear-button )
          f7-list-input(type='text' name='' placeholder='Municipio' clear-button)
      f7-block
        f7-list.glass()
          f7-list-input(type='password' name=''  placeholder='Contraseña' clear-button )
</template>

<script>
export default {
  name: "login.vue"
}
</script>

<style scoped>

</style>
