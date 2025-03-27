const checkInstance = <T>(data: unknown, constructor: new (...args: any[]) => T): data is T => {
    return data instanceof constructor;
}

export default checkInstance;