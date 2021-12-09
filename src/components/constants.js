import { pages } from "../router";

export const panel = {
    [pages.DESKS]: 'desks',
    [pages.COLUMNS]: 'columns'
};

export const modes = {
    button: 'button',
    form: 'form'
};

export const errors = {
    emptyField: {
        header: 'Пустое поле',
        message: 'Поле не должно быть пустым'
    },

    networkError: {
        header: 'Ошибка сети'
    }
};