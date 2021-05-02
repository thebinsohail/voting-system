import firebase from "../firebase";

export default async function doesNumberExist(number) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("number", "==", number)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}
