import React from 'react'
import Customerprofile from '../Pages/Customerdashboard/Customerprofile'
import Customerproduct from '../Pages/Customerdashboard/Customerproduct'
import Customerorders from '../Pages/Customerdashboard/Customerorders'


function Customerdefaulthome() {
    return (
        <>
           <Customerprofile/>
           <Customerproduct/>
           <Customerorders/>
        </>
    )
}

export default Customerdefaulthome