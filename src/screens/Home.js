import { isLoggedInVar } from "./apollo";

function Home({ setIsLoggedIn }) {
    return (
        <div>
            <h1>HoME</h1>
            <button onClick={() => isLoggedInVar(false)}>Log out Now~</button>
        </div>
    )
}

export default Home;