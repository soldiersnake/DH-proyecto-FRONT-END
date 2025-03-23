import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, getIdToken, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"; // ajustá el path

interface UserData {
  uid: string;
  email: string;
  token: string;
  name?: string;
  surName?: string;
}

interface AuthContextType {
  user: UserData | null;
  loginUser: (data: UserData) => void;
  logoutUser: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const loginUser = (data: UserData) => {
    setUser(data);
    localStorage.setItem("authUser", JSON.stringify(data));
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Firebase cerró la sesión correctamente
        // onAuthStateChanged se va a encargar de limpiar el contexto
        setUser(null);
        localStorage.removeItem("authUser");
        console.log("Sesión cerrada");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  // ⬇️ Escuchar el estado de sesión al montar
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser);
        const uid = firebaseUser.uid;
        const email = firebaseUser.email ?? "";

        // Traer datos adicionales de Firestore
        const userDocRef = doc(db, "users", uid);
        const userSnap = await getDoc(userDocRef);

        const userData = userSnap.exists() ? userSnap.data() : {};
        const fullUser: UserData = {
          uid,
          email,
          token,
          ...userData,
        };

        setUser(fullUser);
        localStorage.setItem("authUser", JSON.stringify(fullUser));
      } else {
        setUser(null);
        localStorage.removeItem("authUser");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
