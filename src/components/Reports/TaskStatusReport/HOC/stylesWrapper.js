import React from 'react'
import styles from './styles'


const translatedProps = (props) => {
    let _styles = { ...styles.default }

    if(props.disable) {
        _styles = { ..._styles, ...styles.disable }
    }

    const newProps =  {...props, styles:_styles, history: '/mypath'}

    return newProps;
}

// export default (WrappedComponent) => {
//     return function sdfsdfsf(args) {
//         return WrappedComponent(translatedProps(args))
//     }
// }

export default WrappedComponent => args => WrappedComponent(translatedProps(args))

