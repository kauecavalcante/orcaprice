import { useState, useEffect } from 'react'
import styles from './Message.module.css'

function Message({type, msg}){

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(!msg) {
            setVisible(false) // Não tem mensagem? visibilidade true
            return
        }

        setVisible(true)      // Tem mensagem? Mostra a mensagem

        const timer = setTimeout(() => {  // Começo o timer se tem mensagem
            setVisible(false)      
        }, 3000)

        return () => clearTimeout(timer)    // Finaliza o timer

    }, [msg])

    return(<>
    
        {visible && (
                    <div className={`${styles.message} ${styles[type]}`} >
                    {msg}
                    </div>
        )}

    </>)
}


export default Message