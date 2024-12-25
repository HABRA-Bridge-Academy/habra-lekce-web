

import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"

export function toast(message: string, duration: number = 3000) {
    Toastify({ text: message, duration, position: 'center' }).showToast();
}