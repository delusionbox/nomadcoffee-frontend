import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import BottomBox from "../components/auth/ButtomBox";
import { logUserOut } from "./apollo";
import routes from "./routes";

const SEE_FEED = gql`
    query seeCoffeeShops{
        seeCoffeeShops{
            id
            name
            latitude
            logtitude
            user{
                username
                avatarURL
            }
            photos{
                id
                url
            }
        }
    }
`;

function Home() {
    const history = useHistory();
    const { data } = useQuery(SEE_FEED);
    console.log(data);
    return (
        <div>
            <h1>Welcome</h1>
            {data?.seeCoffeeShops}
            <button onClick={() => logUserOut(history)}>Log out Now~</button>

            <BottomBox cta="create" linkText="create" link={routes.addshop} />
            <BottomBox cta="edit" linkText="edit" link={routes.editshop} />
        </div>
    )
}

export default Home;