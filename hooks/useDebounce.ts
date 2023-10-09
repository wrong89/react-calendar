export function useDebounce(callback: Function, delay: number = 300) {
    let timerId: number

    return function(args: any) {
        clearTimeout(timerId)
        timerId = window.setTimeout(() => {
            return callback(args)
        }, delay)
    }
}