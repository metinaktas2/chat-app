import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase";
import Message from "./message";
import Arrow from "./arrow";

const List = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const lastMessageRef = useRef();
  const audioRef = useRef(new Audio("/notify.mp3"));
  const prevMessagesLength = useRef(0);
  const hasResetUnread = useRef(false);

  //veritabanındaki mesajları al
  useEffect(() => {
    //mesajlar koleksiyonun referansını al
    const collectionRef = collection(db, "messages");

    //sorgu ayarları
    const q = query(
      collectionRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //messages koleksiyonuna abone ol (değişiklikleri takip et)
    const onsub = onSnapshot(q, (snapshot) => {
      //mesasjların geçici olarak tutulduğu dizi
      const temp = [];

      //her bir belgenin içindeki dataya erişip dataya eriş
      snapshot.docs.forEach((doc) => {
        temp.push(doc.data());
      });

      //mesaj verilerini state'e aktar
      setMessages(temp);

      //kullanıcı sayfadan ayrılınca aboneliği durdur
      return () => onsub();
    });
  }, []);

  //yeni mesaj geldiğinde
  useEffect(() => {
    if (messages.length > 1) {
      //gönderilen son mesaja eriş
      const lastMsg = messages.at(-1);

      // unreadCount sıfırlanması
      if (isAtBottom && !hasResetUnread.current) {
        setUnreadCount(0);
        hasResetUnread.current = true;
      }

      //kullanıcı yularıdayken yeni mesaj gelirse
      if (messages.length > prevMessagesLength.current && !isAtBottom) {
        //atılan son mesajı farklı kullanıcı attıysa unread state'i artır
        if (lastMsg.author.id !== auth.currentUser.uid) {
          setUnreadCount((prev) => prev + 1);
        }
      }

      //toplam mesaj sayısını referansa aktar
      prevMessagesLength.current = messages.length;

      //mesaj geldiğinde son mesaja odaklan ve bildirimi oynat
      if (lastMsg.author.id === auth.currentUser.uid) {
        scrollToBottom();
      } else if (isAtBottom) {
        scrollToBottom();
        playSound();
      }
    }
  }, [messages, isAtBottom]);

  //aşağıya kaydır
  const scrollToBottom = () => {
    //son mesaja kaydır
    lastMessageRef.current.scrollIntoView();

    //okunmamış mesaj sayısını sıfırla
    setUnreadCount(0);
  };

  //kaydırma anında çalışacak fonksiyon
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    //kullanıcı sayfanın en alttaki 150 px'lik kısımda mı?
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 150);
  };

  //bildirim sesi
  const playSound = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <main
      onScroll={handleScroll}
      className="flex-1 p-3 flex flex-col gap-3 w-full overflow-y-auto relative no-scrollbar"
    >
      {messages?.length < 1 ? (
        <div className="h-full grid place-items-center text-zinc-400">
          <p>Sohbete ilk mesajı gönderin</p>
        </div>
      ) : (
        messages?.map((i, key) => <Message item={i} key={key} />)
      )}

      <div ref={lastMessageRef} />

      <Arrow
        unreadCount={unreadCount}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </main>
  );
};

export default List;
