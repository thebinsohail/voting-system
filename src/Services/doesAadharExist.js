import { db } from "../firebase";

export default async function doesAadharExist(aadhar) {
  const result = await db
    .collection("users")
    .where("aadhar", "==", aadhar)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}
