import { useState } from "react";

interface LogList {
    id: number;
    message: string;
}

const useLogList = () => {
    const [logList, setLogList] = useState<LogList[]>([]);

    const addLog = (message: string) => {
        setLogList([...logList, { id: logList.length, message }]);
    }

    return { logList, addLog };
}

export default useLogList