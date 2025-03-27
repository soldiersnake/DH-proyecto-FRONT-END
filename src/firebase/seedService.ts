import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { db } from "./firebase";

const services = [
  {
    name: "Movistar",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQeWrlDjn--svVv1HIelWCe8fNtrOF7hIWhw&s",
    amount: 500,
  },
  {
    name: "Claro",
    logoUrl:
      "https://mir-s3-cdn-cf.behance.net/projects/404/a6e46e62700217.Y3JvcCwxMzczLDEwNzUsMjcxLDA.png",
    amount: 560,
  },
  {
    name: "Telecentro",
    logoUrl:
      "https://play-lh.googleusercontent.com/f082TMgIIfrSRV-QNSD0i3NYvTK9PovZGox6NvYeIUdTLMVSEQGK0HHqIe9x84S_5Q6l",
    amount: 1000,
  },
  {
    name: "Edenor",
    logoUrl:
      "https://d1.awsstatic.com/case-studies/Latam%20Cases%20Assets/Edenor_Logo2.f54af55168618426a290e0b8ef45fbfdfd7fe560.jpg",
    amount: 15000,
  },
  {
    name: "Edesur",
    logoUrl:
      "https://cordoba.premioseikon.com/wp-content/uploads/sites/5/2016/09/680x6801473706164_Edesur-Logo.jpg",
    amount: 13000,
  },
  {
    name: "Metrogas",
    logoUrl:
      "https://mir-s3-cdn-cf.behance.net/projects/404/3698bc219123847.Y3JvcCwxMjU1LDk4MiwyNjEsMTk4.jpg",
    amount: 5500,
  },
  {
    name: "Aysa",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQygGf4wM2WGh8-y_ZNXeyrESsV95rI2-M3GQ&s",
    amount: 3750,
  },
  {
    name: "Cablevisión",
    logoUrl:
      "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/082011/cablevision_logo-01_0.png?itok=e1nM0Gku",
    amount: 5050,
  },
  {
    name: "Personal",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtgZ8mOuISjigO3En9Ui42vq7rB9L8oZF8cw&s",
    amount: 800,
  },
  {
    name: "Antina",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrgOUXgOUf2acdUIuYwM_vS3xXxrIueiZ3-w&s",
    amount: 1503,
  },
];

export const seedServices = async () => {
  const servicesRef = collection(db, "services");
  const snapshot = await getDocs(servicesRef);

  if (snapshot.empty) {
    const batch = writeBatch(db);

    services.forEach((service) => {
      const newDocRef = doc(servicesRef); // genera un ID automático
      batch.set(newDocRef, service);
    });

    await batch.commit();
    console.log("Servicios iniciales cargados con writeBatch");
  } else {
    console.log("Servicios ya existen");
  }
};
