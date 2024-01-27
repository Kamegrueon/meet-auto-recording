import {
    JoinElementSelector,
    ActivityElementSelector,
    ActivityListElementSelector,
    RecordingStartElementSelector,
} from "./constants"

type GetElementSelector = {
    selector: string;
    time: number;
    callback: (elem: HTMLElement) => void;
}

const MAX_RETRY_COUNT = 30
const duration = 1000
let retry_counter = 0

const waitGetElementByQuerySelector = (args: GetElementSelector) => {
    retry_counter++;
    if(retry_counter > MAX_RETRY_COUNT){
        console.log(retry_counter)
        return
    }
    const {selector, time, callback} = args
    let elem = document.querySelector(selector) as HTMLElement
    if(elem != null){
        console.log(selector, "1見つかりました")
        callback(elem)
        return
    } else {
        console.log(selector, "見つかりません")
        setTimeout(() => {
            waitGetElementByQuerySelector(args)
        }, time);
    }
}

const clickElement = (elem: HTMLElement) => {
    elem.click()
}

const clickEventListener = (elem: HTMLElement) => {
    elem.addEventListener('click', () => {
        console.log("呼ばれた")
        waitGetElementByQuerySelector({selector: ActivityElementSelector, time: duration, callback: clickElement})
        waitGetElementByQuerySelector({selector: ActivityListElementSelector, time: duration, callback: clickElement})
        waitGetElementByQuerySelector({selector: RecordingStartElementSelector, time: duration, callback: clickElement})
    })
}

waitGetElementByQuerySelector({selector: JoinElementSelector, time: duration, callback: clickEventListener})
