export const getTaskResult = (code: string) => {
    switch (code) {
        case "DRAW":
            return "Lygiosios";
        case "WHITES_START_AND_WIN":
            return "Baltieji pradeda ir laimi";
        default:
            return "Unknown";
    }
};

export const getTaskComplexity = (code: string) => {
    switch (code) {
        case "HARD":
            return "Sudėtingas";
        case "MEDIUM":
            return "Vidutinis";
        case "EASY":
            return "Lengvas";
        default:
            return "Unknown";
    }
};

export const getTaskType = (code: string) => {
    switch (code) {
        case "ZIRKLES":
            return "ŽIRKLĖS";
        case "KOMBINACIJA":
            return "KOMBINACIJA";
        case "ATKIRTIMAS":
            return "ATKRITIMAS";
        case "ENDSPILIS":
            return "ENDŠPILIS";
        case "UŽDARYMAS":
            return "UŽDARYMAS";
        case "KILPA":
            return "KILPA";
        case "OPOZICIJA":
            return "OPOZICIJA";
        case "ZIRKLES":
            return "ŽIRKLĖS";
        default:
            return "KITA";
    }
};


export const getTaskStatus = (code: string) => {
    switch (code) {
        case "RESOLVED":
            return "IŠSPRĘSTAS";
        default:
            return "NEIŠSPRĘSTAS";
    }
};