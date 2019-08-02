import React from 'react'

import stylesWrapper from './stylesWrapper'



const ButtonOne = ({ history, styles}) => {
    // let _styles = { ...styles.default }
    // if (props.disable) {
    //     _styles = {...styles, ...styles.disable }
    // }   
    return (
        <button style={styles}>I am button one { history}</button>
    )
}

export default stylesWrapper(ButtonOne);
// export default ButtonOne