import {
    Duration,
    JoinElementSelector,
    ActivityElementSelector,
    RecordingStartElementSelectors,
    RecordingElementSelector,
    ActivityListJoinElementSelectors,
    AgreeRecordingElementSelector,
} from "./constants"

type GetElementSelector = {
    selector: string;
    searchWord: string
    retry_counter: number;
    max_retry_count: number;
}

const waitGetElementByQuerySelector = async (args: GetElementSelector): Promise<HTMLElement | null> => {
    const {selector, searchWord, max_retry_count} = args
    let {retry_counter} = args

    if (retry_counter >= max_retry_count) {
        console.log(retry_counter)
        return null;
    }
    const element = searchElement(selector, searchWord)

    if (element != null) {
        return element;
    } else {
        await new Promise(resolve => setTimeout(resolve, Duration));
        retry_counter++;
        return waitGetElementByQuerySelector({...args, retry_counter: retry_counter});
    }
}

const searchElement = (selector: string, searchWord: string): HTMLElement | null => {
    const elements = Array.from(document.querySelectorAll(selector)).map(e => e as HTMLElement)
    let element: HTMLElement | null = null
    elements.forEach(elem => {
        console.log(selector, searchWord, elem.textContent)
        if (elem.textContent === searchWord) element = elem
    })
    return element
}

const clickElement = (elem: HTMLElement) => {
    elem.click()
}

const clickEventListener = async () => {
    console.log("Check Recording Now")
    const recordingElem = await waitGetElementByQuerySelector({selector: RecordingElementSelector, searchWord: "radio_button_checked", retry_counter: 0, max_retry_count: 5});
    if (recordingElem) {
        console.log("Recording Now")
    }
    else {
        console.log("Auto Recording Script Start")
        const activityElem = await waitGetElementByQuerySelector({selector: ActivityElementSelector, searchWord: "themes", retry_counter: 0, max_retry_count: 5});
        if (activityElem) {
            clickElement(activityElem);
        }
        for(const selector of ActivityListJoinElementSelectors) {
            const activityListElem = await waitGetElementByQuerySelector({selector: selector, searchWord: "録画", retry_counter: 0, max_retry_count: 3});
            if (activityListElem) {
                console.log("Found Recording Button")
                clickElement(activityListElem);
                break
            }
        }
        for (const selector of RecordingStartElementSelectors) {
            const recordingStartElem = await waitGetElementByQuerySelector({selector: selector, searchWord: "録画を開始", retry_counter: 0, max_retry_count: 5});
            if (recordingStartElem) {
                console.log("Found Recording Start Button")
                clickElement(recordingStartElem);
                break
            }
        }
        const agreeRecordingElem = await waitGetElementByQuerySelector({
            selector: AgreeRecordingElementSelector, searchWord: "開始", retry_counter: 0, max_retry_count: 5})
        if (agreeRecordingElem) {
            console.log("Found Recording Agree Button")
            clickElement(agreeRecordingElem)
        }
        console.log("Auto Recording Script End")
    }
}

const init = async () => {
    const joinElem = await waitGetElementByQuerySelector({ selector: JoinElementSelector, searchWord: "今すぐ参加", retry_counter: 0, max_retry_count: 30 });
    if (joinElem) {
        joinElem.addEventListener('click', () => {
            console.log("Join Button Click")
            clickEventListener();
        })
    }
}

init();
