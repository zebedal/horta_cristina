import styles from './ModalWrapper.module.css'
import ReactDOM from 'react-dom'
import { useState, useEffect, Fragment, useContext } from 'react'
import ModalContext from '../../store/modal-context'

const ModalWrapper = ({ children, close }) => {

    const [_document, set_document] = useState(null)

    const {closeModal} = useContext(ModalContext)

    useEffect(() => {
        set_document(document)
    }, [])

    if (_document !== null) {
        return ReactDOM.createPortal(
            <Fragment>
                <div className={styles.backdrop} onClick={closeModal}></div>
                <div className={styles.wrapper}>
                    {children}
                </div></Fragment>, _document.getElementById('portal'))
    } else return null

}

export default ModalWrapper