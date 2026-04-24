import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate, useOutletContext } from "react-router-dom";

const Room = () => {
  const navigate = useNavigate();
  //outlet component'ına gönderilen prop'a eriş
  const user = useOutletContext();

  //çıkış yap
  const handleLogout = () => {
    signOut(auth).then(() => toast.success("Oturum kapatıldı"));
  };

  //form gönderilince sohbet sayfasına yönlendir
  const handleSubmit = (e) => {
    e.preventDefault();

    //inputtaki girdiyi al
    const room = e.target[0].value.trim().toLowerCase().replaceAll(" ", "-");

    //oda ismi girilmediyse uyarı gönder
    if (!room) return toast.info("Oda ismi giriniz");

    //kullanıcıyı sohbet sayfasına yönlendir
    navigate(`/chat/${room}`);
  };
  return (
    <div className="wrapper">
      <form
        onSubmit={handleSubmit}
        className="box flex flex-col gap-10 text-center"
      >
        <h1 className="text-4xl">SohbetUp</h1>

        <p>
          Selam, {user?.displayName} <br />
          Hangi odaya girmek istiyorsun ?
        </p>
        <input
          type="text"
          placeholder="örn:haftasonu..."
          className="border border-gray-300 rounded-md shadow-lg p-2 px-4"
        />

        <button type="submit" className="btn bg-zinc-700 text-white">
          Odaya Gir
        </button>

        <button onClick={handleLogout} className="btn bg-red-500 text-white">
          Çıkış Yap
        </button>
      </form>
    </div>
  );
};

export default Room;
