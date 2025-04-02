import Flex from "../../../../components/layout/flex/Flex.tsx";
import Button from "../../../../components/button/Button.tsx";
import Text from "../../../../components/text/Text.tsx";

const RightSide = () => {
    return (
        <Flex
            direction={'column'}
            gap={'15px'}
            grow={'full'}
            style={{
                padding: '20px',
            }}
        >
            <div
                style={{
                    border: '2px solid #000',
                    padding: '10px',
                    textAlign: 'center',
                }}
            >
                <input
                    type="number"
                    defaultValue={0}
                    style={{
                        fontSize: '28px',
                        textAlign: 'center',
                        border: 'none',
                        padding: '10px',
                    }}
                />
            </div>
            <Flex justify={'between'} grow={'wFull'}>
                <Button label={'투입'}  />
                <Button label={'반환'} />
            </Flex>
            <Flex
                grow={'full'}
                style={{
                    border: '2px solid #000',
                    background: '#fefefe',
                    overflowY: 'scroll',
                }}
            >
                <Text>로그 메시지 표시 영역</Text>
            </Flex>
        </Flex>
    );
};

export default RightSide