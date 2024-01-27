const getElementByXPath = (path: string) => {
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue as HTMLElement;
}

const waitGetElementXpath = (xpath: string, time: number, callback: (obj: HTMLElement) => void) => {
    let obj = getElementByXPath(xpath)
    if(obj != null){
        console.log(xpath, "見つかりました")
        callback(obj)
        return
    } else {
        console.log(xpath, "見つかりません")
        setTimeout(() => {
            waitGetElementXpath(xpath, time, callback)
        }, time);
    }

}

const waitGetElementsClassName = (selector: string, time: number, callback: (obj: HTMLCollectionOf<HTMLElement>) => void) => {
    let obj = document.getElementsByClassName(selector) as HTMLCollectionOf<HTMLElement>
    if(obj != null){
        console.log(selector, "見つかりました")
        callback(obj)
        return
    } else {
        console.log(selector, "見つかりません")
        setTimeout(() => {
            waitGetElementsClassName(selector, time, callback)
        }, time);
    }

}

const clickElement = (obj: HTMLElement) => {
    obj.click()
}

const clickElements = (obj: HTMLCollectionOf<HTMLElement>) => {
    obj[6].click()
}

const clickEventListener = (obj: HTMLElement) => {
    const activityElementPath = "/html/body/div[1]/c-wiz/div/div/div[22]/div[3]/div[11]/div/div/div[3]/div/div[4]/div/div/span/button"
    // const activityListElementPath = "/html/body/div[1]/c-wiz/div/div/div[22]/div[3]/div[4]/div[2]/div/div[2]/div/div/div[3]/ul/li[7]/span[1]"

    const recordingStartElementPath = "/html/body/div[1]/c-wiz/div/div/div[22]/div[3]/div[4]/div[2]/div/div[2]/div/div[2]/div/p/div[4]/div/button"
    const recordingAgreeElementPath = "/html/body/div[1]/div[4]/div[2]/div/div[2]/button[2]"
    obj.addEventListener('click', () => {
        waitGetElementXpath(activityElementPath, 1000, clickElement)
        // waitGetXpath(activityListElementPath, 1000, clickElement)
        waitGetElementsClassName("VfPpkd-rymPhb-pZXsl", 1000, clickElements)
        waitGetElementXpath(recordingStartElementPath, 1000, clickElement)
        waitGetElementXpath(recordingAgreeElementPath, 1000, clickElement)
    })
}

const joinElementPath = "/html/body/div[1]/c-wiz/div/div/div[22]/div[3]/div/div[2]/div[4]/div/div/div[2]/div[1]/div[2]/div[1]/div[1]/button"

var sheets = document.styleSheets
var sheet = sheets[sheets.length - 1];
sheet.insertRule(
    '.class::before { hight: 100px }',
    sheet.cssRules.length
  );

waitGetElementXpath(joinElementPath, 1000, clickEventListener)
