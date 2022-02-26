import React from 'react';
import { IconButtonContainer} from './icon-button.styles';

const IconButton = ({children,...props}) => {
    return (
        <IconButtonContainer {...props} size="small">{children}</IconButtonContainer>
    )
}

export default IconButton
