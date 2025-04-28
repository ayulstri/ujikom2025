import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFYmmVvk-jLZIeAdYKiTwVw2jqd4VINFA",
  authDomain: "insan-cemerlang.firebaseapp.com",
  projectId: "insan-cemerlang",
  storageBucket: "insan-cemerlang.appspot.com",
  messagingSenderId: "579109661574",
  appId: "1:579109661574:web:4a7cd4060f70eded945a07"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftartugas() {
  const refDokumen = collection(db, "senin");
  const kueri = query(refDokumen, orderBy("tugas"));
  const cuplikankueri = await getDocs(kueri);

  let hasil = [];
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tugas: dok.data().tugas,
      status: dok.data().status,
      prioritas: dok.data().prioritas,
      tanggal: dok.data().tanggal,
    });
  });

  return hasil;
}

export async function tambahtugas(tugas, status, prioritas, tanggal) {
  try {
    const dokRef = await addDoc(collection(db, 'senin'), {
      tugas: tugas,
      status: status,
      prioritas: prioritas,
      tanggal: tanggal,
    });
    console.log('berhasil menembah tugas ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah tugas ' + e);
  }
}

export async function hapustugas(docId) {
  await deleteDoc(doc(db, "senin", docId));
}

export async function ubahtugas(docId, tugas, status, prioritas, tanggal) {
  await updateDoc(doc(db, "senin", docId), {
    tugas: tugas,
    status: status,
    prioritas: prioritas,
    tanggal: tanggal,
  });
}

export async function ambiltugas(docId) {
  const docRef = await doc(db, "senin", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}

function ubahStatus(tombol) {
  let status = tombol.dataset.status;

  if (status === "Selesai") {
    tombol.textContent = "Belum Selesai";
    tombol.dataset.status = "Belum Selesai";
  } else {
    tombol.textContent = "Selesai";
    tombol.dataset.status = "Selesai";
  }
}

