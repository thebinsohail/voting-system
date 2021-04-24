import { firebase } from "../firebase";

export default async function doesAadharExist(aadhar) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("aadhar", "==", aadhar)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}
