import { useHistory } from "react-router-dom";
import { logUserOut } from "./apollo";

function Home() {
    const history = useHistory();
    return (
        <div>
            <h1>Welcome Fucker~</h1>
            <button onClick={() => logUserOut(history)}>Log out Now~</button>
        </div>
    )
}

export default Home;