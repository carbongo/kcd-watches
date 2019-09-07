import '../styles/master.less';

const getLocaleText = (h, m, s) => {
    const localeText = {
        "0h": () => {
            return ("hours")
        },
        "1h": () => {
            return ("hour")
        },
        "2+h": () => {
            return ("hours")
        },
        "0m": () => {
            return ("minutes")
        },
        "1m": () => {
            return ("minute")
        },
        "2+m": () => {
            return ("minutes")
        },
        "0s": () => {
            return ("seconds")
        },
        "1s": () => {
            return ("second")
        },
        "2+s": () => {
            return ("seconds")
        }
    }
    const newLine = "<br/>";
    return `${h}
    ${h == 0 ? localeText["0h"]() : h == 1 ? localeText["1h"]() : localeText["2+h"]()}
    ${newLine}
    ${m}
    ${m == 0 ? localeText["0m"]() : m == 1 ? localeText["1m"]() : localeText["2+m"]()}
    ${newLine}
    ${s}
    ${s == 0 ? localeText["0s"]() : s == 1 ? localeText["1s"]() : localeText["2+s"]()}`
}

const getCurrentTime = () => {
    const newDate = new Date(),
        s = newDate.getSeconds(),
        m = newDate.getMinutes(),
        h = newDate.getHours();
    return [h, m, s];
};

const updateText = () => {
    const [h,
        m,
        s] = getCurrentTime();
    document.getElementsByClassName("time")[0].innerHTML = getLocaleText(h, m, s);
};

const rotateTime = () => {
    const [h,
        m] = getCurrentTime();
    //- = move backwards; 0.25 = 1 min; 180 = rotate to 24 (0) hrs
    const degToRotate = -(((m + (h * 60.0)) * 0.25) - 180.0);
    document
        .getElementsByClassName("clock")[0]
        .setAttribute("style", "transform: rotate(" + degToRotate + "deg)");
};

window.onload = () => {
    updateText();
    rotateTime();
    setInterval(updateText, 1000);
    setInterval(rotateTime, 10000);
};