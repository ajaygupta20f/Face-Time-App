import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hook.ts";
import { usersRef } from "../utils/FirebaseConfig.ts";
import { UserType } from "../utils/types.ts";
// import { UserType } from "../utils/types";

function useFetchUsers() {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);

  useEffect(() => {
    if (uid) {
      const getUser = async () => {
        const firestoreQuery = query(usersRef, where("uid", "!=", uid));
        const data = await getDocs(firestoreQuery);
        const firebaseUsers:Array<UserType> = [];

        data.forEach((user) => {
          const userData = user.data() as UserType;
          firebaseUsers.push({
            ...userData,
            label: userData.name,
          });
        });
        setUsers(firebaseUsers);
      };
      getUser();
    }
  }, [uid]);
  return [users];
}

export default useFetchUsers;