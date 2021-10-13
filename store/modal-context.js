import { createContext, useState } from "react";

const ModalContext = createContext({
    userAuthenticated: false,
    openModal: () => {},
    closeModal: () => {}
})

export default ModalContext




export const ModalContextProvider = ({children}) => {

    const [visible, setVisible] = useState(false)

    const openModalHandler = () => {
        setVisible(true)
    }

    const closeModalHandler = () => {
        setVisible(false)
    }

    const context = {visible: visible, openModal: openModalHandler, closeModal: closeModalHandler}

    return <ModalContext.Provider value={context}>
        {children}
    </ModalContext.Provider>
}