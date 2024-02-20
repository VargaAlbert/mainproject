/**
 * @fileOverview Custom React hook for managing UI states.
 * @module useUserInterfaceDisplay
 */

import { initUiObj } from "@/services/initConfig";
import { useState } from "react";

type uiKeyT = {
    [key: string]: string;
}

/**
 * Object containing keys for UI interfaces.
 */
export const INTER_FACE_KEY: uiKeyT = {
    LOGIN_MODAL: "LOGIN_MODAL"
}

/**
 * Hook for managing UI states.
 * @returns {object} userInterfaceDisplay - Object containing UI states.
 * @returns {function} setUserInterface - Function to update UI states.
 * @example
 * const { userInterfaceDisplay, setUserInterface } = useUserInterfaceDisplay();
 * setUserInterface(INTER_FACE_KEY.LOGIN_MODAL, true);
 */
const useUserInterfaceDisplay = () => {
    const [userInterfaceDisplay, setUserInterfaceDisplay] = useState<uiObjT>(initUiObj);
    
    /**
     * Updates UI states based on the provided key and value.
     * @param {string} key - UI interface key.
     * @param {boolean} value - UI interface value.
     */
    const setUserInterface = (key: string, value: boolean): void => {
        setUserInterfaceDisplay({
            ...userInterfaceDisplay,
            [key]: value,
        });
    };

    return { userInterfaceDisplay, setUserInterface };
}

export default useUserInterfaceDisplay;
