<template>
  <div>
    <header>
    <img src="@/assets/logo-xl.png" alt="Havířovská bridžová akademie Logo" style="width: 120%; height: 120%;" />
  </header>
    <!-- Main Content -->
    <main>
      <section id="about">
        <h2>O nás</h2>
        <p>
          Havířovská bridžová akademie se zaměřuje na výuku a podporu mladých hráčů
          bridže. Jsme otevřeni všem, kteří se chtějí učit a bavit touto úžasnou
          hrou!
        </p>
      </section>

      <section id="events">
        <h2>Události</h2>
        <p>
          Připojte se k našim pravidelným turnajům a tréninkům! Sledujte naše
          novinky, aby vám nic neuteklo.
        </p>
      </section>

      <section id="contact">
        <h2>Kontakt</h2>
        <p>Email:  bridzhavirov@gmail.com</p>
        <p>IČO: 26585995</p>
        <p>číslo účtu: 2300926146/2010</p>
        <a href="mailto: bridzhavirov@gmail.com" class="cta-button">Napište nám</a>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "BridgeAcademy",
};
</script>

<style scoped>
/* General styles */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(120deg, #0044cc, #88ccff);
  color: white;
}

/* Header styles */
header {
  text-align: center;
}

header img {
  max-width: 300px;
  border-radius: 30px;
}


/* Navigation menu */
nav {
  text-align: center;
  margin: 20px 0;
}

nav a {
  margin: 0 15px;
  padding: 10px 20px;
  text-decoration: none;
  background-color: #0066cc;
  color: white;
  border-radius: 5px;
  transition: background 0.3s;
}

nav a:hover {
  background-color: #0044cc;
}

/* Main content */
main {
  padding: 20px;
  text-align: center;
}

main h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

main p {
  font-size: 1rem;
  margin: 10px 0;
}

.cta-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff6600;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
  margin-top: 20px;
  transition: background 0.3s;
}

.cta-button:hover {
  background-color: #cc5200;
}

/* Footer styles */
footer {
  text-align: center;
  padding: 10px;
  background-color: #002f6c;
  color: #ccc;
  font-size: 0.9rem;
}
</style>
