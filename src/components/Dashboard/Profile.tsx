import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, loginUser } = useAuth();

  const [editableField, setEditableField] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    surName: "",
    cuit: "",
    phone: "",
    password: "******",
    cvu: "0000002100075320000000",
    alias: "alias.ejemplo.usuario",
  });

  useEffect(() => {
    if (user) {
      setUserData((prev) => ({ ...prev, ...user }));
    }
  }, [user]);

  const handleEdit = (field: string) => {
    setEditableField(field);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const saveChanges = async (field: string) => {
    if (field === "alias" && !/^[a-z]+\.[a-z]+\.[a-z]+$/.test(userData.alias)) {
      toast.error("Alias debe tener formato X.X.X");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user!.uid);
      await updateDoc(userDocRef, {
        [field]: userData[field as keyof typeof userData],
      });

      loginUser({
        ...user!,
        [field]: userData[field as keyof typeof userData],
      });

      toast.success("Datos actualizados correctamente");
      setEditableField("");
    } catch (error) {
      toast.error("Error al actualizar");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info("Copiado al portapapeles");
  };

  return (
    <div className="max-w-2xl min-h-screen  bg-gray-100 mx-auto space-y-6 py-8">
      {/* Tus datos */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="font-semibold text-xl mb-4">Tus datos</h3>
        {[
          { label: "Email", field: "email" },
          { label: "Nombre", field: "name" },
          { label: "Apellido", field: "surName" },
          { label: "CUIT", field: "cuit" },
          { label: "Teléfono", field: "phone" },
          { label: "Contraseña", field: "password", disabled: true },
        ].map(({ label, field, disabled }) => (
          <div
            key={field}
            className="flex items-center justify-between py-2 border-b"
          >
            <span className="font-medium">{label}</span>
            <div className="flex items-center">
              <input
                type="text"
                name={field}
                value={userData[field as keyof typeof userData]}
                disabled={editableField !== field || disabled}
                onChange={handleChange}
                className={`text-right bg-transparent outline-none ${
                  editableField === field ? "border-b border-indigo-500" : ""
                }`}
              />
              {!disabled && (
                <>
                  {editableField === field ? (
                    <button
                      onClick={() => saveChanges(field)}
                      className="ml-2 text-indigo-500"
                    >
                      💾
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(field)}
                      className="ml-2 text-gray-400"
                    >
                      ✏️
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Gestiona Medios de Pago */}
      <div
        className="bg-lime-400 cursor-pointer p-4 rounded-lg text-black font-bold flex justify-between items-center"
        onClick={() => (window.location.href = "/home/payments")}
      >
        Gestioná los medios de pago <span className="text-xl">→</span>
      </div>

      {/* CVU y Alias */}
      <div className="bg-black text-white rounded-lg p-6 space-y-4">
        <p className="text-sm">
          Copia tu CVU o Alias para ingresar o transferir dinero desde otra
          cuenta
        </p>

        <div className="flex justify-between items-center">
          <span className="font-bold text-lime-500">CVU</span>
          <div className="flex items-center gap-2">
            <span>{userData.cvu}</span>
            <button
              onClick={() => copyToClipboard(userData.cvu)}
              className="text-lime-500"
            >
              📋
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold text-lime-500">Alias</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="alias"
              value={userData.alias}
              disabled={editableField !== "alias"}
              onChange={handleChange}
              className={`bg-transparent text-right ${
                editableField === "alias" ? "border-b border-lime-500" : ""
              }`}
            />
            {editableField === "alias" ? (
              <button
                onClick={() => saveChanges("alias")}
                className="text-lime-500"
              >
                💾
              </button>
            ) : (
              <button
                onClick={() => handleEdit("alias")}
                className="text-gray-300"
              >
                ✏️
              </button>
            )}
            <button
              onClick={() => copyToClipboard(userData.alias)}
              className="text-lime-500"
            >
              📋
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
