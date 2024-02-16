import {
    JoinElementSelector,
    ActivityElementSelector,
    RecordingStartElementSelector,
    RecordingElementSelector,
    // JoinMemberElementSelector,
    // ActivityListSingleJoinElementSelector,
    ActivityListMultiJoinElementSelector,
    // AgreeRecordingElementSelector,
} from "./constants"

const Duration = 1000

type GetElementSelector = {
        selector: string;
        retry_counter: number;
        max_retry_count: number;
}

const waitGetElementByQuerySelector = async (args: GetElementSelector): Promise<HTMLElement | null> => {
    const {selector, max_retry_count} = args
    let {retry_counter} = args
    retry_counter++;

    if (retry_counter > max_retry_count) {
        console.log(retry_counter)
        return null;
    }

    const elem = document.querySelector(selector) as HTMLElement
    if (elem != null) {
        return elem;
    } else {
        await new Promise(resolve => setTimeout(resolve, Duration));
        return waitGetElementByQuerySelector({...args, retry_counter: retry_counter});
    }
}

const clickElement = (elem: HTMLElement) => {
    elem.click()
}

const isRecording = (elem: HTMLElement | null): Boolean => {
    if(elem){
        return elem.ariaLabel === "この通話は録画されています" ? true : false
    } else {
        return false
    }
}

const clickEventListener = async () => {
    const recordingElem = await waitGetElementByQuerySelector({selector: RecordingElementSelector, retry_counter: 0, max_retry_count: 5});
    if(!isRecording(recordingElem)) {
        const activityElem = await waitGetElementByQuerySelector({selector: ActivityElementSelector, retry_counter: 0, max_retry_count: 20});
        if (activityElem) {
            clickElement(activityElem);
        }
        // 参加者が一人のみの場合セレクターが変わる？
        // const joinMemberElem = await waitGetElementByQuerySelector({selector: JoinMemberElementSelector, retry_counter: 0, max_retry_count: 5});
        // if (joinMemberElem && joinMemberElem.textContent === "1"){
        //     const activityListElem = await waitGetElementByQuerySelector({selector: ActivityListSingleJoinElementSelector, retry_counter: 0, max_retry_count: 20});
        //     if (activityListElem) {
        //         clickElement(activityListElem);
        //     }
        // } else {
        const activityListElem = await waitGetElementByQuerySelector({selector: ActivityListMultiJoinElementSelector, retry_counter: 0, max_retry_count: 20});
        if (activityListElem) {
            clickElement(activityListElem);
        }
        // }
        const recordingStartElem = await waitGetElementByQuerySelector({selector: RecordingStartElementSelector, retry_counter: 0, max_retry_count: 20});
        if (recordingStartElem) {
            clickElement(recordingStartElem);
        }
        // 録画開始ボタンはユーザーがクリックするか選択できるようにするため削除
        // const agreeRecordingElem = await waitGetElementByQuerySelector({selector: AgreeRecordingElementSelector, retry_counter: 0, max_retry_count: 20})
        // if (agreeRecordingElem) {
        //     clickElement(agreeRecordingElem)
        // }
    }
    else {
        console.log("録画中です")
    }
}

const init = async () => {
    const joinElem = await waitGetElementByQuerySelector({selector: JoinElementSelector, retry_counter: 0, max_retry_count: 30});
    if (joinElem) {
        joinElem.addEventListener('click', () => {
            clickEventListener();
        })
    }
}

init();
