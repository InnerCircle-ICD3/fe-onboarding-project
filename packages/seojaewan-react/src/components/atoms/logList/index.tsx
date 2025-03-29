const list = [
    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged out",

    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged out",

    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged out",

    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged out",

    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged in",
    "2021-10-10 10:10:10: User logged in",
]

const LogList = () => {


    return <ul className="flex flex-col-reverse overflow-y-auto h-[300px] list-none border rounded-[5px] p-[5px]">
        {list.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
}

export default LogList;