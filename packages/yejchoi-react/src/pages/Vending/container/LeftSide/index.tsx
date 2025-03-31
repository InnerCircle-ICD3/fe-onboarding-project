import Flex from "../../../../components/layout/flex/Flex.tsx";
import Text from "../../../../components/text/Text.tsx";
import Button from "../../../../components/button/Button.tsx";
import Grid from "../../../../components/layout/gird/Grid.tsx";
import {useAtomValue} from "jotai/index";
import {totalAmountState} from "../../../../stores/commonState.ts";

export interface Product {
    name : string;
    price : number;
    id : number;
    isUsed? : boolean
}

const LeftSide = () => {

    const totalAmount = useAtomValue(totalAmountState);

    const productList: Product[] = [
        {"id" : 1, "name": "쿨라", "price": 1500, isUsed : true },
        {"id" : 2, "name": "속이사이다", "price": 1700 ,isUsed : true },
        {"id" : 3, "name": "판타지판타", "price": 1500 ,isUsed : true },
        {"id" : 4, "name": "오뎅국물", "price": 1800 ,isUsed : true },
        {"id" : 5, "name": "부장라떼", "price": 800 ,isUsed : true },
        {"id" : 6, "name": "하늘판타", "price": 1500 ,isUsed : true },
        {"id" : 7, "name": "레드뿔", "price": 2500 ,isUsed : true },
        {"id" : 8, "name": "핫세븐", "price": 1900 ,isUsed : true },
        {"id" : 9, "name": "커피우유", "price": 1400 ,isUsed : true },
        {"id" : 10, "name": '데자와', "price": 1400 ,isUsed : true },
        {"id" : 11, "name": "렌덤", "price": 1400, isUsed : true },
        {"id" : 12, "name": "", "price": 0 ,isUsed : false  },
    ]

    return (
        <Flex
            direction={'column'}
            align={'center'}
            gap={'20px'}
            style={{
                flex: 2,
                padding: '20px',
                background: '#f0f8ff',
            }}
        >
            <Flex direction={'column'} gap={'20px'}>
                <Flex grow={'wFull'} justify={'center'} style={{   border: '2px solid #000'}}>

                    <Text weight={'bold'} size={'2xl'}>
                        {totalAmount.toLocaleString()}
                    </Text>

                </Flex>
                <Grid gridColumns={3} gap={'15px'}>
                    {productList?.map((product) => (
                        <Button
                            key={product.id}
                            label={product.name}
                            disabled={!product.isUsed}
                            style={{
                                padding: '10px',
                                backgroundColor: '#bce0fd',
                                border: '2px solid #000',
                            }}
                        />
                    ))}
                </Grid>
            </Flex>
        </Flex>
    );
};

export default LeftSide