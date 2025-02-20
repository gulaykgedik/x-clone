import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Loader from "../../components/loader/index";
import Post from "../../components/post";

const List = () => {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, "tweets");

    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, ({ docs }) => {
      const temp = [];

      docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));

      setTweets(temp);
    });

    return () => unsub();
  }, []);

  return !tweets ? (
    <Loader designs="my-40" />
  ) : (
    tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
  );
};

export default List;
