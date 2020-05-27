import {Icon, notification} from "antd";
import React from "react";

export const openNotification = (type: string, message: String, descriptionString: string) => {
    notification.config({
        duration: 5,
    });
    notification[type === "error" ? "error" : "success"]({
        message: message,
        description: descriptionString
    });
};

export const openNotificationCorrectPosition = () => {
    notification.config({
        duration: 5,
    });
    notification.open({
        message: 'UŽDAVINYS SUDĖTAS TEISINGAI',
        description:
            'Uždavinys sudėtas teisingai. Galite pradėti spręsti.',
        icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>
    });
};

export const openNotificationAddPosition = () => {
    notification.config({
        duration: 5,
    });
    notification.open({
        message: 'UŽDAVINIO POZICIJA',
        description:
            'Susidėkite uždavinyje nurodytą poziciją.',
        icon: <Icon type="table"/>
    });
};

export const openNotificationCorrectSolution = () => {
    notification.config({
        duration: 5,
    });
    notification.open({
        message: 'UŽDAVINYS IŠSPRĘSTAS TEISINGAI',
        description: 'Sveikiname. Uždavinys išspręstas teisingai.',
        icon: <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96"/>
    });
};
