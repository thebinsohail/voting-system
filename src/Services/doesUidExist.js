import { firebase } from "../firebase";

export default async function doesUidExist(uid) {
  const result = await firebase
    .firestore()
    .collection("voted")
    // .doc("12345")
    .where("voters", "==", uid)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}
