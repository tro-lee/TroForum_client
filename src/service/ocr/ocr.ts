import {request} from "@@/plugin-request";

export function ocr(img: string) {
    return request<any>('/api/ocr', {
        method: 'POST',
        data: {
            img: img
        },
    });
}
