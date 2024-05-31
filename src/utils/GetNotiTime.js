import moment from "moment";
import "moment/locale/ko";

moment.updateLocale("ko", {
    relativeTime: {
        past: "%s",
        s: "%d초",
        ss: "%d초",
        m: "1분",
        mm: "%d분",
        h: "1시간",
        hh: "%d시간",
        d: "1일",
        dd: "%d일",
        M: "1개월",
        MM: "%d개월",
        y: "1년",
        yy: "%d년",
    },
});

const categorizeNotifications = (notifications) => {
    const today = [];
    const yesterday = [];
    const thisWeek = [];
    const thisMonth = [];

    const now = moment().startOf('day');  

    notifications.forEach((notification) => {
        const notificationTime = moment(notification.regTime).startOf('day');  
        const diffDays = now.diff(notificationTime, "days");

        if (diffDays === 0) {
            today.push(notification);
        } else if (diffDays === 1) {
            yesterday.push(notification);
        } else if (diffDays < 7) {
            thisWeek.push(notification);
        } else if (diffDays < 30) {
            thisMonth.push(notification);
        }
    });

    return { today, yesterday, thisWeek, thisMonth };
};

const getDisplayTime = (date) => {
    return moment(date).fromNow();
};

export { categorizeNotifications, getDisplayTime };
