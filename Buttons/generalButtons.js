
export const kindOfAnimalButtons = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Для собак", callback_data: "dog" }],
            [{ text: "Для котів", callback_data: "cat" }],
            [{ text: "Для пташок", callback_data: "bird" }],
            [{ text: "Для рибок", callback_data: "fish" }],
        ],
    },
};

export const createProductAgainButtons = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Створити продукт", callback_data: "create" }]
        ],
    },
};

export const createProductButtons = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Створити продукт", callback_data: "create" }]
        ],
    },
};

export const confirmationButtons = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Підтвердити", callback_data: "confirm" }],
        ],
    },
};

export const setPriceButtons = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Вказати ціну", callback_data: "setPrice" }]
        ],
    },
};

export const setDescriptionButtons = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Вказати опис", callback_data: "setDescription" }]
        ],
    },
};










