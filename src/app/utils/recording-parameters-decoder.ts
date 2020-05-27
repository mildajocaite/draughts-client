export const getRecordingStatus = (status: string) => {
    switch (status) {
        case "RECORDING":
            return "ĮRAŠOMA";
        case "RECORDED":
            return "ĮRAŠYTA";
        default:
            return "";
    }
};
