import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import destructureDatas from "./destructureDatas";

export default async function getAverage({ lessonId, setNotation }) {
    if (lessonId) {
        const querySnapshot = await getDocs(await query(collection(db, "Comments"), where('lessonId', '==', lessonId)));
        const comments = destructureDatas(querySnapshot)
        if (comments > 0) {
            let total = 0
            comments.forEach((comment) => {
                console.log('comment.notation', comment.notation)
                console.log('Number(comment.notation)', Number(comment.notation))
                total += Number(comment.notation)
            })
            console.log('total', total)
            console.log('total / comments.length', total / comments.length)
            setNotation(total / comments.length)
        } else { setNotation('~') }
    } else { setNotation('?') }
}