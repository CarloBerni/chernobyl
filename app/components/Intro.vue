<template>
  <div class="big-container">
    <div class="container__intro">
      <p>Pendant 15 ans, seuls les 56 premiers décès ont étés reconnus par les autorités. <span>Tchernobyl</span> est une catastrophe dont l'ampleur est encore constituée de zones d’ombres</p>
      <p>Découvrez les <span>témoignages</span> poignants des <span>habitants de Prypiat</span>  et les acteurs majeures, au premier rang de la catastrophe. À travers leurs récits, vous serez <span>plongez dans l’histoire</span> qu’ils nous racontent, l’histoire qu’ils ont vécu.</p>
      <p>Immergez vous dans la ville de Prypiat et allez à leur rencontre à fin de receuillir les différents témoignages en cliquant sur la <span>carte</span>.</p>
      <router-link class="button" to="/map">
        Se rendre à Pripyat
        <img src="../assets/images/map.png" alt="map">
      </router-link>
    </div>
    <p
      class="disclaimer__intro"
    >Ce site à été réalisé à des fins pédagogiques dans le cadre du cursus Bachelor de l’école HETIC. Les contenus présentés ne sont en aucun cas exploités à des fins commerciales et ne seront pas publiés.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "intro"
    };
  }
};
</script>

<style lang="scss" scoped>
.big-container {
  background: url("../assets/images/bg__intro.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
}
.container__intro {
  text-align: center;
  color: white;
  font-size: 1.5em;
  margin-left: 180px;
  margin-right: 180px;
  padding: 50px;
  margin-bottom: 10%;
  p{
    margin: 100px;
    line-height: 39px;
  }
  span{
    color: #A50104;

  }
}
.button {
  display: inline-flex;
  align-items: center;
  img {
    height: 25px;
    margin-left: 25px;
  }
}
.disclaimer__intro {
  font-size: 14px;
  position: absolute;
  color: white;
  top: 97%;
}
</style>
