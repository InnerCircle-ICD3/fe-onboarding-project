import Flex from "../../../../components/layout/flex/Flex.tsx";
import Button from "../../../../components/button/Button.tsx";
import Text from "../../../../components/text/Text.tsx";
import {useAtom} from "jotai";
import { messageState, totalAmountState} from "../../../../stores/commonState.ts";
import { useState} from "react";


const RightSide = () => {

    const [totalAmount, setTotalAmount] = useAtom(totalAmountState)

    const [message, setMessage] = useAtom(messageState)

    const [inputData, setInputData] = useState(0)


    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {

        setInputData(Number(event?.target?.value))
    }

    const handleAddClick = () => {

        if(isNaN(inputData)) {
            setMessage((currVal ) => [
                ...currVal,
                { message : '숫자만 입력할 수 있습니다. ' , state: "error" }
            ])

            return;
        }

        if(inputData <= 0) {

            setMessage((currVal ) => [
                ...currVal,
                { message : '1원 이상 넣어주세요' , state: "error" }
            ])

            return;
        }

        setTotalAmount((currVal) => currVal +  inputData)
        setInputData(0)

        const message= `${inputData}원 을 충전하였습니다.`

        setMessage((currVal ) => [
            ...currVal,
            { message , state: "info" }
        ])
    }

    const handleReturnClick = () => {
        const message= `${totalAmount}원 을 반환하였습니다.`

        if(totalAmount <= 0) {

            setMessage((currVal ) => [
                ...currVal,
                { message : '반환할 잔액이 없습니다.' , state: "error" }
            ])
            return;
        }

        setMessage((currVal ) => [
            ...currVal,
            { message , state: "info" }
        ])
        setTotalAmount(0)
        setInputData(0)
    }

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
                    onChange={(event) => handleChange(event)}
                    value={inputData}

                    style={{
                        fontSize: '28px',
                        textAlign: 'center',
                        border: 'none',
                        padding: '10px',
                    }}
                />
            </div>
            <Flex justify={'between'} grow={'wFull'}>
                <Button label={'투입'} onClick={handleAddClick}   />
                <Button label={'반환'} onClick={handleReturnClick} />
            </Flex>
            <Flex
                grow={'wFull'}
                direction={'column'}
                height={'100px'}
                style={{
                    border: '2px solid #000',
                    background: '#fefefe',
                    overflowY: 'scroll',
                }}
            >
                {message.map((msg, index) => (
                    <Text key={index} color={msg.state === 'error' ? 'red' : 'main'} >{msg?.message}</Text>
                ))}

            </Flex>
        </Flex>
    );
};

export default RightSide