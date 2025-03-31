import Flex from "../../components/layout/flex/Flex.tsx";
import LeftSide from "./container/LeftSide";
import RightSide from "./container/RightSide";


const Vending = () => {

    
    return (
        <Flex
            direction="row"
            width="1000px"
            style={{
                margin: '0 auto',
                border: '2px solid #000',
            }}
        >
            <LeftSide />
            <RightSide />
        </Flex>
    )
}

export default Vending