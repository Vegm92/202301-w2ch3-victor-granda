const flights = [
  { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

const user = {
  name: "",
  typeUser: "",
};

const sessionType = () => {
  user.typeUser = prompt("Hola!, ¿Quieres acceder como user o admin?");
  if (user)
    while (user.typeUser !== "admin" && user.typeUser !== "user") {
      user.typeUser = prompt(
        "Escribe únicamente user o admin para continuar..."
      );
    }
  while (user.typeUser === "user") {
    alert("Accediendo como user");
    return userFunct();
  }
  while (user.typeUser === "admin") {
    alert("Accediendo como admin");
    return adminFunct();
  }
  return user.typeUser;
};

const userFunct = () => {
  const bienvenida = () => {
    //let usuario ="";
    do {
      user.name = prompt("Hola! Introduce tu nombre por favor");
      if (user.name === "") {
        alert(`Bienvenido usuario anónimo ;)`);
        return (user.name = "anónimo");
      }
      if (!isNaN(user.name)) {
        alert(`Introduce únicamente letras por favor.`);
        user.name = prompt(" Introduce tu nombre por favor");
      }
      if (user.name === null) {
        if (confirm("¿Deseas salir?")) {
          goodbye();
        } else {
          continue;
        }
      } else {
        alert(`¡Bienvenid@ ${user.name}!`);
        return user.name;
      }
    } while (user.name !== "");
  };

  const panelInformativo = () => {
    let infoVuelo = [];
    let ultimosVuelos = [];

    flights.forEach((element) => {
      infoVuelo.push(
        `El vuelo nº: ${element.id} con origen ${element.from} y con destino ${element.to} tiene un coste de ${element.cost} €.`
      );
      if (element.id > 4) {
        ultimosVuelos.push(element.to);
      }
    });
    alert(`Ésta es la tabla de vuelos de hoy ${user.name}`);
    console.table(infoVuelo);
    console.log(
      `Los últimos 5 vuelos del día serán con destino: ${ultimosVuelos}`
    );
  };

  const costeMedio = () => {
    let costeMedio = 0;
    let coste = flights
      .map((element) => element.cost)
      .reduce((a, b) => a + b, 0);
    costeMedio = coste / flights.length;
    console.log(`El Coste medio de los vuelos es de ${costeMedio}€`);
  };

  const vuelosEscala = () => {
    let escalas = flights.filter((escala) => escala.scale === true);
    let vuelosEscala = escalas.map((escala) => escala.to);
    console.log(`Los vuelos con destino ${vuelosEscala} deberán hacer escala`);
  };

  const buscarVuelos = () => {
    let buscarPrecio = false;
    let resultBusqueda = [];

    if (confirm(`¿Quieres hacer una busqueda por precio?`)) {
      buscarPrecio = true;
    } else {
      return (buscarPrecio = false);
    }
    do {
      const buscar = prompt(`Introduce el precio máximo:`);
      while (buscar === 0 || isNaN(buscar) || buscar === undefined) {}
      console.log(`Éstos son los vuelos por ${buscar} o menos:`);

      flights.forEach((element) => {
        if (element.cost <= buscar) {
          resultBusqueda.push(element);
        }
      });
      console.table(resultBusqueda);
      if (confirm(`¿Quieres volver a buscar?`)) {
        resultBusqueda = [];
      } else {
        buscarPrecio = false;
      }
    } while (buscarPrecio === true);
    {
    }
  };

  bienvenida();
  panelInformativo();
  costeMedio();
  vuelosEscala();
  buscarVuelos();
  goodbye();
};

const adminFunct = () => {
  let nuevoVuelo = {};
  let updatedFlights = {};

  do {
    if (confirm("¿Quieres añadir u nuevo vuelo?") && flights.length < 16) {
      const crearVuelos = (from, to, cost, scale, id) => {
        id = flights.length;
        to = prompt(`Introduce el destino:`);
        while (to === null || to === "" || to.match(/\d+/)) {
          alert("Debes introducir un destino válido");
          to = prompt("Nombre del destino:");
        }
        from = prompt(`Introduce el origen:`);
        while (from === null || from === "" || from.match(/\d+/)) {
          alert("Debes introducir un origen válido");
          from = prompt("Nombre del origen:");
        }
        cost = +prompt(`Introduce el coste:`);
        while (cost === 0 || isNaN(cost) || cost === undefined) {
          alert("Debes introducir un coste, únicamente números");
          cost = +prompt("Coste del vuelo:");
        }
        scale = confirm(`Tiene escalas?`);

        nuevoVuelo = { id, to, from, cost, scale };
        flights.push(nuevoVuelo);
        console.clear();
        console.table(flights);
        return alert(`El vuelo ${nuevoVuelo.id} se añadió correctamente`);
      };
      crearVuelos();
    } else {
      if (confirm("¿Quieres elimiar un vuelo?")) {
        const eliminarVuelos = () => {
          console.table(flights);
          const idDelete = Number(
            prompt(`Introduce el ID del vuelo a eliminar: `)
          );
          flights.splice(idDelete, 1);
          console.clear();
          console.table(flights);
          return alert(`El vuelo ${idDelete} se ha eliminado`);
        };
        eliminarVuelos();
      }
    }

    if (
      flights.length < 15 &&
      confirm(`Continuar editando vuelos? (total vuelos: ${flights.length}/15)`)
    ) {
      if (flights.length >= 15) {
        alert(`Ya has llegado al limite de 15 vuelos`);
      }
      console.table(flights);
      return adminFunct();
    } else {
      if (confirm("Seguir como admin?")) {
        return adminFunct();
      } else {
        if (confirm("Salir de la aplicación?")) {
          user.typeUser = "";
          return goodbye();
        }
      }
    }
  } while (user.typeUser === "admin");
  {
  }
};

const goodbye = () => {
  console.log(`Hasta la próxima ${user.name}`);
  return (user.typeUser = "");
};

//newmain

const main = () => {
  sessionType();
  do {
    while (user.typeUser === "admin") {
      return adminFunct();
    }
    while (user.typeUser === "user") {
      return userFunct();
    }
  } while (user.typeUser !== "");
  {
  }
};
main();

const bomboRandom = (min, max) => {
  let pulledNumbers = [];
  do {
    bombo = Math.floor(Math.random() * (max - min) + min);
    while (!pulledNumbers.includes(bombo)) {
      alert(`Número sacado del bombo es: \n el ${bombo}`);
      pulledNumbers.push(bombo);
    }
  } while (gameCard.length === 18);
  {
  }
};
