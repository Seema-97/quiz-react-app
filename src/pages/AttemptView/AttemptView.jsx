import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebase.config";

const AttemptView = () => {
    const { attemptID } = useParams();
    const [dataResponse, setDataResponse] = useState({});

    useEffect(() => {
        getdata().then(res => setDataResponse(res))
            .catch(err => console.log(err)
            )

    }, []);

    console.log(dataResponse);


    async function getdata() {
        const docRef = doc(FIRESTORE, "userAnswers", attemptID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
            // console.log("Document data:", docSnap.data());
        } else {
            return {};
            // docSnap.data() will be undefined in this case
            // console.log("No such document!");
        }

    }

    return (
        <div>
            <h1>Attempt For {attemptID}</h1>

        </div>
    )
}

export default AttemptView